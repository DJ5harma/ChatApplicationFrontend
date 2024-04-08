import { DataHandlerWSType } from "./DataTypes";

// Every parameter of this function has been defined inside the Home.tsx Page component
export default function DataHandlerWS({
	data, // this is the data that comes from our websocket server when a message arrives (we send a custom data object from our backend with every socket message)

	onlineUsers, // The array of all the usernames that are online

	setOnlineUsers, // To set the users that are online at any point which we'll get to know by the wss connection

	setNumberOfOnlineUsers, // To set the number which holds the count of the users that are online
}: DataHandlerWSType) {
	const DATA = JSON.parse(data); // parsing the data because socket sends the data as string (a string of an object)

	switch (
		DATA.type // in the custom data object from the server, we've set a key named type which contains one of the values written as case conditions
	) {
		case "allOnlineUsers": // type = allOnlineUsers means that our socket has send the data about all the users currently online on the application
			// setUsers(DATA.users);
			DATA.onlineUsers.forEach((username: string) =>
				onlineUsers.add(username)
			);
			setOnlineUsers(onlineUsers);
			setNumberOfOnlineUsers(onlineUsers.size);
			break;

		case "userOnline": // type = userOnline means that some user has connected and hence online
			onlineUsers.add(DATA.username);
			setOnlineUsers(onlineUsers);
			setNumberOfOnlineUsers(onlineUsers.size);
			break;

		case "userOffline": // type = userOffine means that some user has disconnected and hence offline
			onlineUsers.delete(DATA.username);
			setOnlineUsers(onlineUsers);
			setNumberOfOnlineUsers(onlineUsers.size);
			break;

		default:
			break;
	}
}
