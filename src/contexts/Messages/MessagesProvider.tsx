import { MessageType } from "../../Utilities/DataTypes";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import MessageContext from "./MessageContext";

let messagesArray: MessageType[] = [];

export default function MessageProvider({
	children,
	wss,
}: {
	children: ReactNode;
	wss: WebSocket;
}) {
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [selectedUser, setSelectedUser] = useState({
		username: "Nobody",
		_id: "null",
	});

	useEffect(() => {
		(async () => {
			const { data } = await axios.post("/messages", {
				token: localStorage.getItem("token"),
			});
			if (data.error) return;
			messagesArray = data.messages;
			setMessages(messagesArray);
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
		<MessageContext.Provider
			value={{ messages, setMessages, selectedUser, setSelectedUser }}
		>
			{children}
		</MessageContext.Provider>
	);
}
