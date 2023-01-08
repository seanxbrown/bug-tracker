import { FormEvent, useState, useEffect } from 'react'
import { Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import CreateProject from "./CreateProject"
import { format } from "date-fns";
import Project from "../Project";
import { v4 as uuidv4 } from "uuid"
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebaseConfig";
import CreateTicket from "./CreateTicket"
import { IProject } from '../ts/interfaces/interfaces';


const Dashboard = ({ user }: any) => {

  const [creatingProject, setCreatingProject] = useState(false);
  const [creatingTicket, setCreatingTicket] = useState(false);
  const [projects, setProjects] = useState<Array<IProject>>([]);

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
    const submitter = user.email

    //7th Jan todo, add function to createticket component. Test. Create upload function.

    /*try {
      await setDoc(doc(db, "projects", projectId), {...newProject})
      setCreatingProject(false)
    } catch(error) {
      alert(error)
    }
 */
  }


  useEffect(()=> {

    //Admin user - get all projects
    async function getAllProjects() {

      const querySnapshot = await getDocs(collection(db, "projects"))
      const downloadedProjects: Array<IProject> = []
      querySnapshot.forEach(project =>
        downloadedProjects.push(project.data() as IProject)
        )
        setProjects(downloadedProjects)

    }

    getAllProjects()

  }, [])

  return (
    <Container>
      <h2>Dashboard</h2>
      {creatingProject && <CreateProject createNewProject={createNewProject}/>}
      {creatingTicket && <CreateTicket projects={projects} createNewProject={createNewProject}/>}
      <Container id="dashboardTicketContainer">
        <h3>New Tickets</h3>
        <div>New Tickets to be displayed here</div>
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