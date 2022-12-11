class User {
    name: string;
    email: string;
    role: string;
    projects: Array<string>;
    ticketsCreated: Array<string>;
    ticketsAssigned: Array<string>

    constructor(name: string, email: string, role: string) {
        this.name = name;
        this. email = email;
        this.role = role;
        this.projects = [];
        this.ticketsCreated = []
        this.ticketsAssigned = []
    }
}

export default User