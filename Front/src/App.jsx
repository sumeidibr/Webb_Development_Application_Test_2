import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './app.css'; 

// Componentes gerais
import Footer from './component/Footer'; 
import Nav from './component/Nav'; 
import Carrinho from './pages/Carrinho'; 
import Reserva from './pages/Reserva'; 
import Home from './pages/Home'; 
import LoginRegister from './pages/LoginRegister'; 
import Detalhes from './pages/Detalhes'; 
import Favoritos from './pages/Favoritos'; 

// Admin
import AdminHome from './pages/HomeAdmin'; 
import AdminReservados from './pages/Reservados'; 
import AdminLivros from './pages/Livros'; 
import AdminNav from './component/NavAdmin'; 
import AdminDetalhesReserva from './pages/DetalhesReserva'; 

function MainApp() {
  const location = useLocation();

  // Verifica autenticação e tipo de usuário armazenado
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const userType = localStorage.getItem('userType');

  // Se o usuário não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  // Verifica se estamos em uma rota de Admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      {!isAdminRoute && userType === 'comum' && <Nav />}
      {isAdminRoute && userType === 'admin' && <AdminNav />}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <main style={{ flexGrow: 1 }}>
          <Routes>
            {/* Rotas gerais */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/reserva" element={<Reserva />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
            <Route path="/favoritos" element={<Favoritos />} />

            {/* Rotas Admin */}
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/reservados" element={<AdminReservados />} />
            <Route path="/admin/livros" element={<AdminLivros />} />
            <Route path="/admin/reservados/detalhes" element={<AdminDetalhesReserva />} />

            {/* Redirecionamento padrão para rota não encontrada */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      {!isAdminRoute && userType === 'comum' && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
