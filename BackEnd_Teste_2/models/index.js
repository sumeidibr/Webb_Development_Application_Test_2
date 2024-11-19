import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/dbConfig.js';
import usuarioModel from './UsuarioModel.js';
import livroModel from './LivroModel.js';
import vendaModel from './VendaModel.js';
import favoritoModel from './FavoritoModel.js';
import categoriaModel from './CategoriaModel.js';
import itemVendaModel from './ItemVenda.js';
import reservaModel from './ReservaModel.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  logging: console.log, // Pode ser desativado para produção
});

const db = {
  sequelize,
  Sequelize,
  Usuario: usuarioModel(sequelize, DataTypes),
  
  Venda: vendaModel(sequelize, DataTypes),
  Favoritos: favoritoModel(sequelize, DataTypes),
  Categoria: categoriaModel(sequelize, DataTypes),
  Livro: livroModel(sequelize, DataTypes),
  ItemVenda: itemVendaModel(sequelize, DataTypes),
  Reservas: reservaModel(sequelize, DataTypes),
};


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
