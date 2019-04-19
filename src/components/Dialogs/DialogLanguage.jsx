import React from 'react'
import { Close, LanguageDialog } from 'components'

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
