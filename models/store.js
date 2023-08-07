const Sequelize = require('sequelize');

class Store extends Sequelize.Model {
  static initiate(sequelize) {
    Store.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        storePhoneNumber: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        image: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        sales: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Store',
        tableName: 'stores',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    // db.Store.hasMany(db.Menu, { foreignKey: 'storeId', sourceKey: 'id' });
    db.Store.hasMany(db.Order, { foreignKey: 'storeId', sourceKey: 'id' });
    db.Store.hasMany(db.Review, { foreignKey: 'storeId', sourceKey: 'id' });
    db.Store.hasOne(db.User, { foreignKey: 'id', targetKey: 'ownerId' });
    db.User.belongsTo(db.Store, {foreignKey: 'ownerId', targetKey: 'id'})
  }
}

module.exports = Store;
