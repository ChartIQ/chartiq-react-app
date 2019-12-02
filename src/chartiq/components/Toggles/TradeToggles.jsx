import React from 'react'
import ToggleTradePanel from '../Plugins/TFC/ToggleTradePanel'


export default class TradeToggles extends React.Component {
    render() {
        return(
            <React.Fragment>
                {this.props.tfc && <ToggleTradePanel />}
            </React.Fragment>
            
        )
    }
}