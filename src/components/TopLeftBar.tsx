import { useContext } from "react";
import { UserContext } from "../contexts/User/UserProvider";

export default function TopLeftBar({
	numberOfOnlineUsers,
}: {
	numberOfOnlineUsers: number;
}) {
	const { username, setLoggedIn } = useContext(UserContext);
	return (
		<div
			style={{
				flex: 1,
				display: "flex",
				// flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				padding: "2px 4px",
				backgroundColor: "rgb(0,0,0)",
				gap: 10,
			}}
		>
			<p
				style={{
					borderRadius: 20,
				}}
			>
				user:{" "}
				<span
					style={{
						color: "rgb(160,160,255)",
					}}
				>
					{username}
				</span>
			</p>
			<span style={{ textAlign: "center" }}>
				| othersOnline: {numberOfOnlineUsers - 1}
			</span>
			<button
				onClick={() => {
					localStorage.removeItem("token");
					setLoggedIn(false);
				}}
				style={{ fontSize: "18px" }}
			>
				Logout
			</button>
		</div>
	);
}
