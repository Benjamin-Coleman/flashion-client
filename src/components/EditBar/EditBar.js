import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveEditedLookbook } from '../../actions/templates'
import { withRouter } from 'react-router-dom'
import { TimelineLite, Power2 } from 'gsap'
import './EditBar.css'

class EditBar extends Component {

	handleSave = () => {
		this.props.saveEditedLookbook(this.props.data, this.props.history)
		this.tl = new TimelineLite()

		this.tl.fromTo(this.refs.success, 1, {opacity: 0, y: -30}, {opacity: 1, y: 0, ease: Power2.easeOut})
		this.tl.to(this.refs.success, 1, {opacity: 0, y: -30, ease: Power2.easeOut}, 5)
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
	}

	handleScroll = () => {
		// const previewBar = document.querySelector('.preview-bar')
		const appEl = document.querySelector('.App')

		if (window.pageYOffset >= 50){
			appEl.classList.add('fixed-bar')
		}
		if (window.pageYOffset < 50){
			appEl.classList.remove('fixed-bar')
		}
	}

	render() {
		return (
			<div className="preview-bar">
				<div className="preview-message"><h6>Editing Your Lookbook</h6></div>
				<div className="success-notification" ref="success" style={{ opacity: 0}}>Successfully Saved</div>
				<div className="primary-button" onClick={this.handleSave}>SAVE CHANGES</div>
			</div>
			)
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	data: state.templates.data
})

const mapDispatchToProps = dispatch => ({
	saveEditedLookbook: bindActionCreators(saveEditedLookbook, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditBar))