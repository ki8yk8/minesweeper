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
		<>
			<header
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
				}}
			>
				<h1 style={{ color: "var(--color-medium-slate-blue)" }}>Mines2.0</h1>
				<p
					className="u-font-weight-semi-bold"
					style={{ color: "var(--color-orange-peel)" }}
				>
					Coins: {coins}
				</p>
			</header>

			<main>
				<section
					className="game"
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						overflow: "hidden",
						height: "100%",
						gap: "1rem",
					}}
				>
					<Controls onRestart={handleGameRestart} />

					<div
						style={{
							flexGrow: 1,
							overflow: "hidden",
							display: "flex",
							width: "100%",
							justifyContent: "space-around",
						}}
					>
						<div style={{ overflow: "auto" }}>
							<Minesweeper
								level="easy"
								onWin={handleGameWin}
								onLose={handleGameLose}
								reset={reset}
							/>
						</div>
						<aside>
							<p>Powerups</p>
						</aside>
					</div>
				</section>
			</main>

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
		</>
	);
}
