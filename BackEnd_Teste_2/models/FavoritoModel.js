export default (sequelize, DataTypes) => {
    return sequelize.define('Favorito', {
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      livro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, { timestamps: true });
  };
  