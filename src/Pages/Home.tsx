import { useContext, useEffect, useState } from "react";
import "../Styles/Home.css";
import "../Styles/LeftSection.css";
import "../Styles/RightSection.css";
import { UserContext } from "../contexts/User/UserProvider";

import SingleUser from "../components/SingleUser";
import InputSection from "../components/InputSection";

import DataHandlerWS from "../Utilities/DataHandlerWS";
import ChatSection from "../components/ChatSection";
import TopRightBar from "../components/TopRightBar";
import TopLeftBar from "../components/TopLeftBar";
import DataContext from "../contexts/Data/DataContext";

export default function Home({ wss }: { wss: WebSocket }) {
	const { users } = useContext(DataContext); // Accessing the all the users from DataProvider.tsx
	const { username } = useContext(UserContext); // Accessing the current user's username from UserProvider.tsx

	const [onlineUsers, setOnlineUsers] = useState(new Set<string>()); // stores the number of online users which will be changed in realtime inside the DataHandlerWS.ts file. Set is used instead of array to prevent duplicate values
	const [numberOfOnlineUsers, setNumberOfOnlineUsers] = useState(1); // will be changed in the DataHandlerWS as the online users change

	useEffect(() => {
		wss.addEventListener("message", ({ data }: { data: string }) => {
			// this "data" is what comes as an object when the ws server sends a message and it comes as a string
			DataHandlerWS({
				data,
				onlineUsers,
				setOnlineUsers, // sending so that our function can update the onlineUsers in realtime
				setNumberOfOnlineUsers, // sending so that our function can update the number of onlineUsers in realtime
			}); // on arrival of a message, this function will handle: what to do with it? by utilising the above parameters
		}); // This will be constantly listening to our socket for any realtime messages
	}, []);

	return (
		<div id="home">
			<div id="leftSection">
				<TopLeftBar numberOfOnlineUsers={numberOfOnlineUsers} />

				<div style={{ flex: 10, overflow: "auto" }} id="usersSection">
					{users
						.filter((user) => username !== user.username)
						.map(({ username, _id }) => (
							<SingleUser
								key={_id}
								username={username}
								_id={_id}
								onlineUsers={onlineUsers}
							/>
						))}
				</div>
			</div>
			<div id="rightSection">
				<TopRightBar />
				<ChatSection />
				<InputSection wss={wss} />
			</div>
		</div>
	);
}
