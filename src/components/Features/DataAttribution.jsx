import React from 'react'
import { Attribution } from 'components'

export default class DataAttribution extends React.Component {
	render() {
		return (
			<>
<cq-attribution>
	<template>
		<cq-attrib-container>
			<cq-attrib-source></cq-attrib-source>
			<cq-attrib-quote-type></cq-attrib-quote-type>
		</cq-attrib-container>
	</template>
</cq-attribution>
			</>
		)
	}
}