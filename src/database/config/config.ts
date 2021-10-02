/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Options } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

export interface Config {
  [environment: string]: Options;
}

const developEnvironment: Options = {
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  host: process.env.DBHOST,
  dialect: "mysql",
  port: 3306,
  define: {
    underscored: false,
    freezeTableName: true,
  },
  dialectOptions: {
    /* typeCast: (field , next) => {
        if (field.type === "DATETIME" || field.type === "TIMESTAMP") {
          return new Date(field.string() + "Z");
        }
        return next();
      }*/
  },
  timezone: "-05:00", // for writing to database
};

const prodEnvironment: Options = {
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  host: process.env.DBHOST,
  dialect: "mysql",
  port: 3306,
  define: {
    underscored: false,
    freezeTableName: true,
  },
  dialectOptions: {
    /* typeCast: function (field, next) {
        if (field.type == "DATETIME" || field.type == "TIMESTAMP") {
          return new Date(field.string() + "Z");
        }
        return next();
      } */
  },
  timezone: "-05:00", // for writing to database
};

export const config: Options[] = [developEnvironment, prodEnvironment];
