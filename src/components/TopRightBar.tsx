import { useContext } from "react";
import MessageContext from "../contexts/Messages/MessageContext";

export default function TopRightBar() {
	const { selectedUser } = useContext(MessageContext);
	return (
		<h3 style={{ flex: 1, textAlign: "center" }}>
			Talking with: {selectedUser.username}
		</h3>
	);
}
