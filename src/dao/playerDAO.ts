import { PlayerModel } from "../database/models";
import { PlayerAttributes, PlayerInstance } from "../types";

const getById = (
  idplayer: number
): Promise<PlayerInstance | null> | undefined => {
  return PlayerModel.sequelize?.transaction(() =>
    PlayerModel.findByPk(idplayer)
  );
};

const findAll = (): Promise<PlayerInstance[]> => PlayerModel.findAll();

const findPlayerByEmail = (email: string): Promise<PlayerInstance | null> =>
  PlayerModel.findOne({ where: { email: email } });

const create = (
  player: PlayerAttributes
): Promise<PlayerInstance> | undefined => {
  return PlayerModel.sequelize?.transaction(() => PlayerModel.create(player));
};

export default {
  getById,
  findAll,
  create,
  findPlayerByEmail
};
