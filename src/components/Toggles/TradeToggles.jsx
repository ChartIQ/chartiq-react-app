import React from 'react'
import ToggleTradePanel from '../Plugins/TFC/ToggleTradePanel'
import ToggleTradingCentral from '../Plugins/TradingCentral/ToggleTradingCentral';


export default class TradeToggles extends React.Component {
    render() {
        return(
            <React.Fragment>
                {this.props.TFC && <ToggleTradePanel />}
                {this.props.TradingCentral && <ToggleTradingCentral />}
            </React.Fragment>
            
        )
    }
}