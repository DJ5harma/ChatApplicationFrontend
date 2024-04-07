import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { UserContextType } from "../../Utilities/DataTypes";

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

export default function UserProvider({ children }: { children: ReactNode }) {
	const [username, setUsername] = useState("");
	const [_id, setId] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(false);

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
			{children}
		</UserContext.Provider>
	);
}
