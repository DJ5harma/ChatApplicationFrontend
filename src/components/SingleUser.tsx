import { useContext } from "react";
import { singleUserPropType } from "../Utilities/DataTypes";
import DataContext from "../contexts/Data/DataContext";
export default function SingleUser({
	_id,
	username,
	onlineUsers,
}: singleUserPropType) {
	const { selectedUser, setSelectedUser } = useContext(DataContext);

	return (
		<div
			className="singleUser"
			onClick={() => setSelectedUser({ username, _id })}
			style={{
				backgroundColor:
					_id !== selectedUser._id
						? `rgb(20,20,50)`
						: `rgb(100,100,200)`,
			}}
		>
			<span className="namePic">{username[0]}</span>
			<span>
				{username}
				{onlineUsers.has(username) ? ` 👽` : ` 💤`}
			</span>
		</div>
	);
}
