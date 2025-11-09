import { useState } from "react";
import "./app.css";
import Minesweeper from "./components/minesweeper/minesweeper";
import Modal from "./ui/modals/modal";

export default function App() {
	const [gameover_msg, set_gameover_msg] = useState(false);

	function handleGameOver() {
		show_gameover(true);
	}

	return (
		<main className="game">
			<h1>Minesweeper</h1>
			<section className="game_wrapper">
				<Minesweeper level="easy" />
			</section>
			<Modal isOpen={gameover_msg} onClose={set_gameover_msg.bind(null, false)}>
				Hello World
			</Modal>
		</main>
	);
}
