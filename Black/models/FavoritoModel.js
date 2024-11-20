export default (sequelize, DataTypes) => {
  return sequelize.define('Favoritos', {
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
  }, { timestamps: false });
};
