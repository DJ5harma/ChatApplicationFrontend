import { DataHandlerWSType } from "./DataTypes";

export default function DataHandlerWS({
	data,
	setUsers,
	onlineUsers,
	setOnlineUsers,
	setNumberOfOnlineUsers,
}: DataHandlerWSType) {
	const DATA = JSON.parse(data);
	switch (DATA.type) {
		case "allUsers":
			setUsers(DATA.users);
			DATA.onlineUsers.forEach((username: string) =>
				onlineUsers.add(username)
			);
			setOnlineUsers(onlineUsers);
			setNumberOfOnlineUsers(onlineUsers.size);
			break;

		case "userOnline":
			onlineUsers.add(DATA.username);
			setOnlineUsers(onlineUsers);
			setNumberOfOnlineUsers(onlineUsers.size);
			break;

		case "userOffline":
			onlineUsers.delete(DATA.username);
			setOnlineUsers(onlineUsers);
			setNumberOfOnlineUsers(onlineUsers.size);
			break;

		default:
			break;
	}
}
