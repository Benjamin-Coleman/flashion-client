import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveCreateData } from '../../actions/templates'
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
		this.props.saveCreateData(this.props.data, this.props.user.data.user.id).then(() => this.props.history.push(`/lookbooks/${this.props.data.saveResponse.lookbookId}`))
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
	user: state.auth
})

const mapDispatchToProps = dispatch => ({
	saveCreateData: bindActionCreators(saveCreateData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewBar)