const Sequelize = require('sequelize');
const Board = require('../models/board');

class BoardGroup extends Sequelize.Model {
  static initiate(sequelize) {
    BoardGroup.init(
      {
        boardGroupId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        boardId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER(30),
          allowNull: false,
        },
        permission: {
          type: Sequelize.ENUM('admin', 'write'),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'BoardGroup',
        tableName: 'boardgroups',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.BoardGroup.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
    });
    db.BoardGroup.hasOne(db.Board, {
      foreignKey: 'boardId',
      sourceKey: 'boardId',
    });
    db.BoardGroup.belongsTo(db.Board, {
      foreignKey: 'boardId',
      targetKey: 'boardId',
    });
  }
}

module.exports = BoardGroup;
