import { Cozy } from './components/Cozy';
import { Hot } from './components/Hot';
import { Juicy } from './components/juicy';
import { Nav } from './components/Nav';

export function App() {
  return (
    <>
      <Nav />
      <Hot />
      <Cozy />
      <Juicy />
    </>
  );
}
