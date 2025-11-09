import { FaBomb } from "react-icons/fa";
import createMinesweeper, {
	createMask,
	get_cross,
	get_neighbourhood,
} from "../../helpers/minesweeper";
import "./style.css";
import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../contexts/game-context";

export default function Minesweeper({ level = "easy", reset, onWin, onLose }) {
	const { game, set_game } = useContext(GameContext);
	const [mines_array, set_mines_array] = useState(createMinesweeper(level));
	const [mask, set_mask] = useState(createMask(level));
	const [active, set_active] = useState(true);
	const [reveal, set_reveal] = useState(false);
	const [powerup, set_powerup] = useState(null);

	useEffect(() => {
		set_mines_array(createMinesweeper(level));
		set_mask(createMask(level));
		set_active(true);
		set_reveal(false);
	}, [reset, level]);

	useEffect(() => {
		if (isGameWon(mask, mines_array)) {
			onWin?.();
		}
	}, [mask]);

	useEffect(() => {
		if (game.powerups.length === 0) return;

		const powerups = [...game.powerups];
		const selected = powerups.pop();

		if (selected === "Mine Detector") {
			set_mask((prev) => {
				const copied = structuredClone(prev);

				// get the index of empty regions whose mask is false
				const all_indexes = Array(copied.length)
					.fill(null)
					.map((_, i) => {
						return Array(copied[0].length)
							.fill(null)
							.map((_, j) => [i, j]);
					})
					.flat();

				const untouched_non_mines = all_indexes.filter(([x, y]) => {
					if (copied[y][x]) return false;
					if (mines_array[y][x] === "mine") return false;

					return true;
				});

				if (untouched_non_mines.length > 0) {
					const rnd_index = Math.floor(
						Math.random() * untouched_non_mines.length
					);
					const [x, y] = untouched_non_mines[rnd_index];

					copied[y][x] = true;
				}

				return copied;
			});
		} else {
			set_powerup(selected);
			set_game((prev) => ({ ...prev, powerups }));
		}
	}, [game.powerups]);

	function unravelCell(mask, x, y) {
		if (mask[y][x] === false && mines_array[y][x] !== "mine") {
			mask[y][x] = true;

			get_neighbourhood(x, y, mask[0].length, mask.length).forEach(([a, b]) => {
				mines_array[y][x] === "empty" && unravelCell(mask, a, b);
			});
		}
	}

	function isGameWon(mask, mines_array) {
		const flat_mask = mask.flat();

		const untouched_non_mines = mines_array.flat().filter((item, index) => {
			if (flat_mask[index]) return false;

			if (item === "mine") return false;

			return true;
		});

		return untouched_non_mines.length === 0;
	}

	const handle_btn_clicked = (x, y) => {
		if (!active) return;

		if (powerup) {
			switch (powerup) {
				case "Radar Pulse":
					set_mask((prev) => {
						const copied = structuredClone(prev);
						copied[y][x] = true;

						get_neighbourhood(x, y).forEach(([i, j]) => {
							copied[j][i] = true;
						});

						return copied;
					});
					break;

				case "Reveal Cross":
					set_mask((prev) => {
						const copied = structuredClone(prev);
						get_cross(x, y, mask[0].length, mask.length).forEach(([i, j]) => {
							copied[j][i] = true;
						});

						return copied;
					});
					break;

				default:
					break;
			}
			set_powerup(null);
		}

		if (mines_array[y][x] === "mine") {
			if (game.life === 0) {
				onLose?.();
				set_active(false);
				set_reveal(true);
			} else {
				set_game((prev) => ({ ...prev, life: prev.life - 1 }));
			}
		}

		set_mask((prev) => {
			if (prev[y][x]) return prev;

			const updated_mask = structuredClone(prev);

			if (mines_array[y][x] === "empty") {
				unravelCell(updated_mask, x, y);
			} else if (mines_array[y][x] === "mine") {
				updated_mask[y][x] = true;
			} else {
				updated_mask[y][x] = true;
			}

			return updated_mask;
		});
	};

	return (
		<section
			className={`minesweeper ${powerup ? "minesweeper--powered" : ""}`}
			style={{
				gridTemplateColumns: `repeat(${mines_array[0].length}, 50px)`,
				gridTemplateRows: `repeat(${mines_array.length}, 50px)`,
			}}
		>
			{mines_array.map((row, y) => (
				<React.Fragment key={y}>
					{row.map((item, x) => (
						<button
							className="minesweeper__cell"
							style={{
								backgroundColor: mask[y][x]
									? "var(--color-dark-pastel-green)"
									: null,
							}}
							key={x}
							onClick={handle_btn_clicked.bind(null, x, y)}
						>
							{item !== "empty" && item !== "mine" && mask[y][x] && (
								<span>{item}</span>
							)}
							{item === "mine" && (reveal || mask[y][x]) && (
								<FaBomb size="1.5rem" color="var(--color-rich-black)" />
							)}
						</button>
					))}
				</React.Fragment>
			))}
		</section>
	);
}
