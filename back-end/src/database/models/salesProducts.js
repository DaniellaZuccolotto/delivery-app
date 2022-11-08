module.exports = (sequelize, DataTypes) => {
    const salesProduct = sequelize.define('salesProduct', {
        saleId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        }, {
          timestamps: false,
          tableName: 'sales_products',
          underscored: true
        });
        
        salesProduct.associate = (models) => {
          models.sales.belongsToMany(models.products, { 
            through: salesProduct, 
            foreignKey: 'saleId', 
            otherKey: 'productId',
            as: 'products'
          });
          models.products.belongsToMany(models.sales, { 
            through: salesProduct, 
            foreignKey: 'productId', 
            otherKey: 'saleId',
            as: 'sales'
          });
        }
        return  salesProduct;
};
  
