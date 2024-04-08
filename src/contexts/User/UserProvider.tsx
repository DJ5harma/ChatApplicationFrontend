import { ReactNode, createContext, useEffect, useState } from "react";
import { UserContextType } from "../../Utilities/DataTypes";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../Pages/Loading";
import Form from "../../Pages/Form";

export const UserContext = createContext<UserContextType>({
	username: "",
	_id: "",
	loggedIn: false,
	loading: true,
	setUsername: () => {},
	setId: () => {},
	setLoggedIn: () => {},
	setLoading: () => {},
});

export default function UserProvider({
	children,
	wss,
}: {
	children: ReactNode;
	wss: WebSocket;
}) {
	const [username, setUsername] = useState("");
	const [_id, setId] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setLoading(false);
			return;
		}

		(async () => {
			const { data } = await axios.post("/auth/Wall", {
				token,
				autoLogin: true,
			});
			wss.send(
				JSON.stringify({
					token: localStorage.getItem("token"),
				})
			);
			setUsername(data.username);
			setId(data._id);
			setLoggedIn(true);
			setLoading(false);
			toast.success(data.message);
		})();
	}, [wss]);

	return (
		<UserContext.Provider
			value={{
				username,
				_id,
				loggedIn,
				loading,
				setUsername,
				setId,
				setLoggedIn,
				setLoading,
			}}
		>
			{loading ? <Loading /> : !loggedIn ? <Form wss={wss} /> : children}
		</UserContext.Provider>
	);
}
