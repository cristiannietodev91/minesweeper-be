import cls from "cls-hooked";
import { Sequelize, Options, DataTypes } from "sequelize";

const namespace = cls.createNamespace("my-very-own-namespace");
// const env: string = process.env.NODE_ENV || 'development';
import { config as dbConfig } from "../config/config";
import { GameInstance, PlayerInstance } from "../../types";
// import { String } from "aws-sdk/clients/batch";
import Debug from "debug";
const debug = Debug("minesweeper:server");

const myConfig: Options = dbConfig[0];

Sequelize.useCLS(namespace);

debug(myConfig.dialect);
const sequelize = new Sequelize(myConfig);

const GameModel = sequelize.define<GameInstance>("game", {
  idgame: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idplayer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rows: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  columns: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  score: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  numberofmines: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  board: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  startdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pausedate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  enddate: {
    type: DataTypes.DATE,
  },
});

const PlayerModel = sequelize.define<PlayerInstance>("player", {
  idplayer: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nickname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

GameModel.belongsTo(PlayerModel, {
  foreignKey: "idplayer",
  targetKey: "idplayer"
});

PlayerModel.hasMany(GameModel, {
  foreignKey: "idplayer",
  as: "games",
  onDelete: "CASCADE",
});

export { GameModel, PlayerModel };
