import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { IUser } from "../ts/interfaces/interfaces";

const UserManagement = ({ user }: any) => {
  const [users, setUsers] = useState<Array<IUser>>([])

  async function getAllUsers() {
    const downloadedUsers: Array<IUser> = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(doc => downloadedUsers.push(doc.data() as IUser))
    setUsers(downloadedUsers)
  }

  useEffect(() => {
    getAllUsers()

  }, [])

  return (
    <div>
      {users && users.map(user => <p>Name: {user.name}, Role: {user.role}</p>)}
    </div>
  )
}





export default UserManagement