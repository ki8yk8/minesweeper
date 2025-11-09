import { FaBomb } from "react-icons/fa";
import createMinesweeper, { createMask } from "../../helpers/minesweeper";
import "./style.css";
import { useState } from "react";

// mines type mine, empty, 1...8,
export default function Minesweeper({ level = "easy" }) {
	const [mines_array, set_mines_array] = useState(createMinesweeper(level));
	const [mask, set_mask] = useState(createMask(level));

	function unravelCell(x, y) {}

	const handle_btn_clicked = (x, y) => {
		console.log(x, y);
		set_mask((prev) => {
			if (prev[y][x]) return prev;

			const updated_mask = structuredClone(prev);

			if (mines_array[y][x] === "empty") {
				unravelCell(x, y);
			} else if (mines_array[y][x] === "mine") {
				updated_mask[y][x] = true;
			} else {
				updated_mask[y][x] = true;
			}

			return updated_mask;
		});
	};

	return (
		<section className="minesweeper">
			{mines_array.map((row, y) => (
				<div className="minesweeper__row" key={y}>
					{row.map((item, x) => (
						<button
							className="minesweeper__row__cell"
							style={{ backgroundColor: mask[y][x] ? "red" : "initial" }}
							key={x}
							onClick={handle_btn_clicked.bind(null, x, y)}
						>
							{item !== "empty" && item !== "mine" && <span>{item}</span>}
							{item === "mine" && <FaBomb size="1.5rem" />}
						</button>
					))}
				</div>
			))}
		</section>
	);
}
