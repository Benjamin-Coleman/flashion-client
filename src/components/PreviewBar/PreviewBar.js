import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveCreateData } from '../../actions/templates'


class PreviewBar extends Component {

	handlePublishLookbook = () => {
		this.props.saveCreateData(this.props.data, this.props.currentUserId).then(() => this.props.history.push(`/lookbooks/${this.props.data.saveResponse.lookbookId}`))
		console.log(this.props)
		// this.props.history.push(`/lookbooks/${this.props.data.saveResponse.lookbookId}`)
	}

	render() {
		console.log(this.props)
		return (
			<div className="preview-bar">
				<div><button onClick={this.handlePublishLookbook}>PUBLISH LOOKBOOK</button></div>
			</div>
			)
	}
}

const mapStateToProps = state => ({
	data: state.templates,
	currentUserId: state.auth.data.user.id
})

const mapDispatchToProps = dispatch => ({
	saveCreateData: bindActionCreators(saveCreateData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewBar)