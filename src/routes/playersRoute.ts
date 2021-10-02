import * as express from "express";

import playerController from "../controller/playerController";

export const register = (app: express.Application): void => {
  app.get("/players/getAll", playerController.getAllPlayers);
};
