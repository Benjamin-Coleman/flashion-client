import React, { Component } from 'react'
import { TweenMax } from 'gsap'
import './About.css'

class About extends Component {

	// componentDidMount() {
	// 	TweenMax.fromTo(this.refs.about, .5, {opacity: 0, y: 20}, {opacity: 1, y: 0, ease: 'Power2'})
	// }

	render() {
		return( 
			<div className="about">
				<div className="page-wrapper">
					<div ref="about" className="about-wrapper">
						<h1>About</h1>
						<p>Flashion is intended to make it easy for smaller brands to show off their new looks for each season and to get the word out to their customers. A growing collection of templates allows you to pick your look to fit your branding and to stand out among the competition.</p>
					</div>
				</div>
			</div>
			)
	}
}

export default About