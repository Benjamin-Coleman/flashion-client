import React, { Component } from 'react'
import TemplatePreview from './TemplatePreview'
import './TemplatesIndex.css'
import { TweenMax } from 'gsap'
// import TransitionGroup from 'react-transition-group/TransitionGroup';
// import CSSTransition from 'react-transition-group/CSSTransition';


class TemplatesIndex extends Component {

	componentDidMount() {
		 const els = document.querySelectorAll('.template-preview')
		 TweenMax.staggerFromTo(els, 1, {opacity: 0, y: -20}, {opacity: 1, y:0}, .2)
	}

	render() {
		const templateData = [
			{
				templateTitle: 'Template 1',
				templateImage: 'http://placehold.it/250x200',
				templateDescription: 'This template is a static template with clean text and images. Best suited for small images.',
				templateLink: '/templates/1/new',
			},
			{
				templateTitle: 'Template 2',
				templateImage: 'http://placehold.it/250x200',
				templateDescription: 'This template is a slideshow type thing for large images.',
				templateLink: '/templates/2/new',
			},
		]

		const renderTemplatePreviews = templateData.map((x, index) => <TemplatePreview key={index} templateTitle={x.templateTitle} templateImage={x.templateImage} templateDescription={x.templateDescription} templateLink={x.templateLink}/> )

		return (
			<div className='page-wrapper templates'>
				<h2>Templates</h2>
				<div className='template-grid'>			
					{ renderTemplatePreviews }
				</div>
			</div>
			)
	}
}

export default TemplatesIndex