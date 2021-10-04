import cls from "cls-hooked";
import { Sequelize, Options, DataTypes } from "sequelize";

const namespace = cls.createNamespace("my-very-own-namespace");
import config from "../config/config";
import { GameInstance, PlayerInstance } from "../../types";
import Debug from "debug";
const debug = Debug("minesweeper:server");

const myConfig: Options =
  process.env.NODE_ENV === "production"
    ? { ...config.production, dialect: "mysql" }
    : { ...config.development, dialect: "mysql" };

Sequelize.useCLS(namespace);

debug(myConfig.dialect);
const sequelize = new Sequelize(myConfig);

const GameModel = sequelize.define<GameInstance>(
  "game",
  {
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
    },
    numberofmines: {
      type: DataTypes.NUMBER,
    },
    board: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    startdate: {
      type: DataTypes.DATE,
    },
    pausedate: {
      type: DataTypes.DATE,
    },
    enddate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "game",
  }
);

const PlayerModel = sequelize.define<PlayerInstance>(
  "player",
  {
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
  },
  {
    tableName: "player",
  }
);

GameModel.belongsTo(PlayerModel, {
  foreignKey: "idplayer",
  targetKey: "idplayer",
});

PlayerModel.hasMany(GameModel, {
  foreignKey: "idplayer",
  as: "games",
  onDelete: "CASCADE",
});

export { GameModel, PlayerModel };
