import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Form from "../../Pages/Form";
import UserContext from "./UserContext";

export default function UserProvider({
	children,
	wss,
}: {
	children: ReactNode;
	wss: WebSocket;
}) {
	const [username, setUsername] = useState(""); // This user's username
	const [_id, setId] = useState(""); // This user's _id (provided by MongoDB)
	const [loggedIn, setLoggedIn] = useState(false); // this loggedIn status will be used to conditionally render the Form
	const [loading, setLoading] = useState(true); // this loading status will be used to conditionally render the <Loading /> Page. Initially it is set to true so that auto-login can be tried while showing the user the loading page instead of the form

	const [selectionOnMobile, setSelectionOnMobile] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token"); // Acquired the token from the localStorage which was stored after previous login or registration success
		if (!token) {
			setLoading(false); // will cancel trying to auto-login if the token is missing from the localStorage and hence will show the form automatically
			return;
		}
		(async () => {
			const { data } = await axios.post("/auth/Wall", {
				token,
				autoLogin: true, // sent so that the server can conditionally make the "Wall" function() a non-middleware http endpoint (see backend files for detail)
			}); // trying to auto-login (making the server check our credentials at the Wall endpoint)
			wss.send(
				JSON.stringify({
					token: localStorage.getItem("token"),
				})
			); // Now we're sending our token to the socket. The socket will only operate if the token is sent and the credentials verify well. Otherwise, the connection will be revoked (see backend files for detail)

			//
			setUsername(data.username); // updating the user's username in UserProvider.tsx
			setId(data._id); // updating the user's _id in UserProvider.tsx
			setLoggedIn(true); // now the Form page will disappear
			setLoading(false); // now the Loading page will disappear
			toast.success(data.message); // user will be notified visually about successful login
		})();
	}, [wss]);

	return (
		<UserContext.Provider
			value={{
				username,
				_id,
				loggedIn,
				loading,
				selectionOnMobile,
				setUsername,
				setId,
				setLoggedIn,
				setLoading,
				setSelectionOnMobile,
			}}
		>
			{loggedIn ? children : <Form wss={wss} />}
		</UserContext.Provider>
	);
	// will render the Form Page if not logged in, otherwise the children will be rendered
}
