import { useContext, useState } from "react";
import "./app.css";
import Minesweeper from "./components/minesweeper/minesweeper";
import Modal from "./ui/modals/modal";
import Controls from "./components/controls/controls";
import { CoinContext } from "./contexts/coin-context";

export default function App() {
	const [show_modal, set_show_modal] = useState({
		gameover: false,
		gamewin: false,
	});
	const [reset, set_reset] = useState(false);
	const { coins, set_coins } = useContext(CoinContext);

	function handleGameWin() {
		set_show_modal((prev) => ({ ...prev, gamewin: true }));
	}

	function handleGameLose() {
		set_show_modal((prev) => ({ ...prev, gameover: true }));
	}

	function handleGameRestart() {
		set_reset((prev) => !prev);
	}

	return (
		<main className="game">
			<header
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
				}}
			>
				<h1>Minesweeper</h1>
				<p
					className="u-font-weight-semi-bold"
					style={{ color: "var(--color-orange-peel)" }}
				>
					Coins: {coins}
				</p>
			</header>
			<section className="game_wrapper">
				<Controls onRestart={handleGameRestart} />
				<Minesweeper
					level="easy"
					onWin={handleGameWin}
					onLose={handleGameLose}
					reset={reset}
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
