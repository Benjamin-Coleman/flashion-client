import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TweenMax, Power2 } from 'gsap'
import { fetchLookbook } from '../../actions/templates' 
import './Lookbook.css'
import Template1 from '../Templates/Template1'
import Template2 from '../Templates/Template2'

class Lookbook extends Component {

	componentDidMount = () => {
		// scroll window to top to compensate for long forms
		window.scrollTo(0, 0);
		if (this.props.match.params.id){
			this.props.fetchLookbook(this.props.match.params.id).then(() => TweenMax.to(this.refs.curtain, 1.3, {autoAlpha: 0, ease: Power2.easeOut}))
		}
	}

	// componentDidUpdate = () => {
	// 	this.renderTemplate()
	// }

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
		console.log('current load state', this.props.loading)
		return (
			<div>
				<div className="curtain" ref="curtain"/>
				{ !this.props.loading ?
				<div className='lookbook-container'>
					{this.renderTemplate()}
				</div>
				: null }
			</div>
			)
	}
}

const mapStateToProps = state => ({
	data: state.templates.data,
	loading: state.templates.loading
})

const mapDispatchToProps = dispatch => ({
	fetchLookbook: bindActionCreators(fetchLookbook, dispatch)
})

Lookbook.defaultProps = {
	data: {
		lookbook: {
			template: 0
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Lookbook)