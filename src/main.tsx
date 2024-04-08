import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast"; // Provides good quality error/success/etc. messages so we don't have to make them from scratch

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Toaster />
		<App />
	</React.StrictMode>
);
