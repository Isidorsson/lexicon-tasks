import "./Nav.css";

export function Nav() {
  const links = [
    { name: "Hot", id: "menu-hot" },
    { name: "Juice", id: "menu-juicy" },
    { name: "Cozy", id: "menu-cozy" },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a onClick={() => scrollToSection(link.id)}>{link.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}