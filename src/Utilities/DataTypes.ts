import { Dispatch, SetStateAction } from "react";

export interface UserType {
	username: string;
	_id: string;
}
export interface DataHandlerWSType {
	data: string;
	onlineUsers: Set<string>;
	setUsers: Dispatch<SetStateAction<UserType[]>>;
	setOnlineUsers: Dispatch<SetStateAction<Set<string>>>;
	setNumberOfOnlineUsers: Dispatch<SetStateAction<number>>;
}
export interface singleUserPropType {
	_id: string;
	username: string;
	onlineUsers: Set<string>;
}
export interface UserContextType {
	username: string;
	_id: string;
	loggedIn: boolean;
	loading: boolean;
	setUsername: Dispatch<SetStateAction<string>>;
	setId: Dispatch<SetStateAction<string>>;
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
	setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface MessageType {
	_id: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	senderId: string;
	receiverId: string;
}

export interface MessageContextType {
	messages: MessageType[];
	setMessages: Dispatch<SetStateAction<MessageType[]>>;
	selectedUser: UserType;
	setSelectedUser: Dispatch<SetStateAction<UserType>>;
}
