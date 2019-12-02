import React from 'react'

export default class ScriptEditor extends React.Component {
    constructor() {
        super()
        this.editorRef = React.createRef()
    }

    modalBegin() {
        if(!this.editorRef.current) return
        this.editorRef.current.modalBegin()
    }

    modalEnd() {
        if(!this.editorRef.current) return
        this.editorRef.current.modalEnd()
    }

    render() {
        return(
            <cq-scriptiq-editor ref={this.editorRef}>
                {/* <div className="stx-ico-handle" onMouseOver={this.modalBegin} onMouseOut={this.modalEnd}><span className=""></span></div>
                <div className="scriptiq-toolbar">
                    <div stxtap="addScript()" className="ciq-btn">Apply</div>
                    <div stxtap="clear()" className="ciq-btn">Clear</div>
                    <div className="ie-message">Your version of IE isn't supported by ScriptIQ. Please use Edge or another browser.</div>
                        <div className="stx-btn stx-ico" stxtap="close()"><span className="stx-ico-close">&nbsp;</span></div>
                </div>
                <div className="scriptiq-textarea"><textarea placeholder="Click to add script"></textarea></div>
                <div className="scriptiq-status"><input readOnly placeholder="Script status"></input></div> */}
            </cq-scriptiq-editor>
        )
    }
}