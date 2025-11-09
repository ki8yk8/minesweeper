import createMinesweeper from "../../helpers/minesweeper";

export default function Minesweeper({ level = "easy" }) {
	const mines_array = createMinesweeper(level);

	return (
		<section className="minesweeper">
			{mines_array.map((row, y) => (
				<div className="minesweeper__row" key={y}>
					{row.map((item, x) => (
						<button className="minesweeper__row__cell" key={x}>
							{item}
						</button>
					))}
				</div>
			))}
		</section>
	);
}
