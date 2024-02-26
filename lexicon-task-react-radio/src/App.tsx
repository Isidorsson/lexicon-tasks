import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Header } from "./components/LissenDirectly";
import { Navbar } from "./components/Navbar";

export function App() {
  return (
    <Router>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/somepath">
        </Route>
        <Route path="/Channel">
        </Route>
        <Route path="/Program">
        </Route>
        <Route path="/MyPage">
        </Route>
        <Route path="/Login">
        </Route>

      </Routes>
    </Router>
  );
}