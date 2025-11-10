import { useEffect } from "react";
import "./style.css";

export default function Toast({ id, message, type, duration, onClose }) {
	useEffect(() => {
		const toast_timeout = setTimeout(() => {
			onClose?.(id);
		}, duration * 1000);

		return () => clearTimeout(toast_timeout);
	}, []);

	return <div className={`toast toast--${type}`}>{message}</div>;
}
