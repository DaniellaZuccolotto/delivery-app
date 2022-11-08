module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING, 
  },
  {
    timestamps: false,
    tableName: 'users',
  });

  User.associate = (models) => {
    User.hasMany(models.sales, { 
      foreignKey: 'userId', 
      as: 'sale_users' 
    });
    User.hasMany(models.sales, { 
      foreignKey: 'sellerId', 
      as: 'sale_sellers' 
    });
    }

  return User;
};