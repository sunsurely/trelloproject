const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        name: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        phoneNumber: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true
        },
        nickname: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique:true
        },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        point: {
          type: Sequelize.INTEGER,
          defaultValue: 1000000,
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Order, { foreignKey: 'userId', sourceKey: 'id' });
    db.User.hasMany(db.Review, { foreignKey: 'userId', sourceKey: 'id' });
    db.User.hasOne(db.Store, { foreignKey: 'ownerId', targetKey: 'id' });
    db.Store.belongsTo(db.User, { foreignKey: 'id', targetKey: 'ownerId' });
  }
}

module.exports = User;
