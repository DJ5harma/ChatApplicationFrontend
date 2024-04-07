import axios from "axios";
import { useContext, useEffect, useState } from "react";

import Form from "./Pages/Form";
import Home from "./Pages/Home";
import Loading from "./Pages/Loading";

import { UserContext } from "./contexts/User/UserProvider";

import { API_URL, WEB_SOCKET_URL } from "./Utilities/HardCodedData";

function App() {
	const [wss, setWss] = useState<WebSocket>();
	const { loggedIn, loading } = useContext(UserContext);

	useEffect(() => {
		const wss = new WebSocket(WEB_SOCKET_URL);
		setWss(wss);
	}, []);

	axios.defaults.baseURL = API_URL;
	axios.defaults.withCredentials = true;

	if (!wss || loading) return <Loading />;
	if (!loggedIn) return <Form wss={wss} />;

	return <Home wss={wss} />;
}

export default App;
