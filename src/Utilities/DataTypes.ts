import { Dispatch, SetStateAction } from "react";

// These are the custom data types our variables across different components will need for static type checks

export interface UserType {
	username: string;
	_id: string;
	createdAt: string;
}
export interface DataHandlerWSType {
	data: string;
	onlineUsers: Set<string>;
	setOnlineUsers: Dispatch<SetStateAction<Set<string>>>;
	setNumberOfOnlineUsers: Dispatch<SetStateAction<number>>;
} // This is for the parameters of our DataHandlerWS function() which accepts messages from our webSocket server present in the backend and manipulates the client-side data

export interface UserContextType {
	username: string;
	_id: string;
	loggedIn: boolean;
	loading: boolean;
	selectionOnMobile: boolean;
	setUsername: Dispatch<SetStateAction<string>>;
	setId: Dispatch<SetStateAction<string>>;
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
	setLoading: Dispatch<SetStateAction<boolean>>;
	setSelectionOnMobile: Dispatch<SetStateAction<boolean>>;
} // This is for the UserContext which stores all the needed information about the current user to pass it onto various components

export interface MessageType {
	_id: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	senderId: string;
	receiverId: string;
} // The type of a single message that we create in mongoDB

export interface DataContextType {
	users: UserType[];
	messages: MessageType[];
	selectedUser: UserType;
	onlineUsers: Set<string>;
	setMessages: Dispatch<SetStateAction<MessageType[]>>;
	setSelectedUser: Dispatch<SetStateAction<UserType>>;
	setUsers: Dispatch<SetStateAction<UserType[]>>;
	setOnlineUsers: Dispatch<SetStateAction<Set<string>>>;
} // This is for the MessageContext which stores all the needed information about the message receiving user that we've selected, and also all the messages in our app
