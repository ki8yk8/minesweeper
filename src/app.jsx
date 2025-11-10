import { useContext, useRef, useState } from "react";
import "./app.css";
import Minesweeper from "./components/minesweeper/minesweeper";
import Modal from "./ui/modals/modal";
import Controls from "./components/controls/controls";
import { CoinContext } from "./contexts/coin-context";
import { DIFFICULTY_MAP } from "./helpers/minesweeper";
import { PiCoinBold } from "react-icons/pi";
import PowerupBar from "./ui/powerup-bar/powerup-bar";
import { GameContext } from "./contexts/game-context";
import useToast from "./hooks/use-toast";

export default function App() {
	const [show_modal, set_show_modal] = useState({
		gameover: false,
		gamewin: false,
	});
	const { coins, set_coins } = useContext(CoinContext);
	const { game, set_game } = useContext(GameContext);
	const toaster = useToast();
	const secret_clicked = useRef(0);

	function handleGameWin() {
		const bombs = DIFFICULTY_MAP[game.level].mines;
		set_show_modal((prev) => ({ ...prev, gamewin: true }));
		set_coins((prev) => prev + bombs);
	}

	function handleGameLose() {
		set_show_modal((prev) => ({ ...prev, gameover: true }));
	}

	function handlePowerupBuy(powerup) {
		if (powerup === "Extra Life") {
			set_game((prev) => ({ ...prev, life: prev.life + 1 }));
		} else {
			set_game((prev) => ({ ...prev, powerups: [...prev.powerups, powerup] }));
		}
	}

	function handleSecretClicked() {
		++secret_clicked.current;

		if (secret_clicked.current >= 3 && secret_clicked.current < 5) {
			toaster.push({
				message:
					`You are ${5-secret_clicked.current} clicks away from getting a gift.`,
				type: "info",
			});
		} else if (secret_clicked.current === 5) {
			set_coins((prev) => prev + 50);
			toaster.push({
				message:
					"You read the entire readme.md so, here is your 50 coins gift.",
				type: "gift",
			});
		}
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
				<button onClick={handleSecretClicked} className="u-plain">
					<h1 style={{ color: "var(--color-medium-slate-blue)" }}>Mines2.0</h1>
				</button>
				<p
					className="u-font-weight-semi-bold"
					style={{ color: "var(--color-orange-peel)" }}
				>
					<PiCoinBold size="1.5rem" style={{ marginBottom: -6 }} /> Coins:{" "}
					{coins}
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
					<Controls />

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
								level={game.level}
								onWin={handleGameWin}
								onLose={handleGameLose}
								reset={game.reset}
							/>
						</div>
						<PowerupBar onBuy={handlePowerupBuy} />
					</div>
				</section>
			</main>

			<Modal
				isOpen={show_modal.gameover}
				onClose={() => {
					set_show_modal((prev) => ({ ...prev, gameover: false }));
				}}
			>
				<>
					<h3
						className="u-text-center"
						style={{
							color: "var(--color-red-pantone)",
							marginBottom: "0.5rem",
						}}
					>
						OOPS!
					</h3>
					<p className="u-text-center">You stepped on a mine.</p>
				</>
			</Modal>
			<Modal
				isOpen={show_modal.gamewin}
				onClose={() => {
					set_show_modal((prev) => ({ ...prev, gamewin: false }));
				}}
			>
				<>
					<h3
						className="u-text-center"
						style={{
							color: "var(--color-dark-pastel-green)",
							marginBottom: "1rem",
						}}
					>
						Congratulations!
					</h3>
					<p className="u-text-center">
						You Won:{" "}
						<span
							style={{ color: "var(--color-orange-peel)" }}
							className="u-font-weight-semi-bold"
						>
							+{DIFFICULTY_MAP[game.level].mines} coins
						</span>
					</p>
				</>
			</Modal>
		</>
	);
}
