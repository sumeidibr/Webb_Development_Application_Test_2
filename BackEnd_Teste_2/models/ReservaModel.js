export default (sequelize, DataTypes) => {
    return sequelize.define('Reservas', {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Usuarios',
          key: 'id_user',
        },
      },
      id_livro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Livros',
          key: 'id_livro',
        },
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      estado: {
        type: DataTypes.ENUM('pendente', 'confirmado', 'cancelado'),
        allowNull: false,
      },
    }, { timestamps: false });
  };
  