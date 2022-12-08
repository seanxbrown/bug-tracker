import './App.css';
import { Container } from "react-bootstrap"
import NavComponent from './components/NavComponent';
import { Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from "./components/Signup";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "./firebaseConfig"

function App() {

  async function signUpUser(e: any) {
    e.preventDefault();

    const userEmail = (document.getElementById("userEmail") as HTMLInputElement).value
    const userPassword = (document.getElementById("userPassword") as HTMLInputElement).value
    const userPassConf = (document.getElementById("userPassConf") as HTMLInputElement).value
    const userRole = (document.getElementById("userRole") as HTMLInputElement).value

    if (userPassword !== userPassConf) {
      return
    }

    try {
     await createUserWithEmailAndPassword(auth, userEmail, userPassword )
     console.log("signed in")
    } catch(error) {
      alert(error)
    }

  }
  
  async function logUserOut() {
    try {
      await signOut(auth)
      console.log("signed out")
    } catch(error) {
      alert(error)
    }
  }


  
  return (
    <Container fluid className="App">
      <NavComponent logUserOut={logUserOut}/>
      <Routes>
        <Route index path="bug-tracker/" element={<Landing />} />
        <Route path="bug-tracker/dashboard" element={<Dashboard />} />
        <Route path="bug-tracker/profile" element={<Profile />} />
        <Route path="bug-tracker/signup" element={<Signup signUpUser={signUpUser} />} />
        <Route path="bug-tracker/login" element={<Login />} />
      </Routes>     
    </Container>
  );
}

export default App;
