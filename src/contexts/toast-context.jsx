import { createContext, useEffect, useRef, useState } from "react";
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

function Toast({ id, message, type, duration, onClose }) {
	useEffect(() => {
		const toast_timeout = setTimeout(() => {
			onClose?.(id);
		}, duration * 1000);

		return () => clearTimeout(toast_timeout);
	}, []);

	return <div className={`toast toast--${type}`}>{message}</div>;
}

function ToastContainer({ toasts, onClose }) {
	return (
		<section
			style={{
				position: "fixed",
				height: "100vh",
				top: 0,
				left: 0,
				width: "500px",
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
			}}
		>
			{toasts.map(({ id, message, type, duration }) => (
				<Toast
					message={message}
					type={type}
					duration={duration}
					id={id}
					onClose={onClose}
				/>
			))}
		</section>
	);
}
