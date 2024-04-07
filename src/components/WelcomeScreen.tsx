import { useContext } from "react";
import { UserContext } from "../contexts/User/UserProvider";

export default function WelcomeScreen() {
	const { username } = useContext(UserContext);
	return (
		<div
			style={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<h1>Welcome {username}!</h1>
			<h2>🤗Glad you're here🤗</h2>
		</div>
	);
}
