import { useEffect } from "react";
import "./style.css";
import {
	IoMdCloseCircleOutline,
	IoMdInformationCircleOutline,
} from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { FiGift } from "react-icons/fi";

const ICON_MAP = {
	info: IoMdInformationCircleOutline,
	error: MdErrorOutline,
	warn: IoWarningOutline,
	gift: FiGift,
};

export default function Toast({ id, message, type, duration, onClose }) {
	const Icon = ICON_MAP[type];

	useEffect(() => {
		const toast_timeout = setTimeout(() => {
			onClose?.(id);
		}, duration * 1000);

		return () => clearTimeout(toast_timeout);
	}, []);

	return (
		<div className={`toast toast--${type}`}>
			<div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
				<Icon />
				<p style={{ fontSize: "0.8rem", fontWeight: 300 }}>{message}</p>
			</div>
			<button className="u-plain" onClick={() => onClose?.(id)}>
				<IoMdCloseCircleOutline />
			</button>
		</div>
	);
}
