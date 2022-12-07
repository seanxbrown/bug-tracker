import React from 'react'
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom"

const Signup = () => {
  return (
    <Container>
      <Form className="border border-1 border-secondary mt-5 p-4">
        <h2 className="text-center">Sign Up</h2>
        <Form.Group controlId="signupEmail">
          <Form.Label>Email Address </Form.Label>
            <Form.Control type="email" />
        </Form.Group>
        <Form.Group controlId="signupPassword">
          <Form.Label>Password </Form.Label>
            <Form.Control type="password" />
        </Form.Group>
        <Form.Group controlId="signupPasswordConf">
          <Form.Label>Confirm Password </Form.Label>
            <Form.Control type="password" />
        </Form.Group>
        <Form.Group controlId="signupRole">
          <Form.Label>Role / Function</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Button type="submit" className="btn btn-primary mt-3">Create Account</Button>
        <p className="text-center">Already have an account? <Link to="/bug-tracker/login">Log in</Link></p>
      </Form>
    </Container>
  )
}

export default Signup