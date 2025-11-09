import { createContext, useState } from "react";

export const GameContext = createContext({
	level: "easy",
	reset: false,
	life: 1,
});

export function GameContextProvider({ children }) {
	const [game, set_game] = useState({
		level: "easy",
		reset: false,
		life: 1,
	});

	return (
		<GameContext.Provider value={{ game, set_game }}>
			{children}
		</GameContext.Provider>
	);
}
