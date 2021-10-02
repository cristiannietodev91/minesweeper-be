import playerDAO from "../dao/playerDAO";
import { PlayerInstance } from "../types";

const getById = (
  idplayer: number
): Promise<PlayerInstance | null> | undefined => playerDAO.getById(idplayer);

const findAllPlayers = (): Promise<PlayerInstance[]> => playerDAO.findAll();

export default {
  getById,
  findAllPlayers,
};
