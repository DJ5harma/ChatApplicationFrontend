import { useContext } from "react";
import MessageContext from "../contexts/Data/DataContext";

export default function TopRightBar() {
	const { selectedUser } = useContext(MessageContext);
	return (
		<div
			style={{
				flex: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "rgb(0,0,0)",
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
