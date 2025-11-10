import { useState } from "react";
import { FaQuestion } from "react-icons/fa6";

export default function HelpButton() {
	const [show_help, set_show_help] = useState(true);

	return (
		<div
			style={{
				position: "absolute",
				bottom: "2rem",
				left: "2rem",
			}}
		>
			{show_help && (
				<div
					style={{
						maxWidth: 400,
						padding: "0.5rem 1rem",
						border: "2px solid var(--color-rich-black)",
						marginBottom: "0.5rem",
						backgroundColor: "var(--color-baby-powder)",
					}}
				>
					<h5 style={{ marginBottom: "1rem" }}>How to Play?</h5>
					<p style={{ fontSize: "0.8rem" }}>
						The game is same as minesweeper, rules are the same. Your goal is to
						not hit the mines while revealing all the cells.{" "}
					</p>
					<p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
						As you complete the game, you get certain number of coins equal to
						the number of bombs in the level. With those coins, you will be able
						to unlock different powerups.
					</p>
					<p
						style={{
							fontSize: "0.8rem",
							marginTop: "0.5rem",
							color: "var(--color-dark-pastel-green)",
							fontWeight: 500,
						}}
					>
						Read the full readme.md to get a gift.
					</p>
				</div>
			)}
			<button
				style={{
					height: "3rem",
					width: "3rem",
					padding: "0.5rem",
					margin: 0,
					borderRadius: "1.5rem",
				}}
				onClick={() => set_show_help((prev) => !prev)}
			>
				<FaQuestion size="1.5rem" />
			</button>
		</div>
	);
}
