import { FormEvent, useState} from 'react'
import { Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import CreateProject from "./CreateProject"
import { format } from "date-fns";
import Project from "../Project";
import { v4 as uuidv4 } from "uuid"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

const Dashboard = ({ user }: any) => {

  const [creatingProject, setCreatingProject] = useState(false);

  function openNewProjectDiv() {
    setCreatingProject(true);
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

  return (
    <Container>
      <h2>Dashboard</h2>
      {creatingProject && <CreateProject createNewProject={createNewProject}/>}
      <Container id="dashboardTicketContainer">
        <h3>New Tickets</h3>
        <div>New Tickets to be displayed here</div>
        <Link to="#">View all tickets</Link>
      </Container>
      <Container id="dashboardProjectContainer">
        <h3>Projects</h3>
        <Button type="button" className="btn btn-primary" onClick={openNewProjectDiv}>Create Project</Button>
        <div>Projects to be displayed here</div>
        <Link to="#">View all projects</Link>
      </Container>
      
    </Container>
  )
}

export default Dashboard