import "./app.css";
import Minesweeper from "./components/minesweeper/minesweeper";

export default function App() {
	return (
		<>
			<h1>Minesweeper</h1>
			<Minesweeper level="easy" />
		</>
	);
}
