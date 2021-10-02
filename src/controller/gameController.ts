import HttpStatus from "http-status-codes";
import gameAdapter from "../adapter/gameAdapter";
import { Request, Response } from "express";
import { BaseError } from "sequelize";
import { GameAttributes, GenerateGame, Square } from "../types";
import Debug from "debug";
const debug = Debug("minesweeper:server");

const createGame = (req: Request, res: Response): void => {
  const game = req.body as GameAttributes;
  debug("Received game param  :::::>", game);
  try {
    gameAdapter
      .createGame(game)
      ?.then((game) => {
        res.status(HttpStatus.OK).json(game);
      })
      .catch((error) => {
        if (error instanceof Error) {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: error.message });
        } else {
          if (error instanceof BaseError) {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: error.message });
          }
        }
      });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: error.message });
    }
  }
};

const generateBoard = (req: Request, res: Response): void => {
  const game = req.body as GenerateGame;

  try {
    if (game.columns && game.rows && game.columns > 0 && game.rows > 0) {
      const board = gameAdapter.createBoard(game);
      if (board) {
        res.status(HttpStatus.OK).json(board);
      } else {
        res.status(HttpStatus.NO_CONTENT).json([]);
      }
    } else {
      res.status(HttpStatus.PRECONDITION_FAILED).json("Missing params");
    }
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: error.message });
    }
  }
};

const startGame = (req: Request, res: Response): void => {
  const { idgame, posX, posY } = req.params;

  gameAdapter
    .startGame(idgame, { x: +posX, y: +posY })
    ?.then((result) => {
      res.status(HttpStatus.OK).json(result);
    })
    .catch((error) => {
      if (error instanceof Error) {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: error.message });
      }
      if (error instanceof BaseError) {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: error.message });
      }
    });
};

const updateBoard = (req: Request, res: Response): void => {
  const idgame = req.params.idgame;
  const board = req.body as Square[][];

  if (board.length > 0) {
    gameAdapter
      .updateBoard(idgame, board)
      ?.then((result) => {
        res.status(HttpStatus.OK).json(result);
      })
      .catch((error) => {
        if (error instanceof Error) {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: error.message });
        }
        if (error instanceof BaseError) {
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({ error: error.message });
        }
      });
  } else {
    res
      .status(HttpStatus.PRECONDITION_FAILED)
      .send({ error: "param board is required" });
  }
};

export default {
  createGame,
  generateBoard,
  startGame,
  updateBoard,
};
