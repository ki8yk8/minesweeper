import { createContext, useRef, useState } from "react";
import ToastContainer from "../components/toast/toast-container";
import { createPortal } from "react-dom";

export const ToastContext = createContext({
	messages: {},
});

export function ToastContextProvider({ children }) {
	const [toasts, set_toasts] = useState([]);
	const counter = useRef(0);

	function show({ message, type, duration }) {
		const id = ++counter.current;

		set_toasts((prev) => [
			...prev,
			{
				id,
				message,
				type,
				duration,
			},
		]);

		return id;
	}

	function hide(id) {
		set_toasts((prev) => prev.filter((x) => x.id !== id));
	}

	return (
		<ToastContext.Provider value={{ show, hide }}>
			{children}
			{createPortal(
				<ToastContainer toasts={toasts} onClose={hide} />,
				document.getElementById("toaster-root")
			)}
		</ToastContext.Provider>
	);
}
