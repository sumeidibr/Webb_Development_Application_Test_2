export default (sequelize, DataTypes) => {
    return sequelize.define('Venda', {
      id_venda: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id_user',
        },
      },
      data: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, { timestamps: false });
  };
  