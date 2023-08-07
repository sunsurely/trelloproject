const Sequelize = require('sequelize');

class Order extends Sequelize.Model {
  static initiate(sequelize) {
    Order.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        storeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        delivered: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Order',
        tableName: 'orders',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Order.hasOne(db.Review, { foreignKey: 'id', targetKey: 'orderId' });
    db.Review.belongsTo(db.Order, { foreignKey: 'orderId', targetKey: 'id' });
    db.Order.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    db.Order.belongsTo(db.Store, { foreignKey: 'storeId', targetKey: 'id' });
    db.Order.hasMany(db.OrderMenu, { foreignKey: 'orderId', sourceKey: 'id' });
  }
}

module.exports = Order;
