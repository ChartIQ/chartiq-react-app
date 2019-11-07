import React from 'react'
import 'chartiq/js/components'

export default class DialogFibonacci extends React.Component {
    render () {
        return(
        <React.Fragment>
            <cq-dialog>
                <cq-fib-settings-dialog>
                <h4 className="title">Settings</h4>

                <cq-scroll cq-no-maximize>
                    <cq-fibonacci-settings>
                        <template cq-fibonacci-setting="true">
                            <cq-fibonacci-setting>
                                <div className="ciq-heading"></div>
                                <div className="stx-data">
                                    <input type="checkbox" />
                                </div>
                            </cq-fibonacci-setting>
                        </template>
                    </cq-fibonacci-settings>
                    <div cq-custom-fibonacci-setting="true">
                        <input className="ciq-heading" type="text" />%
                        <div className="ciq-btn stx-data" stxtap="add()">Add</div>
                    </div>
                </cq-scroll>

                <div className="ciq-dialog-cntrls">
                    <div className="ciq-btn" stxtap="close()">Done</div>
                </div>
                </cq-fib-settings-dialog>
            </cq-dialog>
        </React.Fragment>
        )
    }
 }