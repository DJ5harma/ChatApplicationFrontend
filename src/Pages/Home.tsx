import { useContext, useEffect, useState } from "react";
import "../Styles/Home.css";
import "../Styles/LeftSection.css";
import "../Styles/RightSection.css";

import InputSection from "../components/InputSection";

import DataHandlerWS from "../Utilities/DataHandlerWS";
import ChatSection from "../components/ChatSection";
import TopRightBar from "../components/TopRightBar";
import TopLeftBar from "../components/TopLeftBar";
import DataContext from "../contexts/Data/DataContext";
import { isMobile } from "react-device-detect";
import SearchBoxAndUsers from "../components/SearchBoxAndUsers";
import UserContext from "../contexts/User/UserContext";
import Loading from "./Loading";

export default function Home({ wss }: { wss: WebSocket }) {
	const { onlineUsers, setOnlineUsers } = useContext(DataContext); // Accessing the all the users from DataProvider.tsx
	const { selectionOnMobile, loading } = useContext(UserContext); // Accessing the current user's username from UserProvider.tsx

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

	const LeftSection = () => {
		return (
			<div id="leftSection">
				{loading ? (
					<Loading />
				) : (
					<>
						<TopLeftBar
							numberOfOnlineUsers={numberOfOnlineUsers}
							wss={wss}
						/>
						<SearchBoxAndUsers />
					</>
				)}
			</div>
		);
	};

	const RightSection = () => (
		<div id="rightSection">
			<TopRightBar />
			<ChatSection />
			<InputSection wss={wss} />
		</div>
	);

	return (
		<div id="home">
			{(() => {
				if (!isMobile)
					return (
						<>
							<LeftSection />
							<RightSection />
						</>
					);
				if (selectionOnMobile) return <RightSection />;
				return <LeftSection />;
			})()}
		</div>
	);
}
