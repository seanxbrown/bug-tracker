class User {
    name: string;
    email: string;
    role: string;
    projects: Array<string>;
    ticketsCreated: Array<string>;
    ticketsAssigned: Array<string>;
    id: string;

    constructor(name: string, email: string, role: string, id: string) {
        this.name = name;
        this. email = email;
        this.role = role;
        this.projects = [];
        this.ticketsCreated = []
        this.ticketsAssigned = [];
        this.id = id
    }
}

export default User