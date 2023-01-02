import './App.css';
import { Container } from "react-bootstrap"
import NavComponent from './components/NavComponent';
import { Routes, Route, useNavigate } from "react-router-dom";
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from "./components/Signup";
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "./firebaseConfig"
import { useState, useEffect, FormEvent } from "react"
import PrivateRoute from './components/PrivateRoute';
import User from "./User"
import { doc, setDoc, getDoc } from "firebase/firestore"

function App() {

  const [user, setUser] = useState<Object>({});
  const navigate = useNavigate()

  async function signUpUser(e: FormEvent) {
    e.preventDefault();

    const userName: string = (document.getElementById("userName") as HTMLInputElement).value
    const userEmail: string = (document.getElementById("userEmail") as HTMLInputElement).value
    const userPassword: string = (document.getElementById("userPassword") as HTMLInputElement).value
    const userPassConf: string = (document.getElementById("userPassConf") as HTMLInputElement).value
    const userRole: string = (document.getElementById("userRole") as HTMLInputElement).value

    if (userPassword !== userPassConf) {
      return
    }

    //Create a user account for authorisation and store user details in database to reference elsewhere

    try {
      const userAccount = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      console.log(userAccount.user.uid)
      const newUser = new User(userName, userEmail, userRole, userAccount.user.uid);
      await setDoc(doc(db, "users", userAccount.user.uid), {...newUser});

    } catch(error) {
      alert(error)
    }
      navigate("/bug-tracker/dashboard")


  }

  async function logUserOut() {
    try {
      await signOut(auth)
      navigate("/bug-tracker")

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
      navigate("/bug-tracker/dashboard")
    } catch(e) {
    }

  }

  async function getUserInfoFromDB() {
    const currentUser = {...user}
    return currentUser
    //const docRef = doc(db, "users", currentUser.uid);
    //const docSnap = await getDoc(docRef)

  }

  useEffect(() => {
    onAuthStateChanged(auth, userData => {
      const currentUser = userData as any
      setUser(currentUser)
      if(currentUser) {createUserObject(currentUser.uid)}

    })

    async function createUserObject(userID: string) {
      const docRef = await doc(db, "users", userID);
      const docSnap = await getDoc(docRef)
      const userData = await docSnap.data()
     // if (userData) {console.log("docsnap", userData)}

      const newUserObj: any = {...user}
      if (userData) {
      newUserObj.name = userData.name
      newUserObj.email = userData.email
      newUserObj.projects = userData.projects
      newUserObj.role = userData.role
      newUserObj.ticketsAssigned = userData.ticketsAssigned
      newUserObj.ticketsCreated = userData.ticketsCreated
      setUser(newUserObj)


      }
      

      
    }
  
  }, [])
  

  return (
    <Container fluid className="App">
      <NavComponent logUserOut={logUserOut} user={user}/>
      <Routes>
        <Route index path="bug-tracker/" element={<Landing />} />
        <Route element={<PrivateRoute user={user} />}>
          <Route path="bug-tracker/dashboard" element={<Dashboard user={user}/>} />
          <Route path="bug-tracker/profile" element={<Profile user={user}/>} />
        </Route>
        <Route path="bug-tracker/signup" element={<Signup signUpUser={signUpUser} />} />
        <Route path="bug-tracker/login" element={<Login logUserIn={logUserIn}/>} />
      </Routes>     
    </Container>
  );
}

export default App;
