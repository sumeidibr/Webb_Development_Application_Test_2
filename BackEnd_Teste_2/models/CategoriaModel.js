export default (sequelize, DataTypes) => {
  return sequelize.define('Categoria', {
    categoria_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: true });
};
