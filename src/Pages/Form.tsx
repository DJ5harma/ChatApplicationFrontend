import { useContext, useEffect, useState } from "react";
import "../Styles/Form.css";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../contexts/User/UserProvider";

export default function Form({ wss }: { wss: WebSocket }) {
	const [pageType, setPageType] = useState("Login");
	const [user, setUser] = useState({
		username: "",
		password: "",
	});
	const [confirmPassword, setConfirmPassword] = useState("");

	const { setLoggedIn, setUsername, setId } = useContext(UserContext);

	async function handleForm() {
		if (user.password !== confirmPassword && pageType === "Register") {
			toast.error("Password and Confirm password fields must match!");
			return;
		}
		if (user.password.length < 6) {
			toast.error("Password must contain atleast 6 characters!");
			return;
		}

		const { data } = await axios.post(`/auth/${pageType}`, user);
		console.log(data);
		if (data.error) toast.error(data.error);
		else {
			localStorage.setItem("token", data.token);
			wss.send(
				JSON.stringify({
					token: localStorage.getItem("token"),
				})
			);
			setUsername(data.username);
			setId(data._id);
			setLoggedIn(true);
			toast.success(data.message);
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) return;

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
			toast.success(data.message);
		})();
	}, []);

	return (
		<div id="form">
			<h1>ChatApp</h1>
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
