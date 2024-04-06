import axios from "axios";
import { useContext } from "react";

import Form from "./Pages/Form";
import Home from "./Pages/Home";
import Loading from "./Pages/Loading";

import { UserContext } from "./contexts/User/UserProvider";

import { API_URL } from "./Utilities/HardCodedData";

function App() {
	const { loggedIn, loading } = useContext(UserContext);

	axios.defaults.baseURL = API_URL;
	axios.defaults.withCredentials = true;

	if (loading) return <Loading />;
	if (!loggedIn) return <Form />;

	return <Home />;
}

export default App;
