import { FaBomb } from "react-icons/fa";
import createMinesweeper, {
	createMask,
	get_neighbourhood,
} from "../../helpers/minesweeper";
import "./style.css";
import React, { useState } from "react";

// mines type mine, empty, 1...8,
export default function Minesweeper({ level = "easy", onOver }) {
	const [mines_array, set_mines_array] = useState(createMinesweeper(level));
	const [mask, set_mask] = useState(createMask(level));
	const [active, set_active] = useState(true);
	const [reveal, set_reveal] = useState(false);

	function unravelCell(mask, x, y) {
		if (mask[y][x] === false && mines_array[y][x] !== "mine") {
			mask[y][x] = true;

			get_neighbourhood(x, y, mask[0].length, mask.length).forEach(([a, b]) => {
				mines_array[y][x] === "empty" && unravelCell(mask, a, b);
			});
		}
	}

	const handle_btn_clicked = (x, y) => {
		if (!active) return;

		set_mask((prev) => {
			if (prev[y][x]) return prev;

			const updated_mask = structuredClone(prev);

			if (mines_array[y][x] === "empty") {
				unravelCell(updated_mask, x, y);
			} else if (mines_array[y][x] === "mine") {
				updated_mask[y][x] = true;
				onOver?.();
				set_active(false);
				set_reveal(true);
			} else {
				updated_mask[y][x] = true;
			}

			return updated_mask;
		});
	};

	return (
		<section
			className="minesweeper"
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
							{item === "mine" && reveal && (
								<FaBomb
									size="1.5rem"
									color={reveal ? "var(--color-rich-black)" : null}
								/>
							)}
						</button>
					))}
				</React.Fragment>
			))}
		</section>
	);
}
