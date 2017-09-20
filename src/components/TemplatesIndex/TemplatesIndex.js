import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class TemplatesIndex extends Component {

	render() {
		return (
			<div className='render-wrapper'>
				<h2>Templates</h2>
				<div className='template-grid'>
					<Link to='templates/1/new'>
						<div className='template-item'>
						<h4>Template 1</h4>
							<img src='http://placehold.it/250x200' />
						</div>
					</Link>
					<Link to='templates/2/new'>
						<div className='template-item'>
						<h4>Template 2</h4>
							<img src='http://placehold.it/250x200' />

						</div>
					</Link>
				</div>
			</div>
			)
	}
}

export default TemplatesIndex