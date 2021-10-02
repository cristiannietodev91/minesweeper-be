import playerDAO from "../dao/playerDAO";
import { PlayerAttributes, PlayerInstance } from "../types";
import { v4 as uuidv4 } from "uuid";

const getById = (
  idplayer: number
): Promise<PlayerInstance | null> | undefined => playerDAO.getById(idplayer);

const findAllPlayers = (): Promise<PlayerInstance[]> => playerDAO.findAll();

const createPlayer = (player: PlayerAttributes): Promise<PlayerInstance | undefined> => {
  const playerToDb = player;
  if (!playerToDb.uid) {
    playerToDb.uid = uuidv4();
  }
  return playerDAO
    .findPlayerByEmail(player.email)
    .then((player) => {
      if (player) {
        throw new Error(
          `Player with ${player.email} is registered`
        );
      }
      return playerDAO.create(playerToDb);
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export default {
  getById,
  findAllPlayers,
  createPlayer,
};
