import React from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom"

const NavComponent = ({ logUserOut, user } : any) => {
  return (
    <Navbar bg="dark" expand="lg">
    <Container>
      <Navbar.Brand>Bug Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/bug-tracker" className="nav-link">Home</Link>
          <Link to="/bug-tracker/dashboard" className="nav-link">Dashboard</Link>
          {user && user.role === "administrator" ? <Link to="/bug-tracker/usermanagement" className="nav-link">User Management</Link> : null}
          <Link to="/bug-tracker/profile" className="nav-link">Profile</Link>
          <Nav.Item>
            <Nav.Link onClick={logUserOut}>Log Out</Nav.Link>
          </Nav.Item>
          <Navbar.Text>{user ? `Logged in as ${user.email}` : null}</Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavComponent