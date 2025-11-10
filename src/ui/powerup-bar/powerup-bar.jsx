import { FaRegCircleQuestion } from "react-icons/fa6";
import { POWERUPS } from "../../helpers/powerups";
import Modal from "../modals/modal";
import { useContext, useState } from "react";
import { CoinContext } from "../../contexts/coin-context";
import useToast from "../../hooks/use-toast";

export default function PowerupBar({ onBuy }) {
	const toaster = useToast();

	const [modal, set_modal] = useState(null);
	const { coins, set_coins } = useContext(CoinContext);

	function handleBuyPowerup(powerup) {
		if (coins >= POWERUPS[powerup].coin) {
			onBuy?.(powerup);
			set_coins((prev) => prev - POWERUPS[powerup].coin);
			toaster.push({ message: `'${powerup}' activated`, type: "gift" });
		} else {
			toaster.push({ message: "You donot have enough coins", type: "error" });
		}
	}

	return (
		<aside
			style={{
				border: "2px solid var(--color-rich-black)",
				padding: "1rem",
			}}
		>
			{modal && (
				<Modal isOpen={modal} onClose={() => set_modal(null)}>
					<>
						<h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{modal}</h4>
						<p>{POWERUPS[modal].description}</p>
						<small
							style={{
								textAlign: "right",
								display: "block",
								fontWeight: 600,
								color: "var(--color-orange-peel)",
								marginTop: "1rem",
							}}
						>
							Costs: -{POWERUPS[modal].coin} Coins
						</small>
					</>
				</Modal>
			)}
			<h6 style={{ fontWeight: 500, marginBottom: "1rem" }}>Powerups</h6>
			<nav>
				<ul
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "0.25rem",
					}}
				>
					{Object.keys(POWERUPS).map((item) => (
						<div style={{ display: "flex" }} key={item}>
							<button
								style={{ backgroundColor: "var(--color-light-sea-green)" }}
								onClick={set_modal.bind(null, item)}
							>
								<FaRegCircleQuestion />
							</button>
							<button
								style={{ width: "100%", textAlign: "left" }}
								onClick={handleBuyPowerup.bind(null, item)}
							>
								<p style={{ fontSize: "0.8rem" }}>{item}</p>
								<small style={{ display: "block", fontSize: "0.6rem" }}>
									-{POWERUPS[item].coin} coins
								</small>
							</button>
						</div>
					))}
				</ul>
			</nav>
		</aside>
	);
}
