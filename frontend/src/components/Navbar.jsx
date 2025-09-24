import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/shortcuticonpassaabola.png";
import { AuthContext } from "../routes/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    alert('Você foi desconectado.');
  };

  return (
    <nav className="bg-transparent text-white flex px-10 py-6 justify-between items-center fixed top-0 left-0 w-full z-10">
      <Link to="/" className="text-xl font-bold text-purple-400">
        <img className="w-20 rounded-full hover:opacity-70" src={logo} alt="Passa Bola Logo" />
      </Link>

      <ul className="flex space-x-6 items-center">
        <li>
          <Link to="/" className="hover:text-pink-500">
            Home
          </Link>
        </li>
        <li>
          <Link to="/sobrenos" className="hover:text-pink-500">
            Sobre nós
          </Link>
        </li>
        <li>
          <Link to="/copa" className="hover:text-pink-500">
            Copa
          </Link>
        </li>
        <li>
          <Link to="/chaveamento" className="hover:text-pink-500">
            Chaveamento e Partidas
          </Link>
        </li>
        
        {user ? (
          <>
            {user.role === 'admin' && (
              <li>
                <Link to="/admin" className="hover:text-pink-500">
                  Painel Admin
                </Link>
              </li>
            )}
            <li>
              <span className="text-pink-400">Olá, {user.name}</span>
            </li>
            <li>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 py-2 px-4 rounded-full font-semibold hover:bg-red-600 transition-colors"
              >
                Sair
              </button>
            </li>
          </>
        ) : (
          <li>
            <button 
              onClick={() => navigate('/login')} 
              className="bg-purple-600 py-2 px-4 rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}