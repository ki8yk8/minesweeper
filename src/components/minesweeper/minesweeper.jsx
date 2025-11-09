import createMinesweeper from "../../helpers/minesweeper";
import "./style.css";

export default function Minesweeper({ level = "easy" }) {
	const mines_array = createMinesweeper(level);

	return (
		<section className="minesweeper">
			{mines_array.map((row, y) => (
				<div className="minesweeper__row" key={y}>
					{row.map((item, x) => (
						<button className="minesweeper__row__cell" key={x}>
							{item !== "empty" && item !== "mine" && <span>{item}</span>}
							{item === "mine" && <span>M</span>}
						</button>
					))}
				</div>
			))}
		</section>
	);
}
