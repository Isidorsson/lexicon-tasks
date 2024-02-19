// import { Cozy } from './components/Cozy';
// import { Hot } from './components/Hot';
// import { Juicy } from './components/juicy';
// import { Nav } from './components/Nav';

// export function App() {
//   return (
//     <>
//       <Nav />
//       <Hot />
//       <Cozy />
//       <Juicy />
//     </>
//   );
// }

import './components/MenuHot.css';
import './components/MenuJuicy.css';
import './components/MenuCozy.css';

import { MenuSection } from './components/MenuSection';
import { Nav } from './components/Nav';
import textData from './components/textData.json';

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

// export function App() {
//   const hotItems = [/*...*/];
//   const cozyItems = [/*...*/];
//   const juicyItems = [/*...*/];

//   return (
//     <>
//       <Nav />
//       <MenuSection id="menu-hot" description="Hot description" items={hotItems} />
//       <MenuSection id="menu-cozy" description="Cozy description" items={cozyItems} />
//       <MenuSection id="menu-juicy" description="Juicy description" items={juicyItems} />
//     </>
//   );
// }
 

