import React, { Component } from 'react'
import './NotFound.css'
import { TweenMax } from 'gsap'

class NotFound extends Component {

	componentDidMount() {
		TweenMax.fromTo(this.refs.about, .5, {opacity: 0, y: 20}, {opacity: 1, y: 0, ease: 'Power2'})
	}

	render() {
		return( 
			<div className="not-found">
				<div className="page-wrapper">
					<div ref="not-found" className="not-found-wrapper">
						<h1>404 - Uh oh</h1>
						<p>The page you're looking for does not exist. It's probably your fault and not the developer's.</p>
					</div>
				</div>
			</div>
			)
	}

}

export default NotFound