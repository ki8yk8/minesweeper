import { VscDebugRestart } from "react-icons/vsc";

// restart
export default function Controls({ onRestart }) {
	return (
		<nav>
			<button onClick={onRestart}>
				<VscDebugRestart />
			</button>
		</nav>
	);
}
