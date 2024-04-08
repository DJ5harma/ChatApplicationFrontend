import { createContext } from "react";
import { DataContextType } from "../../Utilities/DataTypes";

const DataContext = createContext<DataContextType>({
	users: [],
	messages: [],
	setMessages: () => {},
	selectedUser: { _id: "null", username: "Nobody" },
	setSelectedUser: () => {},
});
export default DataContext;