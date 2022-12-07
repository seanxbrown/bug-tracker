import './App.css';
import { Container } from "react-bootstrap"
import NavComponent from './components/NavComponent';
import { Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from "./components/Signup";

function App() {
  return (
    <Container fluid className="App">
      <NavComponent />
      <Routes>
        <Route index path="bug-tracker/" element={<Landing />} />
        <Route path="bug-tracker/dashboard" element={<Dashboard />} />
        <Route path="bug-tracker/profile" element={<Profile />} />
        <Route path="bug-tracker/signup" element={<Signup />} />
        <Route path="bug-tracker/login" element={<Login />} />
      </Routes>     
    </Container>
  );
}

export default App;
