import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/dbConfig.js';
import userModel from './UserModel.js';
import bookModel from './BookModel.js';
import pedidoModel from './PedidoModel.js';
import favoritoModel from './FavoritoModel.js';
import categoriaModel from './CategoriaModel.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  logging: console.log, // Pode ser desativado para produção
});

const db = {
  sequelize,
  Sequelize,
  User: userModel(sequelize, DataTypes),
  Book: bookModel(sequelize, DataTypes),
  Pedido: pedidoModel(sequelize, DataTypes),
  Favorito: favoritoModel(sequelize, DataTypes),
  Categoria: categoriaModel(sequelize, DataTypes),
};

// Associações

// Relacionamento muitos-para-muitos entre Usuário e Livro (via Favorito)
db.User.belongsToMany(db.Book, { 
  through: db.Favorito, 
  foreignKey: 'usuario_id' 
});
db.Book.belongsToMany(db.User, { 
  through: db.Favorito, 
  foreignKey: 'livro_id' 
});

// Relacionamento um-para-muitos entre Usuario e Pedido
db.User.hasMany(db.Pedido, { foreignKey: 'usuario_id' });
db.Pedido.belongsTo(db.User, { foreignKey: 'usuario_id' });

// Relacionamento muitos-para-muitos entre Pedido e Livro (via PedidoItem, por exemplo)
db.Pedido.belongsToMany(db.Book, { 
  through: 'PedidoItem', 
  foreignKey: 'pedido_id' 
});
db.Book.belongsToMany(db.Pedido, { 
  through: 'PedidoItem', 
  foreignKey: 'livro_id' 
});

// Relacionamento um-para-muitos entre Categoria e Livro
db.Categoria.hasMany(db.Book, { foreignKey: 'categoria_id' });
db.Book.belongsTo(db.Categoria, { foreignKey: 'categoria_id' });

// Função para autenticar e sincronizar com o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem-sucedida com o banco de dados.');

    // Sincroniza todas as tabelas, se não existirem
    await sequelize.sync({ force: false }); // Use 'force: true' para recriar as tabelas. Cuidado: isso exclui dados existentes.
    console.log('Tabelas sincronizadas com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();

export default db;
