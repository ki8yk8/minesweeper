import { useContext } from "react";
import { ToastContext } from "../contexts/toast-context";

export default function useToast() {
	const { show } = useContext(ToastContext);

	function push({ message, type = "info", duration = 4 }) {
		return show({
			message,
			type,
			duration,
		});
	}

	return { push };
}
