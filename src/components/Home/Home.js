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
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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