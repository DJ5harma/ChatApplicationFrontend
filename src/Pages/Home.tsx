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
	const { users } = useContext(DataContext);
	const [onlineUsers, setOnlineUsers] = useState(new Set<string>());
	const [numberOfOnlineUsers, setNumberOfOnlineUsers] = useState(1);
	const { username } = useContext(UserContext);

	useEffect(() => {
		wss.addEventListener("message", ({ data }: { data: string }) => {
			DataHandlerWS({
				data,
				onlineUsers,
				setOnlineUsers,
				setNumberOfOnlineUsers,
			});
		});
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
