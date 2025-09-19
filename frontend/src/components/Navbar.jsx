import { Link } from "react-router-dom";
import logo from "../assets/shortcuticonpassaabola.png"

const marca = [
   { id: 5, name: "logo-marca", img: logo }
]
export default function Navbar() {
  return (
    <nav className="bg-transparent text-white flex px-10 py-6 justify-between items-center  fixed top-0 left-0 w-full z-10">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-purple-400 hover:">
          <img className="w-20 rounded-full hover:opacity-70" src={marca[0].img} alt={marca[0].name} />
      </Link>

      {/* Links */}
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="hover:text-pink-500">
            Home
          </Link>
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
        <li>
          <Link to="/chaveamento" className="hover:text-pink-500">
            Chaveamento e Partidas
          </Link>
        </li>
        
      </ul>
    </nav>
  );
}
