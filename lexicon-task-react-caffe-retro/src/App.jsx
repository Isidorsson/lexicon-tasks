import './components/MenuHot.css';
import './components/MenuJuicy.css';
import './components/MenuCozy.css';

import { MenuSection } from './components/MenuSection';
import { Nav } from './components/Nav';
import textData from './data/textData.json';

export function App() {
  return (
    <>
      <Nav />
      {textData.map((data, index) => (
        <MenuSection key={index} data={data} className={data.strId} />
      ))}
    </>
  );
}
