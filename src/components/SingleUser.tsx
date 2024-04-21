import { useContext } from "react";
import { singleUserPropType } from "../Utilities/DataTypes";
import DataContext from "../contexts/Data/DataContext";
import { UserContext } from "../contexts/User/UserProvider";
export default function SingleUser({
	thisSingleUser,
	onlineUsers,
}: singleUserPropType) {
	const { selectedUser, setSelectedUser, messages } = useContext(DataContext);

	const { _id } = useContext(UserContext);

	const latestMessage = () => {
		for (let i = messages.length - 1; i >= 0; --i) {
			if (
				(messages[i].receiverId === thisSingleUser._id &&
					messages[i].senderId === _id) ||
				(messages[i].receiverId === _id &&
					messages[i].senderId === thisSingleUser._id)
			) {
				const value = messages[i].content.slice(0, 30);
				return `${value}${
					messages[i].content.length > 30 ? "..." : ""
				}`;
			}
		}
		return "";
	};

	return (
		<div
			className="singleUser"
			onClick={() => setSelectedUser(thisSingleUser)}
			style={{
				backgroundColor:
					thisSingleUser._id !== selectedUser._id
						? `rgb(20,20,50)`
						: `rgb(100,100,200)`,
			}}
		>
			<span className="namePic">{thisSingleUser.username[0]}</span>
			<div>
				<span>
					{thisSingleUser.username}
					{onlineUsers.has(thisSingleUser.username) ? ` 👽` : ` 💤`}
				</span>
				<p
					style={{
						fontSize: 12,
						color: "rgb(200,200,200)",
					}}
				>
					{latestMessage()}
				</p>
			</div>
		</div>
	);
}
