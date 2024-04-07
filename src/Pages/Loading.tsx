export default function Loading() {
	return (
		<div
			style={{
				height: "100vh",
				width: "100vw",
				backgroundColor: "black",
				display: "flex",
    flexDirection:"column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<h1>Loading...</h1>
   <p>Please reload the page if it takes too long...</p>
		</div>
	);
}
