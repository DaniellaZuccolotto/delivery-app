module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("sales", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },

        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          allowNull: false,
          field: 'user_id',
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },

        sellerId: {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          allowNull: false,
          field: 'seller_id',
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },

        totalPrice: {
          allowNull: false,
          type: Sequelize.DECIMAL(9, 2),
          field: 'total_price',
        },

        deliveryAddress: {
          allowNull: false,
          type: Sequelize.STRING,
          field: 'delivery_address',
        },

        deliveryNumber: {
          allowNull: false,
          type: Sequelize.STRING,
          field: 'delivery_number',
        },

        saleDate: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now'),
          field: 'sale_date',
        },
        
        status: {
          allowNull: false,
          type: Sequelize.STRING,
        }
      });
    },
    down: async (queryInterface, _Sequelize) => {
      await queryInterface.dropTable("sales");
    }
};