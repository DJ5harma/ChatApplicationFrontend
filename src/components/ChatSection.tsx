import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../contexts/User/UserProvider";
import WelcomeScreen from "./WelcomeScreen";
import DataContext from "../contexts/Data/DataContext";
import convertToHumanFriendlyDate from "../Utilities/convertToHumanFriendlyDate";

import "../Styles/ChatSection.css";
import { isMobile } from "react-device-detect";

export default function ChatSection() {
	const { messages, selectedUser } = useContext(DataContext); // Accessing the messages from the DataContext for their display
	const { _id } = useContext(UserContext);

	const chatboxRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (chatboxRef.current) {
			chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight; // scrolls the chatBox down
		}
	}, [messages, selectedUser]); // runs whenever a receiver is selected or a new message arrives (will change the dependencies in the future as deleting the messages would also trigger this)

	if (selectedUser._id === "null") return <WelcomeScreen />; // Show welcome screen if no user selected (which everybody shall see initially)

	const chatBoxMessages = messages.filter((message) => {
		return (
			message.senderId === selectedUser._id ||
			message.receiverId === selectedUser._id
		);
	});

	if (chatBoxMessages.length === 0) {
		return (
			<div
				style={{
					flex: 0.5,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					fontSize: 30,
					gap: 10,
					backgroundColor: "rgba(0,0,0,0.7)",
				}}
			>
				🤪 No messages exchanged with
				<b style={{ color: "rgb(120,120,220)" }}>
					{selectedUser.username}
				</b>
				yet... 🤪
			</div>
		);
	}

	return (
		<div
			style={{ padding: 10, flex: 8, overflow: "auto" }}
			ref={chatboxRef}
		>
			{chatBoxMessages.map((message) => (
				<div
					key={message._id}
					style={{
						display: "flex",
						justifyContent:
							_id === message.senderId
								? "flex-end"
								: "flex-start",
						animation: "fadeOut forwards 0.1s",
					}}
				>
					<div
						className="singleMessageInternal"
						style={{
							backgroundColor:
								_id === message.senderId
									? "rgb(0,0,60)"
									: "black",
							maxWidth: isMobile ? "90vw" : "30vw",
							wordWrap: "break-word",
							marginRight: isMobile ? 12 : "default",
						}}
					>
						<p>{message.content}</p>
						{(() => {
							let date = convertToHumanFriendlyDate(
								message.createdAt
							);
							if (date === "Invalid Date") date = "Now";
							return (
								<p
									style={{
										color: "rgb(150,150,180)",
										fontSize: 12,
									}}
								>
									{date}
								</p>
							);
						})()}
					</div>
				</div>
			))}
		</div>
	);
}
