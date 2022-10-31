module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    urlImage: {
      type: DataTypes.STRING,
      field: 'url_image',
    },
  },
  {
    timestamps: false,
    tableName: 'products',
  });

  // User.associate = (models) => {
  //   User.hasMany(models.BlogPost,
  //     { foreignKey: 'userId', as: 'blogposts' });
  // };

  return Product;
};