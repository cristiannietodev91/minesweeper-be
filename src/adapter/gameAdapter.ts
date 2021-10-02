import gameDAO from "../dao/gameDAO";
import { GameInstance } from "../types";

const createGame = (
  game: GameInstance
): Promise<GameInstance | null> | undefined => gameDAO.create(game);

const findAllGames = (): Promise<GameInstance[]> => gameDAO.findAll();

export default {
  createGame,
  findAllGames,
};
