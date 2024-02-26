import '../styles/Navbar.css';

export function Navbar() {
  return (
    <nav className="navbar">
      <img src="https://t3.ftcdn.net/jpg/04/67/94/94/360_F_467949419_woOzXXQZNzl8Y6gfkRnefQlJkwP5dqur.jpg" alt="svt logo" />
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