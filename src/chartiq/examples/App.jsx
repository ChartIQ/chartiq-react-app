import React from 'react'
import './App.css'

export default class App extends React.Component {

render() {

        const containers = [
            {
                name: 'AdvancedChart', 
                link: 'advanced-chart',
                description: 'A chart with all the bells and whistles enabled via props'
            },
            // {
            //     name: 'CryptoIQWorkstation', 
            //     link: 'cryptoIQWorkStation',
            //     description: 'Crypto workstation with MarketDepth, TradeHistory, and Orderbook. Includes Trade From Chart functionality'
            // },
            {   name: 'MarketDepth',
                link: 'marketdepth',
                description: 'Stand alone component for rendering a MarketDepth type chart'
            },
            {   name: 'OrderBook',
                link: 'orderbook',
                description: 'Stand alone component for showing current orders'
            }
        ]
        delete localStorage.myChartLayout
        return (
             <React.Fragment>
                <h1>Select Component</h1>
                    
                <div className="component-selection">
                    <ul>
                        { containers.map((container, idx) => 
                        <div key={idx}>
                            <a href={`${container.link}.html`}>
                                <h3><li>{container.name}</li></h3>
                            </a>
                            <span>{container.description}</span>
                        </div>
                        )}
                    </ul>
                </div>

                
            </React.Fragment>
        )
    }
}