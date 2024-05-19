import { useContext } from "react";
import DataContext from "../contexts/Data/DataContext";
import convertToHumanFriendlyDate from "../Utilities/convertToHumanFriendlyDate";
import { isMobile } from "react-device-detect";
import { UserContext } from "../contexts/User/UserProvider";

export default function TopRightBar() {
	const { selectedUser } = useContext(DataContext);
	const { setSelectionOnMobile } = useContext(UserContext);

	return (
		<div id="topRightBar">
			{isMobile && (
				<button
					style={{
						position: "fixed",
						left: 6,
						top: 15,
						borderRadius: 15,
					}}
					onClick={() => setSelectionOnMobile(false)}
				>
					{"<"}
				</button>
			)}
			<h3
				style={{
					display: "flex",
					flexDirection: isMobile ? "column" : "row",
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
				}}
			>
				<span>
					Chatting with:{" "}
					<span style={{ color: "rgb(140,140,255)" }}>
						{selectedUser.username}
					</span>
				</span>
				<span style={{ fontSize: 15, color: "rgb(150,150,150)" }}>
					{selectedUser._id !== "null" &&
						`${
							isMobile ? " " : ", "
						}joined: ${convertToHumanFriendlyDate(
							selectedUser.createdAt
						)}`}
				</span>
			</h3>
		</div>
	);
}
