import '../styles/Navbar.css';

export function Navbar() {
  return (
    <nav className="navbar">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Logo-de-World-Hits-Radio.png" alt="svt logo" />
      <input type="text" placeholder="Sök Kanal" />
      <ul>
        <li>Kanal</li>
        <li>Program</li>
        <li>Min Sida</li>
        <li>Logga In</li>
      </ul>
    </nav>
  );
}