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
			break;

		case "userOnline":
			setOnlineUsers((onlineUsers) => {
				onlineUsers.add(DATA.username);
				return onlineUsers;
			});
			setNumberOfOnlineUsers(onlineUsers.size);
			break;

		case "userOffline":
			setOnlineUsers((onlineUsers) => {
				onlineUsers.delete(DATA.username);
				return onlineUsers;
			});
			setNumberOfOnlineUsers(onlineUsers.size);
			break;

		default:
			break;
	}
}
