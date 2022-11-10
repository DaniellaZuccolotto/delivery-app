module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    urlImage: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'products',
    underscored: true
  });

  return Product;
};