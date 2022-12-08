import React from 'react';
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom"

const Login = ({ logUserIn }: any ) => {
  return (
    <Container>
      <Form className="border border-1 border-secondary mt-5 p-4" onSubmit={logUserIn}>
        <h2 className="text-center">Log In</h2>
        <Form.Group>
          <Form.Label>Email Address </Form.Label>
            <Form.Control type="email" id="loginEmail"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password </Form.Label>
            <Form.Control type="password" id="loginPassword"/>
        </Form.Group>
        <Button type="submit" className="btn btn-primary mt-3">Log In</Button>
        <p className="text-center">Don't have an account? <Link to="/bug-tracker/signup">Sign Up</Link></p>
      </Form>
    </Container>
  )
}

export default Login