export const DIFFICULTY_MAP = {
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

export function get_neighbourhood(x, y, width, height) {
	return [];
}

// minesweeper cell types = "empty", "mine", <1, 2, ...>
export default function createMinesweeper(difficulty, debug = false) {
	const { width, height, mines } = DIFFICULTY_MAP[difficulty];

	const mines_array = Array(height)
		.fill(null)
		.map((_) => Array(width).fill("empty"));

	const random_indices = [];
	while (random_indices.length < mines) {
		const rnd = Math.floor(Math.random() * width * height);

		if (random_indices.includes(rnd)) continue;
		random_indices.push(rnd);
	}
	const random_indices_2d = random_indices.map((index) => [
		Math.floor(index / width),
		index % width,
	]);

	random_indices_2d.forEach((index) => {
		mines_array[index[0]][index[1]] = "mine";
	});

	if (debug) {
		return {
			random_indices,
			random_indices_2d,
			width,
			height,
			mines,
			mines_array,
		};
	}

	return mines_array;
}
