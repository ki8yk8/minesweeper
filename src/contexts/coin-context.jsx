import { createContext, useState } from "react";

export const CoinContext = createContext({
	coins: 0,
});

export function CoinContextProvider({ children }) {
	const [coins, set_coins] = useState(10);

	return (
		<CoinContext.Provider value={{ coins, set_coins }}>
			{children}
		</CoinContext.Provider>
	);
}
