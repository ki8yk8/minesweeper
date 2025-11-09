import { FaRegCircleQuestion } from "react-icons/fa6";
import { POWERUPS } from "../../helpers/powerups";
import Modal from "../modals/modal";
import { useState } from "react";

export default function PowerupBar() {
	const [modal, set_modal] = useState(null);

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
								style={{ fontSize: "0.8rem", width: "100%", textAlign: "left" }}
							>
								{item}
							</button>
						</div>
					))}
				</ul>
			</nav>
		</aside>
	);
}
