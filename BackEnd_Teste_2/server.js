import express from 'express';
import cors from 'cors';
import userRoutes from './routes/UsuarioRouters.js';
import bookRoutes from './routes/LivroRoutes.js';
import vendaRoutes from './routes/VendaRoutes.js'; // Renomeado de pedidoRoutes para vendaRoutes
import favoritoRoutes from './routes/FavoritoRoutes.js';
import categoriaRoutes from './routes/CategoriaRoutes.js';
import reservaRoutes from './routes/ReservaRoutes.js'; // Adicionado para as reservas
import itemVendaRoutes from './routes/ItemVendaRoutes.js'; // Adicionado para os itens de venda

const app = express();

// Opções de CORS
const corsOptions = {
    origin: '*', // Permite requisições de qualquer origem (ajustar conforme necessário)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

// Middleware
app.use(cors(corsOptions)); // Usar CORS com opções
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/vendas', vendaRoutes); // Alteração de pedidoRoutes para vendaRoutes
app.use('/api/favoritos', favoritoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/reservas', reservaRoutes); // Nova rota para reservas
app.use('/api/itemvendas', itemVendaRoutes); // Nova rota para itens de venda

// API de teste
app.get('/', (req, res) => {
    res.json('Hello from API');
});

// Porta
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
