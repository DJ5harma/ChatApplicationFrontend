import { createContext } from "react";
import { DataContextType } from "../../Utilities/DataTypes";

const DataContext = createContext<DataContextType>({
	users: [],
	messages: [],
	selectedUser: { _id: "null", username: "Nobody", createdAt: "" },
	onlineUsers: new Set<string>(),
	setMessages: () => {},
	setSelectedUser: () => {},
	setUsers: () => {},
	setOnlineUsers: () => {},
});
export default DataContext;
