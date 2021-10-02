import * as express from "express";

import gameController from "../controller/gameController";

export const register = (app: express.Application): void => {
  app.post("/game/create", gameController.createGame);
  app.post("/game/generate", gameController.generateBoard);
};
