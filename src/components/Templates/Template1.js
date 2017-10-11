import React, { Component } from 'react'
import './Template1.css'
import PreviewBar from '../PreviewBar/PreviewBar'
import EditBar from '../EditBar/EditBar'
import ControlPanel from '../ControlPanel/ControlPanel'
import { fetchLookbook, updateProductOpacity, updateProductColor, updateProductImagePosition, updateProductInfoPosition } from '../../actions/templates'
import { Route } from 'react-router-dom'
import { TimelineMax, TweenMax, Expo, Power2 } from 'gsap'
import Draggable from 'react-draggable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Template1 extends Component {

	state = {
		styles: {
			opacity: 1,
		},
		editable: false,
		loaded: false
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
			// this.props.fetchLookbook(this.props.match.params.id).then(this.setState({ loaded: true}, () => TweenMax.to(this.refs.curtain, 1.3, {autoAlpha: 0, ease: Power2.easeOut})))
		}
		// preview step removed for now
		// if (this.props.match.url.includes('preview')){
		// 	TweenMax.to(this.refs.curtain, 1.3, {autoAlpha: 0, ease: Power2.easeOut})
		// }
		if (this.props.match.url.includes('edit')){
			// check if the correct user
		this.setState({ editable: true}, 
			function() {
				const draggableNotificationTL = new TimelineMax()
				draggableNotificationTL
					.to(this.refs.draggableNotification, 1, {opacity: 1, y: 0, ease: Power2.easeOut}, 0)
					.to(this.refs.draggableNotification, 1, {opacity: 0, y: -30, ease: Power2.easeOut}, 5)
				}
			)
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
		.add(TweenMax.staggerFromTo(infoBoxes, infoAppearDuration, {opacity: 0}, {opacity: finalOpacity, ease: Expo}, .3), .3, "-=0.3")

		//this.tl.play()
	}

	handleProductImageDrag = (e, data) => {
		this.props.updateProductImagePosition(e, data)
	}

	handleProductInfoDrag = (e, data) => {
		this.props.updateProductInfoPosition(e, data)
	}

	render() {
		console.log('Template 1 Props: ', this.props)

		const productInfoStyles = {
			backgroundColor: this.props.data.lookbook.styles.color1, 
			opacity: this.props.data.lookbook.styles.opacity || this.props.data.lookbook.styles.opacity === 0 ? this.props.data.lookbook.styles.opacity / 100 : 1, 
			cursor: this.state.editable ? '-webkit-grab' : 'auto'
		}

		const productImageStyles = { 
			filter: `grayscale(${this.props.data.lookbook.styles.imageGrayscale / 100})`, 
			cursor: this.state.editable ? '-webkit-grab' : 'auto' 
		}

		const products = this.props.data.lookbook.products.map((product, index) => (
				<div className={index % 2 === 0 ? "template-1-product-row even" : "template-1-product-row"} key={index} >
					<Draggable bounds='parent' disabled={!this.state.editable} onDrag={this.handleProductImageDrag} position={{x: product.imagePositionX, y: 0}} axis='x' >
						<div className="product-img-wrap">
							<div className="image-cover"></div>
							<img data-product-index={index} draggable="false" style={productImageStyles} className={`product-image product-${index+1}`} src={product.imageURL} alt={product.name}/>
						</div>
					</Draggable>
					<Draggable bounds='parent' disabled={!this.state.editable} onDrag={this.handleProductInfoDrag} position={{x: product.infoPositionX, y: product.infoPositionY}}>
					<div data-product-index={index} className={index % 2 === 0 ? "template-1-product-info even" : "template-1-product-info"} style={productInfoStyles}>
						<h3>{product.name}</h3>
						<p>{product.description}</p>
						{product.URL !== '' ? <a href={product.URL} className="primary-button template-1"><span>View On Site</span></a> : null}
					</div>
					</Draggable>
				</div>
				))
		return (
			<div style={{ background: 'white'}}>
				<div className="draggable-notification" ref="draggableNotification"><h6>Drag To Elements to Reposition</h6></div>
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
	updateProductColor: bindActionCreators(updateProductColor, dispatch),
	updateProductImagePosition: bindActionCreators(updateProductImagePosition, dispatch),
	updateProductInfoPosition: bindActionCreators(updateProductInfoPosition, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Template1)