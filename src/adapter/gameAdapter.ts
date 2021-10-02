import gameDAO from "../dao/gameDAO";
import { GameInstance, Square, GenerateGame, SquareStatus } from "../types";
import Debug from "debug";
const debug = Debug("minesweeper:server");

const createGame = (
  game: GameInstance
): Promise<GameInstance | null> | undefined => gameDAO.create(game);

const findAllGames = (): Promise<GameInstance[]> => gameDAO.findAll();

const createBoard = (gameProps: GenerateGame): Square[][] | undefined => {
  if (gameProps.rows && gameProps.columns) {
    const board: Square[][] = [...Array(gameProps.rows)].map(() =>
      Array(gameProps.columns).fill({
        hasMine: false,
        status: SquareStatus.Covered,
      })
    );
    const maxMines = gameProps.columns * gameProps.rows;
    const maxNumberOfMines =
      gameProps.numberofmines && gameProps.numberofmines < maxMines
        ? gameProps.numberofmines
        : maxMines * 0.5;
    for (let i = 0; i < Math.trunc(maxNumberOfMines); ) {
      const x = Math.floor(Math.random() * gameProps.rows);
      const y = Math.floor(Math.random() * gameProps.columns);
      const square = board[x][y];

      if (!square.hasMine) {
        board[x][y] = {
          hasMine: true,
          status: SquareStatus.Covered,
        };
        ++i;
      }
    }
    const numberofmines = board.reduce(
      (acc, val) => acc + val.filter((x) => x.hasMine).length,
      0
    );
    debug(`Board result ${JSON.stringify(board)} ${numberofmines}`);
    return board;
  }
};

export default {
  createGame,
  findAllGames,
  createBoard,
};
