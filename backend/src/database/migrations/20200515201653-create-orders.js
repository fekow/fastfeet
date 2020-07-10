module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        references: { model: 'recipients', key: 'id' }, // pego o o id do files como foreign key
        onDelete: 'SET NULL', // se deletaram na tabela fica null
        onUpdate: 'CASCADE', // modificar na tabela modifica aqui tamem
        allowNull: true,
      },
      courier_id: {
        type: Sequelize.INTEGER,
        references: { model: 'couriers', key: 'id' }, // pego o o id do files como foreign key
        onUpdate: 'CASCADE', // modificar na tabela modifica aqui tamem
        onDelete: 'SET NULL', // se deletaram na tabela fica null
        allowNull: true,
      },
      signature_id: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' }, // pego o o id do files como foreign key
        onUpdate: 'CASCADE', // modificar na tabela modifica aqui tamem
        onDelete: 'SET NULL', // se deletaram na tabela fica null
        allowNull: true,
      },
      product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canceled_at: {
        type: Sequelize.DATE,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('orders');
  },
};
