// Application Users
export interface User {
    name: string;
    code: string;
    admin?: boolean;
    organizer?: boolean;
}

// Event Information
export interface Event {
    name: string;
    created: Date;
}

// Event Participant
export interface Participant {
    name: string;
    email: string;
    message: string;
}
