import Toast from "./toast";

export default function ToastContainer({ toasts, onClose }) {
	return (
		<section
			style={{
				position: "fixed",
				maxHeight: "100vh",
				bottom: 0,
				left: 0,
				width: "500px",
				display: "flex",
				flexDirection: "column",
				gap: "0.25rem",
				overflow: "hidden",
				padding: "1rem 2rem",
			}}
		>
			{toasts.map(({ id, message, type, duration }) => (
				<Toast
					key={id}
					message={message}
					type={type}
					duration={duration}
					id={id}
					onClose={onClose}
				/>
			))}
		</section>
	);
}
