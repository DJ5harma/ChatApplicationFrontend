import { MessageType, UserType } from "../../Utilities/DataTypes";
import axios from "axios";
import { ReactNode, useContext, useEffect, useState } from "react";
import DataContext from "./DataContext";
import { UserContext } from "../User/UserProvider";

let messagesArray: MessageType[] = [];
let usersArray: UserType[] = [];

export default function DataProvider({
	children,
	wss,
}: {
	children: ReactNode;
	wss: WebSocket;
}) {
	const [users, setUsers] = useState<UserType[]>([]);
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [selectedUser, setSelectedUser] = useState({
		username: "Nobody",
		_id: "null",
	});

	const { setLoading } = useContext(UserContext);

	useEffect(() => {
		setLoading(true);
		(async () => {
			axios
				.post("/data", {
					token: localStorage.getItem("token"),
				})
				.then(({ data }) => {
					if (data.error) return;

					messagesArray = data.messages;
					setMessages(messagesArray);

					usersArray = data.users;
					setUsers(usersArray);
				});
		})();
	}, []);
	useEffect(() => {
		wss?.addEventListener("message", ({ data }: { data: string }) => {
			const DATA = JSON.parse(data);
			if (DATA.type === "sendMessage") {
				messagesArray.push(DATA.message);
				setMessages([...messagesArray]);
			}
		});
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
