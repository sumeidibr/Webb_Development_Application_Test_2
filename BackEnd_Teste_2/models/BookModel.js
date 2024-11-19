export default (sequelize, DataTypes) => {
  return sequelize.define('Book', {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    preco: DataTypes.FLOAT,
    quantidadeDisponivel: DataTypes.INTEGER,
    categoriaId: DataTypes.INTEGER,
  }, { timestamps: true });
};
