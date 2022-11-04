module.exports = {
    up: async (queryInterface, _Sequelize) => {
      await queryInterface.bulkInsert('sales',
        [
          { 
            id: 1,
            user_id: 1,
            seller_id: 2,
            total_price: 124.50,
            delivery_address: 'Rua inventada Av 5',
            delivery_number: '555',
            sale_date: '2030-07-12',
            status: 'Pendente' 
          },
        ], { timestamps: false });
    },
  
    down: async (queryInterface, _Sequelize) => {
      await queryInterface.bulkDelete('sales', null, {});
    },
};