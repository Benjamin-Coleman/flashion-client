import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchLookbook } from '../../actions/templates' 
import './Lookbook.css'
import Template1 from '../Templates/Template1'
import Template2 from '../Templates/Template2'

class Lookbook extends Component {

	componentDidMount = () => {
		// scroll window to top to compensate for long forms
		window.scrollTo(0, 0);
		if (this.props.match.params.id){
			this.props.fetchLookbook(this.props.match.params.id)
		}
	}

	componentDidUpdate = () => {
		this.renderTemplate()
	}

	renderTemplate() {
		switch(this.props.data.lookbook.template){
		case 1:
			return <Template1 match={this.props.match}/>
		case 2:
			return <Template2 match={this.props.match}/>
		default:
			return <div>Something went wrong</div>
		}
	}

	render() {
		console.log('rendering lookbooks', 'THIS.PROPS.DATA', this.props.data)
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