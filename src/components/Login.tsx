import React from 'react';
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <Container>
      <Form className="border border-1 border-secondary mt-5 p-4">
        <h2 className="text-center">Log In</h2>
        <Form.Group controlId="signupEmail">
          <Form.Label>Email Address </Form.Label>
            <Form.Control type="email" />
        </Form.Group>
        <Form.Group controlId="signupPassword">
          <Form.Label>Password </Form.Label>
            <Form.Control type="password" />
        </Form.Group>
        <Button type="submit" className="btn btn-primary mt-3">Log In</Button>
        <p className="text-center">Don't have an account? <Link to="/bug-tracker/signup">Sign Up</Link></p>
      </Form>
    </Container>
  )
}

export default Login