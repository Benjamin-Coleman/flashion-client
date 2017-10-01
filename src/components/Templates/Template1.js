import React, { Component } from 'react'
import './Template1.css'
import PreviewBar from '../PreviewBar/PreviewBar'
import EditBar from '../EditBar/EditBar'
import ControlPanel from '../ControlPanel/ControlPanel'
import { fetchLookbook } from '../../actions/templates'
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
		...this.props.data,
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
		this.setState({
			lookbook: {
				...this.state.lookbook,
				styles: {
					...this.state.lookbook.styles,
					color1: color,
				}
			}
		})
	}

	onOpacitySlide = (e) => {
		console.log(e)
		this.setState({
			lookbook: {
				...this.state.lookbook,
				styles: {
					...this.state.lookbook.styles,
					opacity: e
				}
			}
		})
	}

	addEditListeners = () => {
		console.log('setting up event listeners')
		const productInfoBoxes = document.querySelectorAll('.template-1-product-info')
		productInfoBoxes.forEach( box => {
			box.addEventListener('click', () => {this.setState({editDialogues: {...this.state.editDialogues, productInfoColor: true}})})
			box.addEventListener('click', () => {this.setState({editDialogues: {...this.state.editDialogues, productInfoOpacity: true}})})
		})
	}

	componentWillReceiveProps(newProps){
		// Needs to be fixed
		// This checks that the stored template hasn't changed without updating state

		if(newProps.data.lookbook !== this.props.data.lookbook){
			this.setState({lookbook: newProps.data.lookbook })
		}
	}

	componentDidMount() {
		if (this.props.match.params.id){
			const { lookbook } = this.props
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

		this.tl
		.add(TweenMax.staggerFromTo(productCovers, 1.5, {scaleX: 1}, {scaleX: 0, ease: Expo}, .7))
		.add(TweenMax.staggerFromTo(infoBoxes, 1, {opacity: 0, x: 20}, {opacity: finalOpacity, x: 0, ease: Expo}, .3), .3, "-=0.3")

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

					<div className="product-info-dialogues">
						{this.state.editDialogues.productInfoColor ? <ColorPicker value={this.state.customizations.color1} onDrag={this.onDrag} /> : null}
						{this.state.editDialogues.productInfoOpacity ? <div style={{width: '500px', height: '100px', position: 'absolute'}}><Slider onChange={this.onOpacitySlide} defaultValue={100} /></div> : null}
					</div>

					<div className={index % 2 === 0 ? "template-1-product-info even" : "template-1-product-info"} style={{backgroundColor: this.state.lookbook.styles.color1, opacity: this.state.lookbook.styles.opacity || this.state.lookbook.styles.opacity === 0 ? this.state.lookbook.styles.opacity / 100 : 1}}>
						<h3>{product.name}</h3>
						<p>{product.description}</p>
						{product.URL !== '' ? <a href={product.URL} className="primary-button template-1"><span>View On Site</span></a> : null}
					</div>
				</div>
				))
		return (
			<div style={{ background: 'white'}}>
				<ControlPanel handleProductOpacityChange={this.onOpacitySlide} handleProductColorChange={this.onDrag} templateState={this.state}/>
					<Route path='/lookbooks/preview' render={(props) => <PreviewBar {...props} />}/>
					<Route path='/lookbooks/:id/edit' render={(props) => <EditBar {...props} templateState={this.state}/>}/>
				<div className="template-1-wrapper">
					<div className="template-1-header">
						<h1 ref="brandName">{this.state.lookbook.brandName}</h1>
						<h6>{this.state.lookbook.collectionName}</h6>
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
	// fetchCustomizations: bindActionCreators(fetchCustomizations, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Template1)