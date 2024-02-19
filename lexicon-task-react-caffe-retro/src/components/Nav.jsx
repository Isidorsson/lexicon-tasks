import "./Nav.css";

export function Nav() {
  const link = [
    { name: "Hot", url: "hot" },
    { name: "Juice", url: "juice" },
    { name: "Cozy", url: "cozy" },
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

