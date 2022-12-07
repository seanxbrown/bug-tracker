import React from 'react'
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap"

const Landing = () => {
  return (
    <Container className="vh-100 bg-warning d-flex flex-column justify-content-center">
        <h2 className="text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, dolore?</h2>
        <div id="linkContainer" className="d-flex justify-content-center">
            <Link to="/bug-tracker/signup" className="text-decoration-none">Sign Up</Link>
            <Link to="/bug-tracker/login" className="text-decoration-none">Log In</Link>
        </div>
    </Container>
  )
}

export default Landing