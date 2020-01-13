import React from 'react'

/**
 * Loader component `<LoadingWidget/>`.
 * 
 * Displays spinner graphic to indicate loading progress.
 *
 * @class LoadingWidget
 * @extends {React.Component}
 */
export default class LoadingWidget extends React.Component {

	render() {
		return (
			<cq-loader></cq-loader>
		)
	}
}
