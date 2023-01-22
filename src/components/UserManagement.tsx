import { useState, useEffect, FormEvent } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { IUser } from "../ts/interfaces/interfaces";
import { Form, Button } from "react-bootstrap"

const UserManagement = ({ user }: any) => {
  const [users, setUsers] = useState<Array<IUser>>([])

  const userRoleObject: any = {
    user: "User",
    developer: "Developer",
    projectManager: "Project Manager",
    administrator: "Administrator"
  }

  async function getAllUsers() {
    const downloadedUsers: Array<IUser> = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(doc => downloadedUsers.push(doc.data() as IUser))
    setUsers(downloadedUsers)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const selectedUser = (document.getElementById("userSelect") as HTMLInputElement).value
    const selectedRole =(document.getElementById("roleSelect") as HTMLInputElement).value
    console.log(selectedUser, selectedRole)
    updateUserRole(selectedUser, selectedRole)


  }

  async function updateUserRole(id: string, newRole: string) {
    const docRef = doc(db, "users", id)
    await updateDoc(docRef, {
      role: newRole
    })
    getAllUsers()

  }

  useEffect(() => {
    getAllUsers()

  }, [])

  return (
    <div>
      <Form action="#" method="#" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Select User</Form.Label>
          <Form.Select id="userSelect">
          {users && users.map(user => <option value={user.id}>{user.name}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Select Role</Form.Label>
          <Form.Select id="roleSelect">
            <option value="user">User</option>
            <option value="developer">Developer</option>
            <option value="projectManager">Project Manager</option>
            <option value="administrator">Administrator</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" className="btn btn-primary">Update Role</Button>
      </Form>

      <div>
        <h2>User List</h2>
        {users && users.map(user => <p>{user.name}, {user.email}, {userRoleObject[user.role]}</p>)}
      </div>
    </div>
  )
}





export default UserManagement