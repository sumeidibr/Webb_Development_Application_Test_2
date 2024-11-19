export default (sequelize, DataTypes) => {
  return sequelize.define('Livro', {
    id_livro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categoria',
        key: 'categoria_id',
      },
    },
  }, { timestamps: false });
};
