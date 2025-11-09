import "./app.css";
import Minesweeper from "./components/minesweeper/minesweeper";

export default function App() {
	return (
		<main className="game">
			<h1>Minesweeper</h1>
			<section className="game_wrapper">
				<Minesweeper level="hard" />
			</section>
		</main>
	);
}
