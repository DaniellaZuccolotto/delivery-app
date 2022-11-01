module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("sales_products", {
        sale_id: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        price: {
          allowNull: false,
          type: Sequelize.NUMBER,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        role: {
          allowNull: false,
          type: Sequelize.STRING,
        },
      });
    },
    down: async (queryInterface, _Sequelize) => {
      await queryInterface.dropTable("sales_products");
    }
};