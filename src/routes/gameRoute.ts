import * as express from "express";

import gameController from "../controller/gameController";

export const register = (app: express.Application): void => {
  app.post("/game/createGame", gameController.createGame);
  app.post("/game/generateBoard", gameController.generateBoard);
};
