import gameDAO from "../dao/gameDAO";
import {
  GameInstance,
  Square,
  GenerateGame,
  SquareStatus,
  GameAttributes,
} from "../types";
import Debug from "debug";
const debug = Debug("minesweeper:server");

const createGame = (
  game: GameAttributes
): Promise<GameInstance | null> | undefined => {
  const gameToDb = game;

  const board = createBoard({
    rows: gameToDb.rows,
    columns: gameToDb.columns,
  });

  if (board) {
    return gameDAO.create({ ...game, board });
  } else {
    throw new Error("Error generating the board");
  }
};

const findAllGames = (): Promise<GameInstance[]> => gameDAO.findAll();

const createBoard = (gameProps: GenerateGame): Square[][] | undefined => {
  if (gameProps.rows && gameProps.columns) {
    const board: Square[][] = restoreBoard(gameProps);

    return board;
  }
};

const restoreBoard = (gameProps: GenerateGame): Square[][] => {
  return [...Array(gameProps.rows)].map(() =>
    Array(gameProps.columns).fill({
      hasMine: false,
      status: SquareStatus.Covered,
    })
  );
};

const populateMines = (
  gameProps: GenerateGame,
  board: Square[][],
  pos: { x: number; y: number }
): Square[][] => {
  const maxMines = gameProps.columns * gameProps.rows;
  const maxNumberOfMines =
    gameProps.numberofmines && gameProps.numberofmines < maxMines
      ? gameProps.numberofmines
      : maxMines * 0.5;
  board = restoreBoard(gameProps);
  for (let i = 0; i < Math.trunc(maxNumberOfMines); ) {
    const x = Math.floor(Math.random() * gameProps.rows);
    const y = Math.floor(Math.random() * gameProps.columns);
    const square = board[x][y];

    if (!square.hasMine && pos.x !== x && pos.y !== y) {
      board[x][y] = {
        hasMine: true,
        status: SquareStatus.Covered,
      };
      i++;
    }
  }
  return board;
};

const startGame = (
  idgame: number | string,
  pos: { x: number; y: number }
): Promise<GameInstance | [number, GameInstance[]] | null | undefined> | undefined => {
  return gameDAO
    .getById(idgame)
    ?.then((game) => {
      if (game) {
        if (pos.x <= game.rows && pos.y <= game.columns) {
          const board = populateMines(
            {
              rows: game.rows,
              columns: game.columns,
            },
            game.board,
            pos
          );

          if (board) {
            const numberofmines = board.reduce(
              (acc, val) => acc + val.filter((x) => x.hasMine).length,
              0
            );

            board[pos.x][pos.y] = {
              hasMine: false,
              status: SquareStatus.Uncovered
            }

            debug(`Board result ${numberofmines}`);
            return gameDAO
              .update(idgame, {
                ...game,
                board,
                numberofmines,
                startdate: new Date(),
              });
          } else {
            throw new Error("Error generating the board");
          }
        } else {
          throw new Error("Position is not within board edge");
        }
      } else {
        throw new Error(`Id game ${idgame} was not found`);
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const updateBoard = (
  idgame: number | string,
  board: Square[][]
): Promise<GameInstance | [number, GameInstance[]] | null> | undefined =>
  gameDAO.update(idgame, { board: board });

export default {
  createGame,
  findAllGames,
  createBoard,
  startGame,
  updateBoard,
};
