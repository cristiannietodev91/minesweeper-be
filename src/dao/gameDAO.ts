import { GameModel } from "../database/models";
import { GameAttributes, GameInstance } from "../types";

const create = (game: GameAttributes): Promise<GameInstance> | undefined => {
  return GameModel.sequelize?.transaction(() => GameModel.create(game));
};

const findAll = (): Promise<GameInstance[]> => GameModel.findAll();

export default {
  findAll,
  create,
};
