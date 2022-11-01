module.exports = (sequelize, DataTypes) => {
    const SalesProducts = sequelize.define('SalesProducts', {
      saleId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          field: 'sale_id'
        },
        productId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          field: 'product_id'
        },
        quantity: DataTypes.INTEGER,
        }, {
          timestamps: false,
          tableName: 'sales_products'
        });
        
        SalesProducts.associate = (models) => {
          models.Sales.belongsToMany(models.Sales, { 
          through: SalesProducts, 
          foreignKey: 'saleId', 
          otherKey: 'productId',
          as: 'sales'
        });
        models.Product.belongsToMany(models.Product, { 
          through: SalesProducts, 
          foreignKey: 'productId', 
          otherKey: 'saleId',
          as: 'products'
        });
        }
        return SalesProducts;
};
  
