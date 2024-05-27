import { useContext, useEffect, useState } from "react";
import DataContext from "../contexts/Data/DataContext";
import SingleUser from "./SingleUser";
import { UserType } from "../Utilities/DataTypes";
import UserContext from "../contexts/User/UserContext";

export default function SearchBoxAndUsers() {
	const { users, onlineUsers, messages } = useContext(DataContext);

	const { username } = useContext(UserContext);

	const [query, setQuery] = useState("");

	const [newUsers, setNewUsers] = useState<UserType[]>([]);

	useEffect(() => {
		const userIdsSortedByLatestMessage: Set<string> = new Set();
		for (let i = messages.length - 1; i >= 0; i--) {
			userIdsSortedByLatestMessage.add(messages[i].senderId);
			userIdsSortedByLatestMessage.add(messages[i].receiverId);
		} //sorted by the last message exchanged
		users.forEach(({ _id }) => userIdsSortedByLatestMessage.add(_id)); //added users not interacted with

		userIdsSortedByLatestMessage.forEach((Rid) => {
			newUsers.push(users.find(({ _id }) => _id === Rid)!);
		});

		setNewUsers([...newUsers]);
	}, [messages]); // Sorts the users to be shown in ascending order of the last message they sentge

	const [found, setFound] = useState(true);

	return (
		<div id="usersSection">
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
				}}
			>
				<input
					placeholder="Find somebody..."
					onChange={(e) => {
						setFound(false);
						setQuery(e.target.value);
					}}
				/>
			</div>
			{newUsers
				.filter(
					(user) =>
						user.username
							.toLowerCase()
							.includes(query.toLowerCase()) &&
						user.username !== username
				)
				.map((user) => {
					if (!found) setFound(true);
					return (
						<SingleUser
							key={user._id}
							thisSingleUser={user}
							isOnline={onlineUsers.has(user.username)}
						/>
					);
				})}
			{!found && (
				<p>
					Username "<b>{query}</b>" not found!
				</p>
			)}
		</div>
	);
}
