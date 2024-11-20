import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate para redirecionar
import '../assets/style/menu.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpar o token e informações do usuário do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    // Redirecionar para a página de login após o logout
    navigate('/login');
  };

  const userName = localStorage.getItem('userName');

  return (
    <nav>
      <div className="wrapper">
        <div className="logo">
   
           
        </div>

        <div className="Componentes_2">
          <input
            type="search"
            className="btn_pesquisa"
            placeholder="Search"
            style={{ margin: '5px' }}
          />

          {/* Exibe o nome do usuário logado */}
          {userName && (
            <span className="user-name" style={{ margin: '0 10px', fontWeight: 'bold' }}>
              Olá, {userName}!
            </span>
          )}

          {/* Botão de login ou logout */}
          {localStorage.getItem('token') ? (
            <input
              type="button"
              className="btn_logout"
              value="Logout"
              style={{ margin: '5px' }}
              onClick={handleLogout}
            />
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
            <i className="bx bx-x"></i>
          </label>

          <li>
            <Link to="/" className="active">Home</Link>
          </li>

          <li>
            <Link to="/reserva" className="desktop-item">Reservas</Link>
          </li>

          <li>
            <Link to="/carrinho" className="desktop-item">Carrinho</Link>
          </li>
          <li>
            <Link to="/favoritos" className="desktop-item">Favoritos</Link>
          </li>

          <li>   
          <div className="Componentes">
          {userName && (
            <span className="user-name" style={{ margin: '0 10px', fontWeight: 'bold' }}>
              Olá, {userName}!
            </span>
          )}
            <Link to="#">
              <input type="button" className="btn_carrinho" />
            </Link>
            <Link to="#">
              <input type="button" className="btn_favorito" />
            </Link>
            {/* Se o usuário estiver logado, mostra o botão de logout */}
            {localStorage.getItem('token') && (
              <input
                type="button"
                className="btn_logout"
                value="Logout"
                onClick={handleLogout}
              />
            )}
           
          </div> 
          </li>
          


        </ul>

        <label htmlFor="menu-btn" className="btn menu-btn">
          <i className="bx bx-menu"></i>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
