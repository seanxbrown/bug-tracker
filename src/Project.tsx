class Project {
    name: string;
    description: string;
    owner: string;
    assignedUsers: Array<string>;
    assignedTickets: Array<string>;
    createdDate: string;
    id: string

    constructor(name: string, owner: string, description: string, createdDate: string, id: string) {
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.assignedUsers = [];
        this.assignedTickets = [];
        this.createdDate = createdDate;
        this.id = id;
    }
}

export default Project