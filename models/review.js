const Sequelize = require('sequelize');

class Review extends Sequelize.Model {
  static initiate(sequelize) {
    Review.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        storeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        rating: {
          type: Sequelize.TINYINT,
          allowNull: false,
        },
        orderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Review',
        tableName: 'reviews',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Review.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    db.Review.belongsTo(db.Store, { foreignKey: 'storeId', targetKey: 'id' });
    db.Review.hasOne(db.Order, { foreignKey: 'id', targetKey: 'orderId' });
    db.Order.belongsTo(db.Review, { foreignKey: 'id', targetKey: 'id' });
  }
}

module.exports = Review;
