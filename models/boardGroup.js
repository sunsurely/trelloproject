const Sequelize = require('sequelize');

class BoardGroup extends Sequelize.Model {
  static initiate(sequelize) {
    Board.init(
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
        collaborator: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        permission: {
          type: Sequelize.ENUM('admin', "readonly", 'write'),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'BoardGroup',
        tableName: 'boardGroups',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.BoardGroup.belongsTo(db.User, { foreignKey: 'collaborator', targetKey: 'userId' });
    db.BoardGroup.hasOne(db.Board, { foreignKey: 'boardId', sourceKey: 'boardId' });
    db.BoardGroup.belongsTo(db.Board, { foreignKey: 'boardId', targetKey: 'boardId' });
  }
}

module.exports = BoardGroup;
