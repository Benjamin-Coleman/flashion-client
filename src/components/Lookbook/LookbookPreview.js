import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LookbookPreview.css'

class LookbookPreview extends Component {

	render() {
		return (
			<div className="lookbook-preview">
				<h3>{this.props.brandName}</h3>
				<h6>{this.props.collectionName}</h6>
				<img src={this.props.templateThumbnail} alt={this.props.brandName} />
				<Link to={`/lookbooks/${this.props.lookbookId}`} className='primary-button'>Visit Lookbook</Link>
				<Link to={`/lookbooks/${this.props.lookbookId}/edit`} className='primary-button'>Edit Lookbook</Link>
			</div>
			)
	}
}

export default LookbookPreview