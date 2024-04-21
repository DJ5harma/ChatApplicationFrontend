import { useContext } from "react";
import MessageContext from "../contexts/Data/DataContext";
import convertToHumanFriendlyDate from "../Utilities/convertToHumanFriendlyDate";

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
				<span style={{ fontSize: 15, color: "rgb(150,150,150)" }}>
					{selectedUser._id !== "null" &&
						`, joined: ${convertToHumanFriendlyDate(
							selectedUser.createdAt
						)}`}
				</span>
			</h3>
		</div>
	);
}
