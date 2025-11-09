import { createContext, useState } from "react";

export const GameContext = createContext({
	level: "easy",
	reset: false,
	life: 0,
	powerups: [],
});

export function GameContextProvider({ children }) {
	const [game, set_game] = useState({
		level: "easy",
		reset: false,
		life: 0,
		powerups: [],
	});

	return (
		<GameContext.Provider value={{ game, set_game }}>
			{children}
		</GameContext.Provider>
	);
}
