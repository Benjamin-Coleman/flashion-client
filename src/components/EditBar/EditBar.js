import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveEditedLookbook } from '../../actions/templates'
import { withRouter } from 'react-router-dom'
import './EditBar.css'

class EditBar extends Component {

	handleSave = () => {
		this.props.saveEditedLookbook(this.props.templateState, this.props.history)
	}

	render() {
		console.log('EDIT BAR', this.props)
		return (
			<div className="preview-bar">
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