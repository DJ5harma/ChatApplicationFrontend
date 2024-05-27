import { useContext, useState } from "react";
import DataContext from "../contexts/Data/DataContext";
import SingleUser from "./SingleUser";

export default function SearchBoxAndUsers() {
	const { users, onlineUsers } = useContext(DataContext);

	const [query, setQuery] = useState("");
	return (
		<div id="usersSection">
			<input
				placeholder="Find somebody..."
				onChange={(e) => setQuery(e.target.value)}
			/>
			{users
				.filter(({ username }) =>
					username.toLowerCase().startsWith(query.toLowerCase())
				)
				.map((user) => (
					<SingleUser
						key={user._id}
						thisSingleUser={user}
						isOnline={onlineUsers.has(user.username)}
					/>
				))}
		</div>
	);
}
