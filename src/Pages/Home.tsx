import { useContext, useEffect, useState } from "react";
import "../Styles/Home.css";
import { UserContext } from "../contexts/User/UserProvider";

import SingleUser from "../components/SingleUser";
import InputSection from "../components/InputSection";

import DataHandlerWS from "../Utilities/DataHandlerWS";
import { UserType } from "../Utilities/DataTypes";
import ChatSection from "../components/ChatSection";
import MessageProvider from "../contexts/Messages/MessagesProvider";
import TopRightBar from "../components/TopRightBar";

export default function Home({ wss }: { wss: WebSocket }) {
	const [users, setUsers] = useState<UserType[]>([]);
	const [onlineUsers, setOnlineUsers] = useState(new Set<string>());
	const [numberOfOnlineUsers, setNumberOfOnlineUsers] = useState(1);
	const { username } = useContext(UserContext);

	useEffect(() => {
		wss.addEventListener("message", ({ data }: { data: string }) => {
			DataHandlerWS({
				data,
				setUsers,
				onlineUsers,
				setOnlineUsers,
				setNumberOfOnlineUsers,
			});
		});
	}, []);

	return (
		<div id="home">
			<MessageProvider wss={wss}>
				<div id="leftSection">
					<p style={{ flex: 1, textAlign: "center" }}>
						user: {username}
					</p>
					<h3 style={{ textAlign: "center" }}>
						OnlineUsers: {numberOfOnlineUsers}
					</h3>
					<div
						style={{ flex: 10, overflow: "auto" }}
						id="usersSection"
					>
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
			</MessageProvider>
		</div>
	);
}
