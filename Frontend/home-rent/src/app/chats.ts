export class Chats {
    senderId: number;
    receiverId: number;
    receiverName: string;
}

export class Messages {
    messageId : number;
    senderId : number;
    receiverId : number;
    message : string;
    read : boolean;
    creationTimestamp : Date
}

export class NewMessage {
    senderId: number;
    receiverId: number;
    message: string;
    read: boolean;
}