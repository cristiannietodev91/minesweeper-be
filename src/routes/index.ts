import { Application, Request, Response } from "express";

export const register = (app: Application): void => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Well done!");
  });
};
