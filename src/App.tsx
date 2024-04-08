import axios from "axios";
import { useEffect, useState } from "react";

import Home from "./Pages/Home";
import Loading from "./Pages/Loading";

import UserProvider from "./contexts/User/UserProvider";

import { API_URL, WEB_SOCKET_URL } from "./Utilities/HardCodedData";
import DataProvider from "./contexts/Data/DataProvider";
function App() {
	const [wss, setWss] = useState<WebSocket>(); // defining a variable wss to store the websocket conection that we'll establish in the useEffect hook

	useEffect(() => {
		const WebSocketServerConnection = new WebSocket(WEB_SOCKET_URL); // a new local variable is now making and storing the web socket server connection
		setWss(WebSocketServerConnection); // we set our wss variable to hold this connection so that we can pass it on to other components
	}, []);

	axios.defaults.baseURL = API_URL; // Telling axios to always refer requests with our HardCoded URL as prefix
	// axios.defaults.withCredentials = true;

	if (!wss) return <Loading />;

	// if everything checks out, we'll render the
	return (
		<UserProvider wss={wss}>
			<DataProvider wss={wss}>
				<Home wss={wss} />
			</DataProvider>
		</UserProvider>
	);
}

export default App;
