export default (sequelize, DataTypes) => {
  return sequelize.define('Reservas', {
    id_reserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Se você quiser que seja gerado automaticamente
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id_user',
      },
    },
    id_livro: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
