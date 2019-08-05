import React from 'react'
import { ChartContext } from '../../../react-chart-context'

export default class ScriptIQ extends React.Component {
    constructor() {
        super()
        this.scriptiqRef = React.createRef()
    }
    
    componentDidMount() {
        this.context.components.ScriptIQ = this
        if(!this.scriptiqRef.current) return
        let loaded = this.scriptiqRef.current.getAttribute('loaded')
        console.log('ScriptIQ mounted. ScriptIQ loaded? ',loaded)
        this.context.UIContext.ScriptIQ = this.scriptiqRef.current

    }
    
    componentDidUpdate() {
        if(!this.scriptiqRef.current) return
        let loaded = this.scriptiqRef.current.getAttribute('loaded')
        console.log('ScriptIQ updated. ScriptIQ loaded? ',loaded)
        console.log(this.scriptiqRef.current.firstElementChild)
    }

    resize() {
        this.showEditor()
    }

    showEditor() {
        console.log("In ScriptIQ.jsx, time to change styles")
        let editor = this.scriptiqRef.current.editor
        editor.style.visibility = 'visible'
        this.scriptiqRef.current.style.visibility = 'visible'
    }

    render() {
        return(
            <cq-scriptiq class="scriptiq-ui" ref={this.scriptiqRef}></cq-scriptiq>
        )
    }
}
ScriptIQ.contextType = ChartContext