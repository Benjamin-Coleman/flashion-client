import React, { Component } from 'react'
import './Template2.css'
import PreviewBar from '../PreviewBar/PreviewBar'
import ControlPanel from '../ControlPanel/ControlPanel'
import EditBar from '../EditBar/EditBar'
import { fetchLookbook, updateProductInfoPosition, updateHeaderPosition } from '../../actions/templates'
import { Route } from 'react-router-dom'
import { TimelineMax, Power2 } from 'gsap'
import Draggable from 'react-draggable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Template2 extends Component {

	state = {
		currentIndex: 0,
		editable: false,
	}

	componentDidMount() {
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
		this.addListerners()
	}

	componentWillUnmount() {
		this.removeListerners()
	}

	addListerners = () => {
    	document.addEventListener('keyup', this.onKeyUp, false)
    	document.addEventListener('wheel', this.onWheel, false)
	}

	removeListerners = () => {
    	document.removeEventListener('keyup', this.onKeyUp, false)
    	document.removeEventListener('wheel', this.onWheel, false)
	}

	onKeyUp = (ev) => {
		if(ev.keyCode === 39 || ev.keyCode === 40 ) {
		  this.handleNext()
		} else if (ev.keyCode === 37 || ev.keyCode === 38) {
		  this.handlePrevious()
		}
	} 

	handleNext = () => {
		const currentIndex = (this.state.currentIndex < this.props.data.lookbook.products.length - 1 ) ? this.state.currentIndex + 1 : 0;
		this.setState({ currentIndex: currentIndex })
	}

	handlePrevious = () => {
		const currentIndex = (this.state.currentIndex > 0 ) ? this.state.currentIndex - 1 : this.props.data.lookbook.products.length - 1;	
		this.setState({ currentIndex: currentIndex })	
	}

	handleHeaderDrag = (e, data) => {
		console.log('WITHIN THE TEMPALTE DATA: ', data)
		this.props.updateHeaderPosition(e, data)
	}

	handleProductInfoDrag = (e, data) => {
		this.props.updateProductInfoPosition(e, data)
	}

	render() {
		console.log(this.props)

		const products = this.props.data.lookbook.products.map((product, index) => (

				<div className={index === this.state.currentIndex ? "template-2-product-wrapper active" : "template-2-product-wrapper"} key={index}>
					
					<img src={product.imageURL} alt={product.name} style={{ filter: `grayscale(${this.props.data.lookbook.styles.imageGrayscale / 100})`, transitionProperty: 'transform', transitionDuration: `${this.props.data.lookbook.styles.imageAppearDuration + 's' || '1.3s'}`}}/>
					<Draggable bounds='parent' disabled={!this.state.editable} onDrag={this.handleProductInfoDrag} position={{x: product.infoPositionX, y: product.infoPositionY}}>
						<div className="template-2-product-info" data-product-index={index} style={{ backgroundColor: this.props.data.lookbook.styles.color1, cursor: this.state.editable ? '-webkit-grab' : 'auto' }}>
							<h3 style={{ fontFamily: `${this.props.data.lookbook.styles.fontFamily || 'Playfair Display, serif'}`}}>{product.name}</h3>
							<p style={{ fontFamily: `${this.props.data.lookbook.styles.fontFamily || 'Playfair Display, serif'}`}}>{product.description}</p>
							{product.URL !== '' ? <a href={product.URL} className="primary-button template-2"><span>View On Site</span></a> : null}
						</div>
					</Draggable>
				</div>
				))
		return (
			<div style={{width: '100%', height: '100%'}}>
				<Route path='/lookbooks/preview' render={(props) => <PreviewBar {...props}/>}/>
				<Route path='/lookbooks/:id/edit' render={(props) => <EditBar {...props} templateState={this.state}/>}/>
				<div className="draggable-notification" ref="draggableNotification"><h6>Drag To Elements to Reposition</h6></div>
				{this.state.editable ? <ControlPanel /> : null }
				<div className="wrapper" style={{ background: '#fff', height: '100vh'}}>
					<div className="template-2-container">
						<div className="template-2-controls">
							<div style={{ fontFamily: `${this.props.data.lookbook.styles.fontFamily || 'Playfair Display, serif'}`}} className="template-2-previous" onClick={this.handlePrevious}>
								previous
							</div>
							<div style={{ fontFamily: `${this.props.data.lookbook.styles.fontFamily || 'Playfair Display, serif'}`}} className="template-2-next" onClick={this.handlePrevious}>
								next
							</div>
						</div>
						<div className="template-2-header">
							<Draggable bounds="parent" disabled={!this.state.editable} onDrag={this.handleHeaderDrag} position={{x: this.props.data.lookbook.styles.headerPositionX || 0, y: this.props.data.lookbook.styles.headerPositionY || 0}}>
								<h1 style={{ fontFamily: `${this.props.data.lookbook.styles.fontFamily || 'Playfair Display, serif'}`, backgroundColor: this.props.data.lookbook.styles.color1, cursor: this.state.editable ? '-webkit-grab' : 'auto' }}>{this.props.data.lookbook.brandName}</h1>
							</Draggable>
								<h6 style={{ fontFamily: `${this.props.data.lookbook.styles.fontFamily || 'Playfair Display, serif'}`}}>{this.props.data.lookbook.collectionName}</h6>
						</div>
					<div className="template-2-products-wrapper">
						{ products }
					</div>
					</div>
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
	updateHeaderPosition: bindActionCreators(updateHeaderPosition, dispatch),
	updateProductInfoPosition: bindActionCreators(updateProductInfoPosition, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Template2)