import React from 'react'
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom"

const Signup = ( { signUpUser }: any) => {
  return (
    <Container>
      <Form className="border border-1 border-secondary mt-5 p-4" onSubmit={signUpUser}>
        <h2 className="text-center">Sign Up</h2>
        <Form.Group>
          <Form.Label>Email Address </Form.Label>
            <Form.Control type="email" id="userEmail"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password </Form.Label>
            <Form.Control type="password" id="userPassword"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password </Form.Label>
            <Form.Control type="password" id="userPassConf"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select a role</Form.Label>
          <Form.Select aria-label="Choose a business role" id="userRole">
          <option value="user">User</option>
          <option value="developer">Developer</option>
          <option value="projectManager">Project Manager</option>
          <option value="administrator">Administrator</option>
          </Form.Select>
        </Form.Group>
  
        <Button type="submit" className="btn btn-primary mt-3">Create Account</Button>
        <p className="text-center">Already have an account? <Link to="/bug-tracker/login">Log in</Link></p>
      </Form>
    </Container>
  )
}

export default Signup