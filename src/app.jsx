import { useState } from "react";
import "./app.css";
import Minesweeper from "./components/minesweeper/minesweeper";
import Modal from "./ui/modals/modal";

export default function App() {
	const [show_gameover, set_showgameover] = useState(true);

	return (
		<main className="game">
			<h1>Minesweeper</h1>
			<section className="game_wrapper">
				<Minesweeper level="easy" />
			</section>
			<Modal
				isOpen={show_gameover}
				onClose={set_showgameover.bind(null, false)}
			>
				Hello World
			</Modal>
		</main>
	);
}
