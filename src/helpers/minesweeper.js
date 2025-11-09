const DIFFICULTY_MAP = {
	easy: {
		height: 9,
		width: 9,
		mines: 10,
	},
	medium: {
		height: 16,
		width: 16,
		mines: 40,
	},
	hard: {
		height: 30,
		width: 16,
		mines: 99,
	},
};

// minesweeper cell types = "empty", "mine", <1, 2, ...>
export function createMinesweeper(difficulty) {
	const { width, height, mines } = DIFFICULTY_MAP[difficulty];

	const mines_array = Array(height)
		.fill(null)
		.map((_) => Array(width).fill("empty"));

	return mines_array;
}
