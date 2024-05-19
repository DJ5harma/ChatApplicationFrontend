import { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../contexts/Data/DataContext";
export default function InputSection({ wss }: { wss: WebSocket }) {
	const [message, setMessage] = useState("");

	const { selectedUser } = useContext(DataContext); // Accessing the selectedUser from DataProvider.tsx

	const inputSectionRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const setFooterPosition = () => {
			if (inputSectionRef.current) {
				inputSectionRef.current.style.bottom = "0";
			}
		};

		window.addEventListener("resize", setFooterPosition);
		window.addEventListener("scroll", setFooterPosition);
		window.addEventListener("orientationchange", setFooterPosition);

		setFooterPosition();

		return () => {
			window.removeEventListener("resize", setFooterPosition);
			window.removeEventListener("scroll", setFooterPosition);
			window.removeEventListener("orientationchange", setFooterPosition);
		};
	}, []); // Mobile browser toolbars hide the inputSection. This will fix that (hopefully)

	if (selectedUser._id === "null") {
		return (
			<div style={{ padding: 20, backgroundColor: "rgb(0,0,0)" }}>
				<h3>Please select a user to exchange messages!</h3>
			</div>
		);
	}

	return (
		<div id="inputSection" ref={inputSectionRef}>
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
