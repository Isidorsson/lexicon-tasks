import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Channel } from "./components/Channel";
import { Header } from "./components/LissenDirectly";
import { LoginForm } from "./components/LoginForm";
import { MyPage } from "./components/MyPage";
import { Navbar } from "./components/Navbar";
import { Program } from "./components/Program";

export function App() {
  return (
    <Router>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/Channel">
          <Channel />
        </Route>
        <Route path="/Program">
          <Program />
        </Route>
        <Route path="/MyPage">
          <MyPage />
        </Route>
        <Route path="/Login">
          <LoginForm />
        </Route>
      </Routes>
    </Router>
  );
}