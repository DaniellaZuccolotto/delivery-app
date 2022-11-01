module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("sales_products", {
        sale_id: {
          type: Sequelize.INTEGER,
          reference: {
            model: {
              tableName: 'sale',
              key: 'id'
            },
          },
          allowNull: false
        },

        product_id: {
          type: Sequelize.INTEGER,
          reference: {
            model: {
              tableName: 'products',
              key: 'id'
            },
          },
          allowNull: false
        },
        
        quantity: {
          allowNull: false,
          type: Sequelize.INTEGER,
        }
      });
    },
    down: async (queryInterface, _Sequelize) => {
      await queryInterface.dropTable("sales_products");
    }
};