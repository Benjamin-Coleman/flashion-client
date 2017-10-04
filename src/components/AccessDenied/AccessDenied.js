import React, { Component } from 'react'
import './AccessDenied.css'
import { TweenMax } from 'gsap'

class AccessDenied extends Component {

	componentDidMount() {
		TweenMax.fromTo(this.refs.about, .5, {opacity: 0, y: 20}, {opacity: 1, y: 0, ease: 'Power2'})
	}

	render() {
		return( 
			<div className="not-found">
				<div className="page-wrapper">
					<div ref="not-found" className="not-found-wrapper">
						<h1>Access Denied</h1>
						<p>You don't have permission to view this page.</p>
					</div>
				</div>
			</div>
			)
	}
}

export default AccessDenied