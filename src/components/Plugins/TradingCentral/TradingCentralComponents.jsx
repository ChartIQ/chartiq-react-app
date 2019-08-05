import React from 'react'
import { ChartContext } from '../../../react-chart-context';

export default class TradingCentralComponents extends React.Component {
    constructor() {
        super()
        this.tcComponents = React.createRef()
    }

    componentDidMount() {
        console.log('mounting TradingCentralComponents...')
        // this.context.setContext({components: {TradingCentral: this}})
        this.context.components.TradingCentral = this
    }
    
    render()  {
        return(
            <cq-tradingcentral class="tc-ui" 
                token="leWp5sKSbV7sENXba2EUXQ==" 
                partner="647"
                ref={this.tcComponents}
                disabled>
            </cq-tradingcentral>
        )
    }   
}
TradingCentralComponents.contextType = ChartContext