export default (sequelize, DataTypes) => {
    return sequelize.define('ItemVenda', {
      id_item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_venda: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Vendas',
          key: 'id_venda',
        },
      },
      id_livro: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Livros',
          key: 'id_livro',
        },
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, { timestamps: false });
  };
  