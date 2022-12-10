import { EmailAuthCredential } from "firebase/auth";

class User {
    name: string;
    email: string;
    role: string;
    projects: Array<string>

    constructor(name: string, email: string, role: string, projects: Array<string>) {
        this.name = name;
        this. email = email;
        this.role = role;
        this.projects = projects;
    }
}

export default User