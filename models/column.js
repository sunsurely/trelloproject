const Sequelize = require('sequelize');

class Column extends Sequelize.Model {
  static initiate(sequelize) {
    Column.init(
      {
        columnId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        boardId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        position: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Column',
        tableName: 'columns',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Column.belongsTo(db.Board, {
      foreignKey: 'boardId',
      targetKey: 'boardId',
    });

    db.Column.hasMany(db.Card, {
      foreignKey: 'columnId',
      sourceKey: 'columnId',
    });
  }
}

module.exports = Column;
