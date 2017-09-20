import React, { Component } from 'react'
import { connect } from 'react-redux'
import Template1 from '../Templates/Template1'

class Lookbook extends Component {

	renderTemplate() {
		switch(this.props.data.templateId){
		case "1":
			return <Template1 />
		case "2":
			return <div><h1>hello from temp 2</h1></div>
		default:
			return <div>Something went wrong</div>
		}
	}

	render() {
		console.log(this.props)
		return (
			<div className='lookbook-container'>
				{this.renderTemplate()}
			</div>
			)
	}
}

const mapStateToProps = state => ({
	data: state.templates.data
})

export default connect(mapStateToProps)(Lookbook)