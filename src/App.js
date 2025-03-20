// src/App.js
import "./styles/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Contacts from "./pages/Contacts";
import Personal from "./pages/Personal";
import Company from "./pages/Company";
import Admin from './pages/Admin';
import University from "./pages/University";
import Login from './components/navbar/Login';
import Register from "./components/navbar/Register";
import Confirmation from "./pages/Confirmation"; // Добавьте импорт новой страницы
import ScrollToTop from "./utils/scrollToTop";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/project/:id" element={<Project />}/>
          <Route path="/contacts" element={<Contacts />}/>
          <Route path="/student" element={<Personal />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/enterprise" element={<Company />} />
          <Route path="/teacher" element={<University />} />
          
          <Route path="/confirmation" element={<Confirmation />} /> {/* Добавьте новый маршрут */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;