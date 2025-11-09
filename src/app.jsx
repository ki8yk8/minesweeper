import { useState } from "react";
import "./app.css";
import Minesweeper from "./components/minesweeper/minesweeper";
import Modal from "./ui/modals/modal";

export default function App() {
	const [show_modal, set_show_modal] = useState({
		gameover: false,
		gamewin: false,
	});

	function handleGameWin() {
		set_show_modal((prev) => ({ ...prev, gamewin: true }));
	}

	function handleGameLose() {
		set_show_modal((prev) => ({ ...prev, gameover: true }));
	}

	return (
		<main className="game">
			<h1>Minesweeper</h1>
			<section className="game_wrapper">
				<Minesweeper
					level="easy"
					onWin={handleGameWin}
					onLose={handleGameLose}
				/>
			</section>
			<Modal
				isOpen={show_modal.gameover}
				onClose={() => {
					set_show_modal((prev) => ({ ...prev, gameover: false }));
				}}
			>
				You stepped on a mine.
			</Modal>
			<Modal
				isOpen={show_modal.gamewin}
				onClose={() => {
					set_show_modal((prev) => ({ ...prev, gamewin: false }));
				}}
			>
				Congratulations! You Won
			</Modal>
		</main>
	);
}
