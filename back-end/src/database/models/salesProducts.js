module.exports = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define('salesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    quantity: DataTypes.INTEGER,
  }, {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });

  salesProduct.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'products',
      through: salesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.products.belongsToMany(models.sales, {
      as: 'sale',
      through: salesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return salesProduct;
};
