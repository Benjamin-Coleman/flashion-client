import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchLookbook } from '../../actions/templates' 
import './Lookbook.js'
import Template1 from '../Templates/Template1'
import Template2 from '../Templates/Template2'

class Lookbook extends Component {

	componentWillMount = () => {
		if (this.props.match.params.id){
			this.props.fetchLookbook(this.props.match.params.id)
			console.log(this.props)
		}
	}

	componentDidUpdate = () => {
		console.log('receiving props')
		this.renderTemplate()
	}

	renderTemplate() {
			console.log(this.props.data)
		switch(this.props.data.templateId){
		case 1:
			return <Template1 />
		case 2:
			return <Template2 />
		default:
			return <div>Something went wrong</div>
		}
	}

	render() {
		console.log('rendering lookbooks')
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

const mapDispatchToProps = dispatch => ({
	fetchLookbook: bindActionCreators(fetchLookbook, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Lookbook)