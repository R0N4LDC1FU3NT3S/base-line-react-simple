import { StrictMode } from "react"
import ReactDom from "react-dom"

import App from "./layouts/App/App"

ReactDom.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById("root")
)
