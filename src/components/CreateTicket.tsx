import React from 'react'
import { Form, Container, Button } from "react-bootstrap"
import { IProject, ITicket } from '../ts/interfaces/interfaces'

const CreateTicket = ({ createNewProject, projects }: any) => {

  //3rd Jan todo: Create function to create ticket, add user details to this component
  return (
    <Form className="border border-2 border-secondary p-5" onSubmit={createNewProject}>
        <h2>Create New Ticket</h2>
        <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" maxLength={20} id="ticketTitle"/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" maxLength={150} id="ticketDescription"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Project</Form.Label>
          <Form.Select id="projectID">
            <option value="placeholder">Add Dynamic Projects here</option>
            {projects.map((project: IProject) => {
              return <option value={project.id}>{project.name}</option>
            })}
          </Form.Select>
        </Form.Group>       
        <Form.Group>
          <Form.Label>Ticket Type</Form.Label>
          <Form.Select id="ticketType">
            <option value="bug">Bug Report</option>
            <option value="service">Service Request</option>
            <option value="enhancement">Enhancement Request</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Priority</Form.Label>
          <Form.Select id="ticketPriority">
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