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
		width: 16,
		height: 30,
		mines: 99,
	},
};

export function sort_coordinate(coords) {
	return coords.sort(([x1, y1], [x2, y2]) => {
		if (x1 === x2) return y1 - y2;
		return x1 - x2;
	});
}

export function get_neighbourhood(x, y, width, height) {
	const neighbours = [
		[x - 1, y],
		[x - 1, y - 1],
		[x, y - 1],
		[x + 1, y - 1],
		[x + 1, y],
		[x + 1, y + 1],
		[x, y + 1],
		[x - 1, y + 1],
	];

	const filtered_neighbours = neighbours.filter((index) => {
		const [x, y] = index;
		if (x < 0 || y < 0 || x >= width || y >= height) {
			return false;
		}

		return true;
	});

	return sort_coordinate(filtered_neighbours);
}

export function get_cross(x, y, width, height) {
	const cross_items = [];

	for (let i = 0; i < width; i++) {
		cross_items.push([i, y]);
	}
	for (let i = 0; i < height; i++) {
		cross_items.push([x, i]);
	}

	return cross_items;
}

// minesweeper cell types = "empty", "mine", <1, 2, ...>
export default function createMinesweeper(
	difficulty,
	rnd_index = null,
	debug = false
) {
	const { width, height, mines } = DIFFICULTY_MAP[difficulty];

	const mines_array = Array(height)
		.fill(null)
		.map((_) => Array(width).fill("empty"));

	const random_indices = [];
	while (random_indices.length < mines) {
		const rnd = Math.floor(Math.random() * width * height);

		if (random_indices.includes(rnd) || rnd === rnd_index) continue;
		random_indices.push(rnd);
	}
	const random_indices_2d = random_indices.map((index) => [
		index % width,
		Math.floor(index / width),
	]);

	random_indices_2d.forEach((index) => {
		mines_array[index[1]][index[0]] = "mine";
	});

	// assgining the numbers
	random_indices_2d.forEach((index) => {
		if (mines_array[index[1]][index[0]] !== "mine") return;

		const neighbours = get_neighbourhood(...index, width, height);
		neighbours.forEach(([x, y]) => {
			switch (mines_array[y][x]) {
				case "empty":
					mines_array[y][x] = 1;
					break;

				case "mine":
					break;

				default:
					mines_array[y][x] += 1;
			}
		});
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

export function createMask(difficulty) {
	const { width, height } = DIFFICULTY_MAP[difficulty];

	const masks = Array(height)
		.fill(null)
		.map((_) => Array(width).fill(false));

	return masks;
}
