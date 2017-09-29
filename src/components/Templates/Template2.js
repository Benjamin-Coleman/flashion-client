import React, { Component } from 'react'
import './Template2.css'
import PreviewBar from '../PreviewBar/PreviewBar'
import { fetchLookbook } from '../../actions/templates'
import { Route } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Template2 extends Component {

	state = {
		currentIndex: 0,
		...this.props.data.lookbook
	}

	componentWillMount() {
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
		const currentIndex = (this.state.currentIndex < this.props.data.userInput.products.length - 1 ) ? this.state.currentIndex + 1 : 0;
		this.setState({ currentIndex: currentIndex })
	}

	handlePrevious = () => {
		const currentIndex = (this.state.currentIndex > 0 ) ? this.state.currentIndex - 1 : this.props.data.userInput.products.length - 1;	
		this.setState({ currentIndex: currentIndex })	
	}

	render() {
		console.log(this.state)

		const products = this.state.products.map((product, index) => (

				<div className={index === this.state.currentIndex ? "template-2-product-wrapper active" : "template-2-product-wrapper"} key={index}>
					
					<img src={product.imageURL} alt={product.name}/>
					<div className="template-2-product-info">
						<h3>{product.name}</h3>
						<p>{product.description}</p>
						{product.URL !== '' ? <a href={product.URL} className="primary-button template-2"><span>View On Site</span></a> : null}
					</div>
					
				</div>
				))
		return (
			<div style={{width: '100%', height: '100%'}}>
				<Route path='/lookbooks/preview' render={(props) => <PreviewBar {...props}/>}/>
				<div className="wrapper" style={{ background: '#fff', height: '100vh'}}>
					<div className="template-2-container">
						<div className="template-2-controls">
							<div className="template-2-previous" onClick={this.handlePrevious}>
								previous
							</div>
							<div className="template-2-next" onClick={this.handlePrevious}>
								next
							</div>
						</div>
						<div className="template-2-header">
							<h1>{this.state.brandName}</h1>
							<h6>{this.state.collectionName}</h6>
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
	fetchLookbook: bindActionCreators(fetchLookbook, dispatch)
})

export default connect(mapStateToProps)(Template2)