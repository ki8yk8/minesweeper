import Toast from "./toast";

export default function ToastContainer({ toasts, onClose }) {
	return (
		<section
			style={{
				position: "fixed",
				height: "100vh",
				top: 0,
				left: 0,
				width: "500px",
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
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
