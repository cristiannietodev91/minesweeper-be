import HttpStatus from "http-status-codes";
import gameAdapter from "../adapter/gameAdapter";
import { Request, Response } from "express";
import { BaseError } from "sequelize";
import { GameInstance, GenerateGame } from "../types";
import Debug from "debug";
const debug = Debug("minesweeper:server");

const createGame = (req: Request, res: Response): void => {
  const game = req.body as GameInstance;
  debug("Parametro de game recibido :::::>", game);

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
      }
      if (error instanceof BaseError) {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: error.message });
      }
    });
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

export default {
  createGame,
  generateBoard,
};