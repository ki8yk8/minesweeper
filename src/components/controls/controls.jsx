import { useState } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { DIFFICULTY_MAP } from "../../helpers/minesweeper";

export default function Controls({ onRestart, onLevelChange }) {
	const [level, set_level] = useState(1);

	function handleIncrement(step = 1) {
		set_level((prev) => {
			const new_level = Math.max(
				1,
				Math.min(prev + step, Object.keys(DIFFICULTY_MAP).length)
			);

			onLevelChange?.(Object.keys(DIFFICULTY_MAP)[new_level - 1]);
			return new_level;
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
						{Array(level)
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

			<button onClick={onRestart}>
				<VscDebugRestart />
			</button>
		</nav>
	);
}
