import React from 'react'
import { Link } from "react-router-dom"

const Landing = () => {
  return (
    <div>
        <Link to="/bug-tracker/signup">Sign Up</Link>
        <Link to="/bug-tracker/login">Log In</Link>
    </div>
  )
}

export default Landing