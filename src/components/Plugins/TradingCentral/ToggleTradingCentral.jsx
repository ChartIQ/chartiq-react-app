import React from 'react'
import { ChartContext } from '../../../react-chart-context';

export default class ToggleTradingCentral extends React.Component {
    constructor() {
        super()
        this.toggleTC = React.createRef()
    }

    componentDidMount() {
        this.setToggleCallback(this.toggleTC.current)
    }

    setToggleCallback(node) {
        let context = this.context
        let stx = context.stx
        let self = this
		context.UIContext.ToggleTradeingCentral = this.toggleTC.current
		node.registerCallback(function(value) {
            if (value) {
                self.context.components.TradingCentral.tcComponents.current.removeAttribute('disabled');
            } else {
                self.context.components.TradingCentral.tcComponents.current.setAttribute('disabled', 'disabled');
            }
            self.context.resize()
        })
    }
    render() {
        return (
            <cq-toggle class="tc-ui stx-tradingcentral" ref={this.toggleTC}>
                <span></span><cq-tooltip>Analysis</cq-tooltip>
            </cq-toggle>
        )
    }
}
ToggleTradingCentral.contextType = ChartContext