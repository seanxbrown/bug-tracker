import './App.css';
import { Container } from "react-bootstrap"
import NavComponent from './components/NavComponent';
import { Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from "./components/Signup";
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebaseConfig"
import { useState, useEffect, FormEvent } from "react"
import PrivateRoute from './components/PrivateRoute';

function App() {

  const [user, setUser] = useState({});

  async function signUpUser(e: FormEvent) {
    e.preventDefault();

    const userEmail: string = (document.getElementById("userEmail") as HTMLInputElement).value
    const userPassword: string = (document.getElementById("userPassword") as HTMLInputElement).value
    const userPassConf: string = (document.getElementById("userPassConf") as HTMLInputElement).value
    const userRole: string = (document.getElementById("userRole") as HTMLInputElement).value

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

  async function logUserIn(e: FormEvent) {
    e.preventDefault();

    const userEmail: string = (document.getElementById("loginEmail") as HTMLInputElement).value
    const userPassword: string = (document.getElementById("loginPassword") as HTMLInputElement).value

    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword)
      console.log("logged in")
    } catch(e) {
      console.log(e)
    }

  }

  useEffect(() => {
    onAuthStateChanged(auth, userData => {
      const currentUser = userData as any
      setUser(currentUser)
    })
  })
  

  return (
    <Container fluid className="App">
      <NavComponent logUserOut={logUserOut} user={user}/>
      <Routes>
        <Route index path="bug-tracker/" element={<Landing />} />
        <Route element={<PrivateRoute user={user} />}>
          <Route path="bug-tracker/dashboard" element={<Dashboard />} />
          <Route path="bug-tracker/profile" element={<Profile />} />
        </Route>
        <Route path="bug-tracker/signup" element={<Signup signUpUser={signUpUser} />} />
        <Route path="bug-tracker/login" element={<Login logUserIn={logUserIn}/>} />
      </Routes>     
    </Container>
  );
}

export default App;
