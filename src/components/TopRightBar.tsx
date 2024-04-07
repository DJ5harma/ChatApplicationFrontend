import { useContext } from "react";
import MessageContext from "../contexts/Messages/MessageContext";

export default function TopRightBar() {
	const { selectedUser } = useContext(MessageContext);
	return (
		<div
			style={{
				flex: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "rgba(0,0,0,0.5)",
			}}
		>
			<h3>
				Talking with:{" "}
				<span style={{ color: "rgb(140,140,255)" }}>
					{selectedUser.username}
				</span>
			</h3>
		</div>
	);
}
