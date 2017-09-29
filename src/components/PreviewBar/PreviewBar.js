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

	handlePublishLookbook = () => {
		this.props.saveCreateData(this.props.data, this.props.auth.user.id, this.props.history)
		console.log(this.props)
		// this.props.history.push(`/lookbooks/${this.props.data.saveResponse.lookbookId}`)
	}

	render() {
		console.log(this.props)
		return (
			<div className="preview-bar">
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