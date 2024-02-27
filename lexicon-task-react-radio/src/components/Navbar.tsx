import '../styles/Navbar.css';

import { Link } from 'react-router-dom';

const links = [
  { to: "/", label: "Hem" },
  { to: "/Channel", label: "Kanal" },
  { to: "/Program", label: "Program" },
  { to: "/MyPage", label: "Min Sida" },
  { to: "/Login", label: "Logga In" },
];

export function Navbar() {
  return (
    <nav className="navbar">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Logo-de-World-Hits-Radio.png" alt="svt logo" />
      <input type="text" placeholder="Sök Kanal" />
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}