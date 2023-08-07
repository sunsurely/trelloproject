const Sequelize = require('sequelize');

class OrderMenu extends Sequelize.Model {
  static initiate(sequelize) {
    OrderMenu.init(
      {
        orderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        menuId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'OrderMenu',
        tableName: 'orderMenus',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    // db.OrderMenu.hasOne(db.Menu, { foreignKey: 'menuId', targetKey: 'id' });
    // db.OrderMenu.belongsTo(db.Menu, { foreignKey: 'menuId', targetKey: 'id' });
    // db.Menu.belongsTo(db.OrderMenu, { foreignKey: 'id', targetKey: 'menuId' });
    db.OrderMenu.belongsTo(db.Order, {
      foreignKey: 'orderId',
      targetKey: 'id',
    });
  }
}

module.exports = OrderMenu;
