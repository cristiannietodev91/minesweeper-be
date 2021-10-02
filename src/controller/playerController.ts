import HttpStatus from "http-status-codes";
import playerAdapater from "../adapter/playerAdapter";
import { Request, Response } from "express";
import { BaseError } from "sequelize";

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
};
