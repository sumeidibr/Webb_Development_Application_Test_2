import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import '../assets/style/menu.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Função de logout
  const handleLogout = () => {
    // Remove os dados do usuário do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userType');

    // Redireciona para a página de login
    navigate('/login');
  };

  return (
    <nav>
      <div className="wrapper">
        <div className="logo">
      
        </div>

        <div className="Componentes_2">
          <input type="search" className="btn_pesquisa" placeholder="Search" style={{ margin: '5px' }} />
          
          {/* Condicional de exibição do botão de Login ou Logout */}
          {localStorage.getItem('token') ? (
            <button 
              className="btn_logout" 
              style={{ margin: '5px' }} 
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <input type="button" className="btn_login" value="Login" style={{ margin: '5px' }} />
            </Link>
          )}
        </div>

        <input type="radio" name="slide" id="menu-btn" />
        <input type="radio" name="slide" id="cancel-btn" />
        <ul className="nav-links">
          <label htmlFor="cancel-btn" className="btn cancel-btn">
            <i className='bx bx-x'></i>
          </label>

          <li>
            <Link to="/admin" className="active">Home</Link>
          </li>

          <li>
            <Link to="/admin/reservados" className="desktop-item">Reservados</Link>          
          </li>

          <li>
            <Link to="/admin/livros" className="desktop-item">Livros</Link>
          </li>

          {localStorage.getItem('token') ? (
            <button 
              className="btn_logout" 
              style={{ margin: '5px' }} 
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <input type="button" className="btn_login" value="Login" style={{ margin: '5px' }} />
            </Link>
          )}

          <div className="Componentes">
            <Link to="#"><input type="button" className="btn_carrinho" /></Link>
            <Link to="#"><input type="button" className="btn_favorito" /></Link>
            <input type="search" className="btn_pesquisa" placeholder="Search" />
            <Link to="/carrinho">
              <p style={{ color: 'black', margin: 0 }}></p>
            </Link>
          </div>
        </ul>

        <label htmlFor="menu-btn" className="btn menu-btn">
          <i className='bx bx-menu'></i>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
