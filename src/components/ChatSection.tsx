import { useContext } from "react";

import { UserContext } from "../contexts/User/UserProvider";
import MessageContext from "../contexts/Messages/MessageContext";

export default function ChatSection() {
	const { messages, selectedUser } = useContext(MessageContext);

	const { _id } = useContext(UserContext);

	return (
		<div style={{ flex: 8, border: "solid", overflow: "auto" }}>
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
							}}
						>
							{message.content}
						</p>
					</div>
				))}
		</div>
	);
}
