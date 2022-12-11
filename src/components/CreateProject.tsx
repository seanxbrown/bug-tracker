import React from 'react'
import { Form, Container, Button } from "react-bootstrap"

const CreateProject = ({ createNewProject }: any) => {
  return (
    <Form className="border border-2 border-secondary p-5" onSubmit={createNewProject}>
        <h2>Create New Project</h2>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" maxLength={20} id="projectName"/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Owner</Form.Label>
            <Form.Control type="text" maxLength={20} id="projectOwner"/>
        </Form.Group>        
        <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} maxLength={150} id="projectDescription"/>
        </Form.Group>
        <Button type="submit" className="btn btn-primary">Create Project</Button>
    </Form>
  )
}

export default CreateProject