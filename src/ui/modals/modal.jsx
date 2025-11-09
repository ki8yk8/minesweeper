import { createPortal } from "react-dom";
import { IoMdCloseCircle } from "react-icons/io";

export default function Modal({ isOpen, onClose, children }) {
	if (!isOpen) return;

	return createPortal(
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				backdropFilter: "blur(1px)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					backgroundColor: "var(--color-baby-powder)",
					width: 500,
					border: "2px solid var(--color-rich-black)",
					padding: "0.5rem 1rem",
				}}
			>
				<header style={{ display: "flex", justifyContent: "flex-end" }}>
					<button className="u-plain" onClick={onClose}>
						<IoMdCloseCircle size="1.5rem" />
					</button>
				</header>

				<div style={{ marginTop: "0.1rem" }}>{children}</div>
			</div>
		</div>,
		document.getElementById("modal-root")
	);
}
