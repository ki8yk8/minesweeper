import { VscDebugRestart } from "react-icons/vsc";
import { DIFFICULTY_MAP } from "../../helpers/minesweeper";
import { useContext } from "react";
import { GameContext } from "../../contexts/game-context";

export default function Controls() {
	const { game, set_game } = useContext(GameContext);

	function handleIncrement(step = 1) {
		set_game((prev) => {
			const level = Object.keys(DIFFICULTY_MAP).indexOf(prev.level);

			const new_level = Math.max(
				0,
				Math.min(level + step, Object.keys(DIFFICULTY_MAP).length - 1)
			);

			return { ...prev, level: Object.keys(DIFFICULTY_MAP)[new_level] };
		});
	}

	return (
		<nav style={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "0.1rem",
				}}
			>
				<small
					className="u-font-weight-semi-bold"
					style={{ color: "var(--color-red-pantone)" }}
				>
					Level
				</small>
				<div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
					<button onClick={handleIncrement.bind(null, -1)}>-</button>
					<div>
						{Array(Object.keys(DIFFICULTY_MAP).indexOf(game.level)+1)
							.fill(null)
							.map((_, index) => (
								<span key={index} className="u-font-emoji">
									🔥
								</span>
							))}
					</div>
					<button onClick={handleIncrement.bind(null, 1)}>+</button>
				</div>
			</div>

			<button
				onClick={() =>
					set_game((prev) => ({ ...prev, reset: !prev.reset }))
				}
			>
				<VscDebugRestart />
			</button>
		</nav>
	);
}
