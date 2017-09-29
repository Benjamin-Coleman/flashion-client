import React, { Component } from 'react'
import './Template1.css'
import PreviewBar from '../PreviewBar/PreviewBar'
import { fetchLookbook } from '../../actions/templates'
import { fetchCustomizations } from '../../actions/templates'
import { Route } from 'react-router-dom'
// import * as ScrollMagic from 'scrollmagic'
import { TweenLite, TimelineMax, TweenMax, Expo } from 'gsap'
import ColorPicker from 'react-color-picker'
import 'react-color-picker/index.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Template1 extends Component {

	state = {
		...this.props.data,
		editDialogues: {
			productInfoColor: false,
		},
		customizations: {
			
		},
		editable: false,
	}

	onDrag = (color, c) => {
		this.setState({
			customizations: {
				...this.state.customizations,
				color1: color,
			}
		})
	}

	addEditListeners = () => {
		console.log('setting up event listeners')
		const productInfoBoxes = document.querySelectorAll('.template-1-product-info')
		console.log(productInfoBoxes)
		productInfoBoxes.forEach( box => {
			box.addEventListener('click', () => {this.setState({editDialogues: {...this.state.editDialogues, productInfoColor: true}})})
		})
	}

	componentDidMount() {
		if (this.props.match.url.includes('edit')){
		this.setState({ editable: true})
		}

		//setup
		this.tl = new TimelineMax()
		this.addEditListeners()

		const productCovers = document.querySelectorAll('.image-cover')
		const infoBoxes = document.querySelectorAll('.template-1-product-info')

		this.tl
		.add(TweenMax.staggerFromTo(productCovers, 1.5, {scaleX: 1}, {scaleX: 0, ease: Expo}, .7))
		.add(TweenMax.staggerFromTo(infoBoxes, 1, {opacity: 0, x: 20}, {opacity: 1, x: 0, ease: Expo}, .3), .3, "-=0.3")

		//this.tl.play()
	}

	// 	constructor(props){

 //        super(props);

 //        this.edge = 0;
 //        this.active = false;

	// 	this.easedScroll = 0;
	// 	this.scroll = 0;
	// 	this.scrollY = 0;
	// 	this.animatedElmts = [];

	// 	this.documentHeight = -1;

 //    }

	// componentDidMount() {
	// 	window.addEventListener('scroll', this.scrollUpdate)
	// 	// this.bindEvents()
	// 	this.setTimeLines()

	// 	// bindEvents() {
	// 	// 	this.update = (e) => 
	// 	// }
	// }

	// componentWillUnmount() {
	// 	window.removeEventListener('scroll', this.handleScroll)
	// }

 //    scrollUpdate = () => {
	// 	const scrollY = window.scrollY;
	// 	const before = scrollY < this.top;
	// 	const after = scrollY > this.bottom;
 //    	console.log(window.scrollY, scrollY)

	// 	if(scrollY <= this.height && scrollY >= 100) {
	// 		if (scrollY !== this.scrollY) {
	// 			console.log('onscroll');

	// 			this.scroll = scrollY / this.height;

	// 			this.scrollTween = new TweenLite(this, 1, {
	// 				easedScroll: this.scroll,
	// 				ease: 'Power2',
	// 				onUpdate: () => this.updateScroll()
	// 			});

	// 			this.scrollY = scrollY;
	// 		}

	// 	}
	// }

	// setTimeLines() {
	// 	console.log('setting up timelines')

	// 	this.mainTL && delete this.mainTL;

	// 	this.mainTL = new TimelineLite()
	// 	this.mainTL.stop();

	// 	const timeline = new TimelineLite()

	// 	const products = document.querySelectorAll('.product-image')

	// 	timeline
	// 	.from(products, 5, {
	// 		y: -200,
	// 		ease: 'Power2'
	// 	})

	// 	this.mainTL.add(timeline, 0)
	// }


	// updateScroll() {

	// 	this.mainTL.progress(this.easedScroll);

	// }


	render() {
		console.log(this.props)
		console.log(this.state)

		const products = this.state.lookbook.products.map((product, index) => (
				<div className={index % 2 === 0 ? "template-1-product-row even" : "template-1-product-row"} key={index} >
					<div className="product-img-wrap"><div className="image-cover"></div><img className={`product-image product-${index+1}`} src={product.imageURL} alt={product.name}/></div>
					{this.state.editDialogues.productInfoColor ? <ColorPicker value={this.state.customizations.color1} onDrag={this.onDrag} /> : null}
					<div className={index % 2 === 0 ? "template-1-product-info even" : "template-1-product-info"} style={{backgroundColor: this.state.customizations.color1 }}>
						<h3>{product.name}</h3>
						<p>{product.description}</p>
						{product.URL !== '' ? <a href={product.URL} className="primary-button template-1"><span>View On Site</span></a> : null}
					</div>
				</div>
				))
		return (
			<div style={{ background: 'white'}}>
				<Route path='/lookbooks/preview' render={(props) => <PreviewBar {...props}/>}/>
				<div className="template-1-header">
					<h1 ref="brandName">{this.state.lookbook.brandName}</h1>
					<h6>{this.state.lookbook.collectionName}</h6>
				</div>
				{ products }
			</div>
			)
	}
}

const mapStateToProps = state => ({
	data: state.templates.data
})

const mapDispatchToProps = dispatch => ({
	fetchLookbook: bindActionCreators(fetchLookbook, dispatch),
	fetchCustomizations: bindActionCreators(fetchCustomizations, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Template1)