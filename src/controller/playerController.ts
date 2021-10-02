import HttpStatus from "http-status-codes";
import playerAdapater from "../adapter/playerAdapter";
import { Request, Response } from "express";
import { BaseError } from "sequelize";
import { PlayerAttributes } from "../types";
import Debug from "debug";
const debug = Debug("minesweeper:server");

const createPlayer = (req: Request, res: Response): void => {
  const player = req.body as PlayerAttributes;
  debug("Received player param :::::>", player);

  if (player.email) {
    playerAdapater
      .createPlayer(player)
      ?.then((player) => {
        res.status(HttpStatus.OK).json(player);
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
    res.status(HttpStatus.PRECONDITION_FAILED).json("Missing params");
  }
};

const getAllPlayers = (req: Request, res: Response): void => {
  playerAdapater
    .findAllPlayers()
    .then((player) => {
      res.status(HttpStatus.OK).json(player);
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

export default {
  getAllPlayers,
  createPlayer,
};
