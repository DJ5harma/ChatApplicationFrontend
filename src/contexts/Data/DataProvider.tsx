import { MessageType, UserType } from "../../Utilities/DataTypes";
import axios from "axios";
import { ReactNode, useContext, useEffect, useState } from "react";
import DataContext from "./DataContext";
import { UserContext } from "../User/UserProvider";

// Made these two arrays because the setting of users and messages didn't happen as expected when tested directly (Probably something related to rerenders, will have to see). Using these fixed the issue
let messagesArray: MessageType[] = [];
let usersArray: UserType[] = [];

export default function DataProvider({
	children,
	wss,
}: {
	children: ReactNode;
	wss: WebSocket;
}) {
	const [users, setUsers] = useState<UserType[]>([]); // for storing all the users registered on the app
	const [messages, setMessages] = useState<MessageType[]>([]); // for storing all the messages sent/received by current user (filtered and sent from the server, only used here)
	const [selectedUser, setSelectedUser] = useState({
		username: "Nobody",
		_id: "null",
	}); // for keeping track of the user that the current user is chatting with

	const { setLoading } = useContext(UserContext); // accessing this form UserProvider in order to

	useEffect(() => {
		setLoading(true);
		(async () => {
			const { data } = await axios.post("/data", {
				token: localStorage.getItem("token"),
			}); // fetching the messages and users from the database through server
			if (data.error) {
				setLoading(false);
				return;
			}

			messagesArray = data.messages;
			setMessages(messagesArray);

			usersArray = data.users;
			setUsers(usersArray);

			setLoading(false);
		})();
	}, []);
	useEffect(() => {
		wss?.addEventListener("message", ({ data }: { data: string }) => {
			const DATA = JSON.parse(data);
			if (DATA.type === "sendMessage") {
				messagesArray.push(DATA.message);
				setMessages([...messagesArray]);
			}
		}); // This is not handled in the DataHandlerWS, but here
	}, [wss]);

	return (
		<DataContext.Provider
			value={{
				users,
				messages,
				setMessages,
				selectedUser,
				setSelectedUser,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}
