import { createContext } from "react";
import { UserContextType } from "../../Utilities/DataTypes";

const UserContext = createContext<UserContextType>({
	username: "",
	_id: "",
	loggedIn: false,
	loading: true,
	selectionOnMobile: false,
	setUsername: () => {},
	setId: () => {},
	setLoggedIn: () => {},
	setLoading: () => {},
	setSelectionOnMobile: () => {},
});

export default UserContext;
