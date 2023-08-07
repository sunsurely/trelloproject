const Sequelize = require('sequelize');

class Card extends Sequelize.Model {
  static initiate(sequelize) {
    Card.init(
      {
        cardId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        columnId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        position: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        deadline: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Card',
        tableName: 'cards',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    db.Card.hasMany(db.Comment, { foreignKey: 'cardId', sourceKey: 'cardId' });
    db.Card.belongsTo(db.Column, {
      foreignKey: 'columnId',
      sourceKey: 'columnId',
    });
  }
}

module.exports = Card;
