import { useContext, useEffect, useRef } from "react";

import { UserContext } from "../contexts/User/UserProvider";
import MessageContext from "../contexts/Data/DataContext";
import WelcomeScreen from "./WelcomeScreen";

export default function ChatSection() {
	const { messages, selectedUser } = useContext(MessageContext);
	const { _id } = useContext(UserContext);

	const chatboxRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (chatboxRef.current) {
			chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
		}
	}, [messages, selectedUser]);

	if (selectedUser._id === "null") {
		return <WelcomeScreen />;
	}

	return (
		<div
			style={{ padding: 10, flex: 8, overflow: "auto" }}
			ref={chatboxRef}
		>
			{messages
				.filter((message) => {
					return (
						message.senderId === selectedUser._id ||
						message.receiverId === selectedUser._id
					);
				})
				.map((message) => (
					<div
						key={message._id}
						style={{
							display: "flex",
							justifyContent:
								_id === message.senderId
									? "flex-end"
									: "flex-start",
						}}
					>
						<p
							style={{
								padding: "10px 15px",
								margin: 5,
								border: "solid",
								borderRadius: 20,
								maxWidth: "30vw",
								wordWrap: "break-word",
								backgroundColor:
									_id === message.senderId
										? "rgb(0,0,60)"
										: "black",
							}}
						>
							{message.content}
						</p>
					</div>
				))}
		</div>
	);
}
