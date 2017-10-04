import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { TweenMax } from 'gsap'


class Home extends Component {

	componentDidMount() {
		TweenMax.fromTo(this.refs.hero, .5, {opacity: 0, y: 20}, {opacity: 1, y: 0, ease: 'Power2'})
	}

	render() {
		return (
			<div>
				<div className="page-wrapper">
					<div ref="hero" className="hero">
						<div className='hero-image'>
							<img src='/assets/img/home-hero.jpg' alt='hero'/>
						</div>
						<div className='hero-content'>
						<h1>Create your collection</h1>
						<p>
						Giving small fashion brands the power to show off their new collections. Pick your template, upload your images and descriptions and then customize your template to fit your style and your brand's aethetic. Create a page to send out to your customers and promotional sites to get the word out about your work.
						</p>
						<Link to='/templates'><div className='primary-button'><span>View Templates</span></div></Link>
						</div>
					</div>
				</div>
			</div>
			)
	}
}

export default Home