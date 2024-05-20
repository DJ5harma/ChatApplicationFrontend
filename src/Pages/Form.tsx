import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../Styles/Form.css";
import { UserContext } from "../contexts/User/UserProvider";
import Loading from "./Loading";

export default function Form({ wss }: { wss: WebSocket }) {
	const [pageType, setPageType] = useState("Login");
	const [user, setUser] = useState({
		username: "",
		password: "",
	});
	const [confirmPassword, setConfirmPassword] = useState("");

	const { loading, setLoggedIn, setUsername, setId, setLoading } =
		useContext(UserContext);

	async function handleForm() {
		// Will run on clicking the Login/Register button
		if (pageType === "Register") {
			if (user.password !== confirmPassword) {
				toast.error("Password and Confirm password fields must match!");
				return;
			}
			if (user.password.length < 6) {
				toast.error("Password must contain atleast 6 characters!");
				return;
			}
		}
		setLoading(true); // now loading page will be shown until we evaluate the response

		const { data } = await axios.post(`/auth/${pageType}`, user); // making a post request to the server at login/register endpoint with the req.body as "user" itself

		if (data.error) {
			// runs if the custom key error is received from the server in data object
			toast.error(data.error); // user will be notified visually about failed login with custom error message defined in the server itself
			setLoading(false); // now the Loading page will disappear
			return; // getting out of this function
		}

		localStorage.setItem("token", data.token); // storing the token in localStorage for future auto-logging to be performed in the UserProvider.tsx file
		wss.send(
			JSON.stringify({
				token: localStorage.getItem("token"),
			})
		); // This will send the token to our websocket so that our wss function() on the server can verify our identity

		setUsername(data.username); // updating the user's username in UserProvider.tsx
		setId(data._id); // updating the user's _id in UserProvider.tsx
		setLoggedIn(true); // now the Form page will disappear
		setLoading(false); // now the Loading page will disappear
		toast.success(data.message); // user will be notified visually about successful login
	}
	if (loading) return <Loading />; // it is basically showing the loading page until the auto-login is performed in the UserProvider.tsx file. That file will setLoading(true) and try auto-logging. "loading" will be true until an error/success message arrives, and then setLoading(false)

	return (
		// will run if "loading" === "false" and "loggedIn" === "false". loggedIn is also defined in UserProvider and will be changed there only according to the response from server when tried autoLogging
		<div id="form">
			<h1>ChatApp</h1>
			<span>By Dhananjay</span>
			<input
				type="text"
				placeholder="Username"
				value={user.username}
				onChange={(e) => setUser({ ...user, username: e.target.value })}
			/>
			<input
				type="password"
				placeholder={`Password ${
					pageType === "Register" ? "(min. 6 chars)" : ""
				}`}
				value={user.password}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
			/>
			{pageType === "Register" && (
				<input
					type="password"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			)}
			<button onClick={handleForm}>{pageType}</button>
			<p
				onClick={() => {
					if (pageType === "Login") {
						setPageType("Register");
						return;
					}
					setPageType("Login");
				}}
			>
				Or click here to {pageType === "Login" ? "Register" : "Login"}!
			</p>
		</div>
	);
}
