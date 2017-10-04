import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteLookbook } from '../../actions/templates'
import './LookbookPreview.css'

class LookbookPreview extends Component {

	handleDelete = (lookbookId) => {
		this.props.deleteLookbook(lookbookId, this.props.auth.user.id)
	}

	render() {
		return (
			<div className="lookbook-preview">
				<div className="delete-button" onClick={() => this.handleDelete(this.props.lookbookId)} ><h3>X</h3></div>
				<h3>{this.props.brandName}</h3>
				<h6>{this.props.collectionName}</h6>
				<img width="200px" src={this.props.firstImage} alt={this.props.brandName} />
				<Link to={`/lookbooks/${this.props.lookbookId}`} className='primary-button'>Visit Lookbook</Link>
				<Link to={`/lookbooks/${this.props.lookbookId}/edit`} className='primary-button'>Edit Lookbook</Link>
			</div>
			)
	}
}

const mapDispatchToProps = dispatch => ({
	deleteLookbook: bindActionCreators(deleteLookbook, dispatch)
})

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(LookbookPreview)