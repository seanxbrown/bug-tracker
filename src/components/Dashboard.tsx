import { FormEvent, useState, useEffect } from 'react'
import { Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import CreateProject from "./CreateProject"
import { format } from "date-fns";
import Project from "../Project";
import { v4 as uuidv4 } from "uuid"
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebaseConfig"

const Dashboard = ({ user }: any) => {

  const [creatingProject, setCreatingProject] = useState(false);
  const [projects, setProjects] = useState<Array<IProject>>([]);

  interface IProject {
    name: string;
    description: string;
    owner: string;
    assignedUsers: Array<string>;
    assignedTickets: Array<string>;
    createdDate: string;
    id: string
  }


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
      <Container id="dashboardTicketContainer">
        <h3>New Tickets</h3>
        <div>New Tickets to be displayed here</div>
        <Link to="#">View all tickets</Link>
      </Container>
      <Container id="dashboardProjectContainer">
        <h3>Projects</h3>
        <Button type="button" className="btn btn-primary" onClick={openNewProjectDiv}>Create Project</Button>
        {projects && projects.map(project => <p>{project.name}</p>)}
        <Link to="#">View all projects</Link>
      </Container>
      
    </Container>
  )
}

export default Dashboard