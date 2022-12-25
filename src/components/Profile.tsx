import React from 'react'
import { Container, Button } from "react-bootstrap"

const Profile = ({ user }: any) => {
  return (
    <div>
      <h2>Hello, {user.name}</h2>
      <Container className="w-75 p-4 border border-2 border-secondary">
        <p><strong>Name: </strong>{user.name}</p>
        <p><strong>Email: </strong>{user.email}</p>
        <p><strong>Role: </strong>{user.role}</p>
        <div className="d-flex justify-content-around">
          <p>Edit Profile</p>
          <p>Change Password</p>
        </div>
      </Container>
      
    </div>
  )
}

export default Profile