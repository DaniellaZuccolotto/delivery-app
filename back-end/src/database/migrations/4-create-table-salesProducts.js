module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("sales_products", {
        saleId: {
          type: Sequelize.INTEGER,
          references: {
            model: "sales",
            key: "id",
          },
          allowNull: false,
          primaryKey: true,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "sale_id",
        },

        productId: {
          type: Sequelize.INTEGER,
          references: {
            model: "products",
            key: "id",
          },
          allowNull: false,
          primaryKey: true,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "product_id",
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