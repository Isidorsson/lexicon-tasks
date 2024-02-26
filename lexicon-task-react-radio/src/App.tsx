import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Channel } from "./components/Channel";
import { Header } from "./components/LissenDirectly";
import { Home } from './components/Home';
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
        <Route path="/" element={<Home />} />
        <Route path="/Channel" element={<Channel />} />
        <Route path="/Program" element={<Program />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}