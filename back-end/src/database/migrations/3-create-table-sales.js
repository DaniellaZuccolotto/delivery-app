module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("sales", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },

        user_id: {
          type: Sequelize.INTEGER,
          reference: {
            model: {
              tableName: 'users',
              key: 'id'
            },
          },
          allowNull: false
        },

        seller_id: {
          type: Sequelize.INTEGER,
          reference: {
            model: {
              tableName: 'users',
              key: 'id'
            },
          },
          allowNull: false
        },

        total_price: {
          allowNull: false,
          type: Sequelize.DECIMAL(9, 2),
        },

        delivery_address: {
          allowNull: false,
          type: Sequelize.STRING,
        },

        delivery_number: {
          allowNull: false,
          type: Sequelize.STRING,
        },

        sale_date: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now')
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