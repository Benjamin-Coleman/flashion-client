import React, { Component } from 'react'
// import ReactTransitionGroup from 'react-transition-group'
import { Link } from 'react-router-dom'
import './TemplatePreview.css'

class TemplatePreview extends Component {

	render() {
		return (
			<div className="template-preview">
				<h3>{this.props.templateTitle}</h3>
				<img src={this.props.templateImage} alt={this.props.templateTitle} />
				<p>
					{this.props.templateDescription}
				</p>
				<Link to={this.props.templateLink} className='primary-button'>Start Building</Link>
			</div>
			)
	}
}

export default TemplatePreview