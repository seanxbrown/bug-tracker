class Ticket {
    title: string;
    description: string;
    owner: string;
    assignedUsers: Array<string>;
    type: string;
    priority: string;
    status: string;
    createdDate: string;
    id: string

    constructor(title: string, owner: string, description: string, type: string, priority: string, createdDate: string, id: string) {
        this.title = title;
        this.description = description;
        this.owner = owner;
        this.assignedUsers = [];
        this.type = type;
        this.priority = priority;
        this.status = "";
        this.createdDate = createdDate;
        this.id = id;
    }
}

export default Ticket