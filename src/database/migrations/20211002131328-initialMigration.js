"use strict";

// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable("player", {
          idplayer: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          nickname: {
            type: Sequelize.STRING,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          uid: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        }),
        queryInterface.createTable("game", {
          idgame: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          idplayer: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "player",
              key: "idplayer",
            },
            onDelete: "cascade",
          },
          rows: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          columns: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          score: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 0,
          },
          numberofmines: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          board: {
            type: Sequelize.JSON,
            allowNull: false,
          },
          startdate: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          pausedate: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          enddate: {
            type: Sequelize.DATE,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("player");
    await queryInterface.dropTable("game");
  },
};
