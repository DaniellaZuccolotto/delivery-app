module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define('sales', {
        userId: DataTypes.INTEGER, 
        sellerId: DataTypes.INTEGER, 
        totalPrice: DataTypes.DECIMAL(9, 2),
        deliveryAddress: DataTypes.STRING,
        deliveryNumber: DataTypes.STRING,
        saleDate: DataTypes.DATE,
        status: DataTypes.STRING
        }, {
        timestamps: false,
        tableName: 'sales',
        underscored: true
    });
  
    Sales.associate = (models) => {
      Sales.belongsTo(models.users, { 
        foreignKey: 'userId', 
        as: 'users_sale' 
      });
      Sales.belongsTo(models.users, { 
        foreignKey: 'sellerId', 
        as: 'sellers_sale' 
      });
    }
  
    return Sales;
};