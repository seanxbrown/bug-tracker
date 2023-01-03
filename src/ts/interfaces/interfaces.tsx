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
    name: string;
    description: string;
    owner: string;
    assignedUsers: Array<string>;
    assignedTickets: Array<string>;
    createdDate: string;
    id: string
  }
