import { GameModel } from "../database/models";
import { GameAttributes, GameInstance, GameUpdateAttributes } from "../types";

const getById = (
  idgame: number | string
): Promise<GameInstance | null> | undefined => {
  return GameModel.sequelize?.transaction(() => GameModel.findByPk(idgame));
};

const create = (game: GameAttributes): Promise<GameInstance> | undefined => {
  return GameModel.sequelize?.transaction(() => GameModel.create(game));
};

const findAll = (): Promise<GameInstance[]> => GameModel.findAll();

const update = (
  idgame: number | string,
  gameToUpdate: GameUpdateAttributes
): Promise<GameInstance | [number, GameInstance[]] | null> | undefined =>
  GameModel.sequelize?.transaction(() =>
    GameModel.update(gameToUpdate, { where: { idgame } }).then(() =>
      GameModel.findByPk(idgame)
    )
  );

export default {
  findAll,
  create,
  update,
  getById,
};
