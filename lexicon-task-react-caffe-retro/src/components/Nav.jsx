import "./Nav.css";

export function Nav() {
  const link = [
    { name: "Hot", url: "#menu-hot" },
    { name: "Juice", url: "#menu-juicy" },
    { name: "Cozy", url: "#menu-cozy" },
  ]



  return (
    <nav className="navbar">
      <ul>
        {link.map((item, index) => {
          return (
            <li key={index}> <a href={item
              .url}>{item.name}</a></li>
          )
        }
        )}
      </ul>

    </nav>
  );
}

