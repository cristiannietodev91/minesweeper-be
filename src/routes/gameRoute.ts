import * as express from "express";

import gameController from "../controller/gameController";

export const register = (app: express.Application): void => {
  app.get("/game/createGame", gameController.createGame);
};
