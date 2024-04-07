import { useContext, useState } from "react";
import MessageContext from "../contexts/Messages/MessageContext";
export default function InputSection({ wss }: { wss: WebSocket | undefined }) {
	const [message, setMessage] = useState("");

	const { selectedUser } = useContext(MessageContext);

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
			/>
			<button
				onClick={() => {
					wss &&
						wss.send(
							JSON.stringify({
								type: "sendMessage",
								content: message,
								receiverId: selectedUser._id,
							})
						);
					setMessage("");
				}}
			>
				Send
			</button>
		</div>
	);
}
