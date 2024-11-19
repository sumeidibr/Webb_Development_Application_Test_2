import express from 'express';
import cors from 'cors';
import userRoutes from './routes/UserRouters.js';
import bookRoutes from './routes/BookRoutes.js';
import pedidoRoutes from './routes/PedidoRoutes.js';
import favoritoRoutes from './routes/FavoritoRoutes.js';
import categoriaRoutes from './routes/CategoriaRoutes.js';

const app = express();

// Opções de CORS
const corsOptions = {
    origin: '*', // Permite requisições da porta 8081
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
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/favoritos', favoritoRoutes);
app.use('/api/categorias', categoriaRoutes);

// API de teste
app.get('/', (req, res) => {
    res.json('Hello from api');
});

// Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
