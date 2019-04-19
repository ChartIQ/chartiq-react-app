import React from 'react'
import { Clickable } from 'components'

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
