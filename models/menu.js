const Sequelize = require('sequelize');

class Menu extends Sequelize.Model {
  static initiate(sequelize) {
    Menu.init(
      {
        menuName: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        storeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Menu',
        tableName: 'menus',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    // db.Menu.belongsTo(db.Store, { foreignKey: 'storeId', targetKey: 'id' });
    // db.Menu.hasMany(db.OrderMenu, { foreignKey: 'menuId', sourceKey: 'id' });
    // db.OrderMenu.belongsTo(db.Menu, {foreignKey: 'menuId', targetKey: 'id'})
    // db.Menu.hasOne(db.OrderMenu, {foreignKey: 'id', targetKey: 'menuId'})
  }
}

module.exports = Menu;
