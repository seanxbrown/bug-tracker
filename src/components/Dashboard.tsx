import React from 'react'
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Container>
      <h2>Dashboard</h2>
      <Container id="dashboardTicketContainer">
        <h3>New Tickets</h3>
        <div>New Tickets to be displayed here</div>
        <Link to="#">View all tickets</Link>
      </Container>
      <Container id="dashboardProjectContainer">
        <h3>Projects</h3>
        <div>Projects to be displayed here</div>
        <Link to="#">View all projects</Link>
      </Container>
      
    </Container>
  )
}

export default Dashboard