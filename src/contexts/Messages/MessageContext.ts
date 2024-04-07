import { createContext } from "react";
import { MessageContextType } from "../../Utilities/DataTypes";

const MessageContext = createContext<MessageContextType>({
	messages: [],
	setMessages: () => {},
	selectedUser: { _id: "null", username: "Nobody" },
	setSelectedUser: () => {},
});
export default MessageContext;
