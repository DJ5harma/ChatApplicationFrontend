import { createContext } from "react";
import { MessageContextType } from "../../Utilities/DataTypes";

const MessageContext = createContext<MessageContextType>({
	messages: [
		{
			_id: "Loading...",
			content: "Loading...",
			createdAt: "Loading...",
			updatedAt: "Loading...",
			receiverId: "Loading...",
			senderId: "Loading...",
		},
	],
	setMessages: () => {},
	selectedUser: { _id: "null", username: "Nobody" },
	setSelectedUser: () => {},
});
export default MessageContext;
