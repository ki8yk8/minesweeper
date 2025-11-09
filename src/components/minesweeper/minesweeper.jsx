import { FaBomb } from "react-icons/fa";
import createMinesweeper from "../../helpers/minesweeper";
import "./style.css";
import { useState } from "react";

export default function Minesweeper({ level = "easy" }) {
	const [mines_array, set_mines_array] = useState(createMinesweeper(level));

	const handle_btn_clicked = (x, y) => {
		set_mines_array((prev) => {
			const array = [...prev];
			prev[y][x] = "m";

			return array;
		});
	};

	return (
		<section className="minesweeper">
			{mines_array.map((row, y) => (
				<div className="minesweeper__row" key={y}>
					{row.map((item, x) => (
						<button
							className="minesweeper__row__cell"
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
