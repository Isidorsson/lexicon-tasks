import '../styles/Navbar.css';

import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="navbar">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Logo-de-World-Hits-Radio.png" alt="svt logo" />
      <input type="text" placeholder="Sök Kanal" />
      <ul>
        <li><Link to="/Home">Hem</Link></li>
        <li><Link to="/Channel">Kanal</Link></li>
        <li><Link to="/Program">Program</Link></li>
        <li><Link to="/MyPage">Min Sida</Link></li>
        <li><Link to="/Login">Logga In</Link></li>
      </ul>
    </nav>
  );
}