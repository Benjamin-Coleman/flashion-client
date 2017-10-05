import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteLookbook } from '../../actions/auth'
import { TweenMax, Power2 } from 'gsap'
import './LookbookPreview.css'

class LookbookPreview extends Component {



	handleDelete = (lookbookId) => {
		this.props.deleteLookbook(lookbookId, this.props.auth.user.id)
	}

	openDeletePrompt = () => {
		TweenMax.to(this.refs.deletePrompt, 1, {y: 0, autoAlpha: 1, ease: Power2.easeOut })
	}

	closeDeletePrompt = () => {
		TweenMax.to(this.refs.deletePrompt, 1, {y: 200, autoAlpha: 0, ease: Power2.easeOut })
	}

	render() {
		return (
			<div className="lookbook-preview">
				<div ref="deletePrompt" className="delete-prompt">
					<p>Are you sure you want to permanently delete this lookbook?</p>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
						<div className='delete-prompt-button' onClick={() => this.handleDelete(this.props.lookbookId)}>Yes, delete it</div>
						<div className='delete-prompt-button' onClick={this.closeDeletePrompt}>No, keep it</div>
					</div>
				</div>
				<div className="delete-button" onClick={this.openDeletePrompt} ><h3>X</h3></div>
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