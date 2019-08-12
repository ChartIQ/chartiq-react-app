import React from 'react'
import ReactDom from 'react-dom'
import App from './containers/App'

ReactDom.render(
	React.createElement(App),
	document.querySelector("#app")
)