import React from 'react'

import OrderBook from '../Plugins/CryptoIQ/OrderBook'
import ToggleOrderBook from '../Plugins/CryptoIQ/ToggleOrderBook'

export default class Plugins extends React.Component {
	render() {
		const cryptoiq = this.props.cryptoiq
		return(
			<React.Fragment>
				{ cryptoiq && cryptoiq.OrderBook && cryptoiq.OrderBook.addToChart &&
					<>
					<OrderBook {...cryptoiq.OrderBook} />
					<ToggleOrderBook {...cryptoiq.OrderBook} />
					</>
				}
			</React.Fragment>
		)
	}
}