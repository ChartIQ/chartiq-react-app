import React from 'react'
import { Clickable } from 'components'

/**
 * Share chart button component `<ShareChart/>`
 * 
 * Button to activate the share dialog in {@link DialogShare}
 *
 * @export
 * @class ShareChart
 * @extends {React.Component}
 */
export default class ShareChart extends React.Component {
	render() {
		return (
			<>
			<cq-share-button>
				<cq-clickable cq-selector="cq-share-dialog" cq-method="open">Share</cq-clickable>
			</cq-share-button>
			</>
		)
	}
}
