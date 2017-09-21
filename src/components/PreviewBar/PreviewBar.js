import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveCreateData } from '../../actions/templates'


class PreviewBar extends Component {

	handlePublishLookbook = () => {
		this.props.saveCreateData(this.props.data)
		console.log(this.props)
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
	data: state.templates
})

const mapDispatchToProps = dispatch => ({
	saveCreateData: bindActionCreators(saveCreateData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewBar)