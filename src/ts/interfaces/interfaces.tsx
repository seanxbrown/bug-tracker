export interface IProject {
    name: string;
    description: string;
    owner: string;
    assignedUsers: Array<string>;
    assignedTickets: Array<string>;
    createdDate: string;
    id: string
  }



  export interface ITicket {
    title: string;
    description: string;
    owner: string;
    assignedUsers: Array<string>;
    type: string;
    priority: string;
    status: string;
    createdDate: string;
    id: string
  }
