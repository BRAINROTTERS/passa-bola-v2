import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-purple-400 hover:text-pink-500">
        Passa a Bola
      </Link>

      {/* Links */}
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="hover:text-pink-500">
            Home
          </Link>
        </li>
        <li>
          <a href="#noticias" className="hover:text-pink-500">
            Notícias
          </a>
        </li>
        <li>
          <Link to="SobreContato" className="hover:text-pink-500">
            Sobre nós
          </Link>
        </li>
        <li>
          <Link to="/copa" className="hover:text-pink-500">
            Copa
          </Link>
        </li>
        
      </ul>
    </nav>
  );
}
