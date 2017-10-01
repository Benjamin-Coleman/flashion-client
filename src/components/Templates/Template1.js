import React, { Component } from 'react'
import './Template1.css'
import PreviewBar from '../PreviewBar/PreviewBar'
import EditBar from '../EditBar/EditBar'
import ControlPanel from '../ControlPanel/ControlPanel'
import { fetchLookbook, updateProductOpacity, updateProductColor } from '../../actions/templates'
import { Route } from 'react-router-dom'
// import * as ScrollMagic from 'scrollmagic'
import { TimelineMax, TweenMax, Expo } from 'gsap'
import ColorPicker from 'react-color-picker'
import Slider from 'rc-slider'
import 'react-color-picker/index.css'
import 'rc-slider/assets/index.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Template1 extends Component {

	state = {
		// ...this.props.data,
		editDialogues: {
			productInfoColor: false,
			productInfoOpacity: false,
		},
		customizations: {
		},
		styles: {
			opacity: 1,
		},
		editable: false,
	}

	onDrag = (color, c) => {
		this.props.updateProductColor(color)
	}

	onOpacitySlide = (e) => {
		this.props.updateProductOpacity(e)
	}

	addEditListeners = () => {
		// console.log('setting up event listeners')
		// const productInfoBoxes = document.querySelectorAll('.template-1-product-info')
		// productInfoBoxes.forEach( box => {
		// 	box.addEventListener('click', () => {this.setState({editDialogues: {...this.state.editDialogues, productInfoColor: true}})})
		// 	box.addEventListener('click', () => {this.setState({editDialogues: {...this.state.editDialogues, productInfoOpacity: true}})})
		// })
	}

	componentDidMount() {
		if (this.props.match.params.id){
			// const { lookbook } = this.props
			this.props.fetchLookbook(this.props.match.params.id)
		}
		if (this.props.match.url.includes('edit')){
		this.setState({ editable: true}, this.addEditListeners())
		}

		//setup
		this.tl = new TimelineMax()

		if (this.state.editable){
			this.addEditListeners()
		}

		const productCovers = document.querySelectorAll('.image-cover')
		const infoBoxes = document.querySelectorAll('.template-1-product-info')

		const finalOpacity = this.props.data.lookbook.styles.opacity / 100 || 1

		const imageAppearDuration = this.props.data.lookbook.styles.imageAppearDuration || 1.5

		const infoAppearDuration = this.props.data.lookbook.styles.infoAppearDuration || 1

		this.tl
		.add(TweenMax.staggerFromTo(productCovers, imageAppearDuration, {scaleX: 1}, {scaleX: 0, ease: Expo}, .7))
		.add(TweenMax.staggerFromTo(infoBoxes, infoAppearDuration, {opacity: 0, x: 20}, {opacity: finalOpacity, x: 0, ease: Expo}, .3), .3, "-=0.3")

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
		console.log('Template 1 Props: ', this.props)
		console.log('Template 1 State: ', this.state)

		const products = this.props.data.lookbook.products.map((product, index) => (
				<div className={index % 2 === 0 ? "template-1-product-row even" : "template-1-product-row"} key={index} >
					<div className="product-img-wrap"><div className="image-cover"></div><img style={{ filter: `grayscale(${this.props.data.lookbook.styles.imageGrayscale / 100})` }} className={`product-image product-${index+1}`} src={product.imageURL} alt={product.name}/></div>

					<div className={index % 2 === 0 ? "template-1-product-info even" : "template-1-product-info"} style={{backgroundColor: this.props.data.lookbook.styles.color1, opacity: this.props.data.lookbook.styles.opacity || this.props.data.lookbook.styles.opacity === 0 ? this.props.data.lookbook.styles.opacity / 100 : 1}}>
						<h3>{product.name}</h3>
						<p>{product.description}</p>
						{product.URL !== '' ? <a href={product.URL} className="primary-button template-1"><span>View On Site</span></a> : null}
					</div>
				</div>
				))
		return (
			<div style={{ background: 'white'}}>
				{this.state.editable ? <ControlPanel /> : null }
					<Route path='/lookbooks/preview' render={(props) => <PreviewBar {...props} />}/>
					<Route path='/lookbooks/:id/edit' render={(props) => <EditBar {...props} templateState={this.state}/>}/>
				<div className="template-1-wrapper">
					<div className="template-1-header">
						<h1 ref="brandName">{this.props.data.lookbook.brandName}</h1>
						<h6>{this.props.data.lookbook.collectionName}</h6>
					</div>
					{ products }
				</div>
			</div>
			)
	}
}

const mapStateToProps = state => ({
	data: state.templates.data
})

const mapDispatchToProps = dispatch => ({
	fetchLookbook: bindActionCreators(fetchLookbook, dispatch),
	updateProductOpacity: bindActionCreators(updateProductOpacity, dispatch),
	updateProductColor: bindActionCreators(updateProductColor, dispatch)
	// fetchCustomizations: bindActionCreators(fetchCustomizations, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Template1)