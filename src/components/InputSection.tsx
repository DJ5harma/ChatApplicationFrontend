import { useContext, useState } from "react";
import DataContext from "../contexts/Data/DataContext";
export default function InputSection({ wss }: { wss: WebSocket }) {
	const [message, setMessage] = useState("");

	const { selectedUser } = useContext(DataContext); // Accessing the selectedUser from DataProvider.tsx

	if (selectedUser._id === "null") {
		return (
			<div style={{ padding: 20, backgroundColor: "rgb(0,0,0)" }}>
				<h3>Please select a user to exchange messages!</h3>
			</div>
		);
	}
	return (
		<div id="inputSection">
			<input
				placeholder="Enter your message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				style={{
					width: "70%",
				}}
			/>
			<button
				onClick={() => {
					if (message === "") return;
					wss.send(
						JSON.stringify({
							type: "sendMessage",
							content: message,
							receiverId: selectedUser._id,
						})
					); // Sending the message to our socket
					setMessage("");
				}}
			>
				Send
			</button>
		</div>
	);
}
