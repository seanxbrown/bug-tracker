import { FormEvent, useState, useEffect } from 'react'
import { Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import CreateProject from "./CreateProject"
import { format } from "date-fns";
import Project from "../Project";
import { v4 as uuidv4 } from "uuid"
import { doc, setDoc, collection, query, where, getDocs, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../firebaseConfig";
import CreateTicket from "./CreateTicket"
import { IProject, ITicket } from '../ts/interfaces/interfaces';
import Ticket from "../Ticket"


const Dashboard = ({ user }: any) => {

  const [creatingProject, setCreatingProject] = useState(false);
  const [creatingTicket, setCreatingTicket] = useState(false);
  const [projects, setProjects] = useState<Array<IProject>>([]);
  const [tickets, setTickets] = useState<Array<ITicket>>([])

  function openNewProjectDiv() {
    setCreatingProject(true);
    setCreatingTicket(false)
  }

  function openNewTicketDiv() {
    setCreatingTicket(true);
    setCreatingProject(false);

  }

  async function createNewProject(e: FormEvent) {
    e.preventDefault();

    const projectName: string = (document.getElementById("projectName") as HTMLInputElement).value
    const projectOwner: string = (document.getElementById("projectOwner") as HTMLInputElement).value
    const projectDescription: string = (document.getElementById("projectDescription") as HTMLInputElement).value;
    const projectDate: string = format(Date.now(), "dd/MM/yyyy");
    const projectId: string = uuidv4()
    const newProject = new Project(projectName, projectOwner, projectDescription, projectDate, projectId);

    try {
      await setDoc(doc(db, "projects", projectId), {...newProject})
      setCreatingProject(false)
    } catch(error) {
      alert(error)
    }
 
  }

  async function createNewTicket(e: FormEvent) {
    e.preventDefault();

    const ticketTitle: string = (document.getElementById("ticketTitle") as HTMLInputElement).value
    const ticketDescription: string = (document.getElementById("ticketDescription") as HTMLInputElement).value
    const projectID: string = (document.getElementById("projectID") as HTMLInputElement).value;
    const ticketType: string = (document.getElementById("ticketType") as HTMLInputElement).value;
    const ticketPriority: string = (document.getElementById("ticketPriority") as HTMLInputElement).value;
    const createdDate: string = format(Date.now(), "dd/MM/yyyy");
    const submitter = user.email;
    const ticketID: string = uuidv4()

    const newTicket = new Ticket(ticketTitle, ticketDescription, ticketType, ticketPriority, submitter, createdDate, ticketID);
    console.log(newTicket)
    console.log(projectID)

    const projectRef = doc(db, "projects", projectID);

    try {
      await updateDoc(projectRef, {
        assignedTickets: arrayUnion({...newTicket})
      }
      )
    } catch(e) {
      alert(e)
    }
    setCreatingTicket(false)

  }

  async function getAllProjects() {

    try {
      const querySnapshot = await getDocs(collection(db, "projects"))
      const downloadedProjects: Array<IProject> = []
      querySnapshot.forEach(project =>
        downloadedProjects.push(project.data() as IProject)
        )
      setProjects(downloadedProjects)
     

    } catch(e) {
      console.log(e)
    }
   
 

  }

  function getAllTickets(){
    if(projects.length > 0) {
      const newTickets: Array<any> = [];
      //Big O here is On2. Is there a way to reduce that?
      for (let project of projects) {
        project.assignedTickets.forEach(ticket => newTickets.push(ticket))
        //console.log(project.assignedTickets)
      }
      setTickets(newTickets)

    } else {
      console.log(projects)
      console.log("no projects")
    }

  }


  useEffect(()=> {

    //Admin user - get all projects

    getAllProjects()
    

  }, [])

  
  useEffect(()=> {

    //Admin user - get all projects

    getAllTickets()    

  }, [projects])


  return (
    <Container>
      <h2>Dashboard</h2>
      {creatingProject && <CreateProject createNewProject={createNewProject}/>}
      {creatingTicket && <CreateTicket projects={projects} createNewTicket={createNewTicket}/>}
      <Container id="dashboardTicketContainer">
        <h3>New Tickets</h3>
        {tickets && tickets.map(tickets => <p>{tickets.title}</p>)}
        <Button type="button" className="btn btn-primary" onClick={openNewTicketDiv}>Create Ticket</Button>

      </Container>
      <Container id="dashboardProjectContainer">
        <h3>Projects</h3>
        <Button type="button" className="btn btn-primary" onClick={openNewProjectDiv}>Create Project</Button>
        {projects && projects.map(project => <p>{project.name}</p>)}
      </Container>
      
    </Container>
  )
}

export default Dashboard