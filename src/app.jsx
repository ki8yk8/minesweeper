import './app.css'
import createMinesweeper from './helpers/minesweeper'

export default function App() {
	const mines_array = createMinesweeper("easy");
	console.log(mines_array);
	
	return <h1>Minesweeper</h1>
}
