import React from 'react'
import { Form, Container, Button } from "react-bootstrap"

const CreateTicket = ({ createNewProject }: any) => {
  return (
    <Form className="border border-2 border-secondary p-5" onSubmit={createNewProject}>
        <h2>Create New Ticket</h2>
        <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" maxLength={20} id="projectName"/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" maxLength={150} id="projectOwner"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Project</Form.Label>
          <Form.Select>
            <option value="bug">Add Dynamic Projects here</option>
          </Form.Select>
        </Form.Group>       
        <Form.Group>
          <Form.Label>Ticket Type</Form.Label>
          <Form.Select>
            <option value="bug">Bug Report</option>
            <option value="service">Service Request</option>
            <option value="enhancement">Enhancement Request</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Priority</Form.Label>
          <Form.Select>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" className="btn btn-primary">Create Ticket</Button>
    </Form>
  )
}

export default CreateTicket