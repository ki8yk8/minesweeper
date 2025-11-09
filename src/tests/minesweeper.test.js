import { describe, expect, test } from "vitest";
import createMinesweeper, {
	DIFFICULTY_MAP,
	get_neighbourhood,
	sort_coordinate,
} from "../helpers/minesweeper";

describe("Minesweeper Tests", () => {
	test("Height and width should change based on difficulty", () => {
		const difficulties = Object.keys(DIFFICULTY_MAP);

		difficulties.forEach((difficulty) => {
			const { mines_array } = createMinesweeper(difficulty, true);

			expect(mines_array.length).toBe(DIFFICULTY_MAP[difficulty].height);
			expect(mines_array[0].length).toBe(DIFFICULTY_MAP[difficulty].width);
		});
	});

	test("Number of mines should be given by map", () => {
		const { mines, random_indices } = createMinesweeper("hard", true);

		expect(random_indices.length).toBe(mines);
	});

	test("Indices of mines should not be repeated", () => {
		const { random_indices_2d } = createMinesweeper("hard", true);

		let is_unique = true;
		random_indices_2d.forEach((item, index) => {
			for (let i = 0; i < random_indices_2d.length; i++) {
				const a_item = random_indices_2d[i];

				if (index !== i && item[0] === a_item[0] && item[1] === a_item[1]) {
					is_unique = false;
					break;
				}

				if (!is_unique) break;
			}
		});

		expect(is_unique).toBe(true);
	});

	test("Get neighbourhood should work in all cases", () => {
		const [width, height] = [10, 10];
		const case1 = {
			input: [5, 5],
			output: sort_coordinate([
				[5, 4],
				[4, 4],
				[4, 5],
				[4, 6],
				[5, 6],
				[6, 6],
				[6, 5],
				[6, 4],
			]),
		};

		expect(get_neighbourhood(...case1.input, width, height)).toEqual(case1.output);

		const case2 = {
			input: [0, 0],
			output: sort_coordinate([
				[1, 0],
				[1, 1],
				[0, 1],
			]),
		};

		expect(get_neighbourhood(...case2.input, width, height)).toEqual(case2.output);
	});

	test.todo("Around mines there should be number");
});
