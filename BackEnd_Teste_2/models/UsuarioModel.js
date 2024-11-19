export default (sequelize, DataTypes) => {
  return sequelize.define('Usuario', {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_usuario: {
      type: DataTypes.ENUM('comum', 'admin'),
      allowNull: false,
    },
  }, { timestamps: false });
};
