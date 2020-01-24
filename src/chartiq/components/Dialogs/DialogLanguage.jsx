import React from 'react'

/**
 * Language dialog component `<DialogLanguage/>`
 * 
 * Displays dialog to select active languge used in chart.
 * 
 * The actual language choices are obtained from CIQ.I18N.languages. Choosing a different language causes 
 * the entire UI to be translated through use of the CIQ.I18N.setLanguage method.
 *
 * @export
 * @class DialogLanguage
 * @extends {React.Component}
 */
export default class DialogLanguage extends React.Component {

	render() {
		return (
<cq-dialog>
	<cq-language-dialog>
		<h4 className="title">Choose language</h4>
		<cq-close></cq-close>
		<cq-languages>
			<template><div><cq-flag></cq-flag><cq-language-name></cq-language-name></div></template>
		</cq-languages>
	</cq-language-dialog>
</cq-dialog>
		)
	}
}
