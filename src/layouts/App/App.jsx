import "./App.css"
import "./App.scss"
import logo from "./React.svg"

const App = () => {
	return (
		<div className="App">
			<h1>Hola Mundo En React</h1>
			<img src={logo} alt="react log" />
			{process.env.PORT}
		</div>
	)
}

export default App
