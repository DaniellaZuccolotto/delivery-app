module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define('Sales', {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
        },
        userId: { 
          type: DataTypes.INTEGER, 
          field: 'user_id'
        },
        sallerId: { 
          type: DataTypes.INTEGER, 
          field: 'seller_id'
        },
        totalPrice: {
          type: DataTypes.DECIMAL,
          field: 'total_price'
        },
        deliveryAdress: {
          type: DataTypes.STRING,
          field: 'delivery_address'
        },

        deliveryNumber: {
          type: DataTypes.STRING,
          field: 'delivery_number'
        },

        saleDate: {
          type: DataTypes.DECIMAL,
          field: 'sale_date'
        },

        status: DataTypes.DATE
        }, {
        timestamps: false,
        tableName: 'sales'
    });
  
    Sales.associate = (models) => {
      Sales.belongsTo(models.User, { 
        foreignKey: 'userId', 
        as: 'users' 
      });
      Sales.belongsTo(models.User, { 
        foreignKey: 'sallerId', 
        as: 'sellers' 
      });
    }
  
    return Sales;
};