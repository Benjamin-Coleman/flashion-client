import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveCreateData } from '../../actions/templates'
import { withRouter } from 'react-router-dom'
import './PreviewBar.css'

class PreviewBar extends Component {
	
	// loggedIn = () => {
	// 	return !!localStorage.getItem("jwt")
	// }

	// componentWillMount = () => {
	// 	if (this.loggedIn()) {
	// 		this.props.getUserData(localStorage.getItem('jwt'))
	// 	}
	// }

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

	handlePublishLookbook = () => {
		this.props.saveCreateData(this.props.data, this.props.auth.user.id, this.props.history)
		console.log(this.props)
		// this.props.history.push(`/lookbooks/${this.props.data.saveResponse.lookbookId}`)
	}

	render() {
		console.log(this.props)
		return (
			<div className="preview-bar">
				<div className="preview-message"><h6>Previewing Your Lookbook</h6></div>
				<div className="primary-button" onClick={this.handlePublishLookbook}>PUBLISH LOOKBOOK</div>

			</div>
			)
	}
}

const mapStateToProps = state => ({
	data: state.templates,
	auth: state.auth
})

const mapDispatchToProps = dispatch => ({
	saveCreateData: bindActionCreators(saveCreateData, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PreviewBar))