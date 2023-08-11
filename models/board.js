const Sequelize = require('sequelize');

class Board extends Sequelize.Model {
  static initiate(sequelize) {
    Board.init(
      {
        boardId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        color: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Board',
        tableName: 'boards',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Board.belongsTo(db.User, {
      foreignKey: 'ownerId',
      targetKey: 'userId',
    });
    db.Board.hasMany(db.BoardGroup, {
      foreignKey: 'boardId',
      sourceKey: 'boardId',
    });
    db.Board.hasMany(db.Column, {
      foreignKey: 'boardId',
      sourceKey: 'boardId',
    });
  }
}

module.exports = Board;
