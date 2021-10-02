import { Model, Optional } from "sequelize";

/** ****************
 Game type
 ********************/
export enum SquareStatus {
  Flag,
  Covered,
  Uncovered,
}

export interface Square {
  hasMine: boolean;
  status: SquareStatus;
}



export interface GameAttributes {
  idgame: number;
  idplayer: number;
  rows: number;
  columns: number;
  score: number;
  numberofmines: number;
  board: Square[][];
  startdate?: Date;
  pausedate?: Date;
  enddate?: Date;
}

interface GameCreationAttributes extends Optional<GameAttributes, "idgame"> {}

export interface GameInstance
  extends Model<GameAttributes, GameCreationAttributes>,
    GameAttributes {}

export interface GenerateGame {
  rows: number;
  columns: number;
  numberofmines?: number;
}

/** ****************
 Player type
 ********************/
export interface PlayerAttributes {
  idplayer: number;
  nickname: string;
  email: string;
  uid: string;
}

interface PlayerCreationAttributes
  extends Optional<PlayerAttributes, "idplayer"> {}

export interface PlayerInstance
  extends Model<PlayerAttributes, PlayerCreationAttributes>,
    PlayerAttributes {}
