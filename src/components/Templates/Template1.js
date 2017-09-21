import React, { Component } from 'react'
import './Template1.css'
import PreviewBar from '../PreviewBar/PreviewBar'
import { fetchLookbook } from '../../actions/templates'
import { Route } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Template1 extends Component {

	render() {
		console.log(this.props)

		const products = this.props.data.userInput.products.map((product, index) => (
				<div className={index % 2 === 0 ? "template-1-product-row even" : "template-1-product-row"} key={index} >
					<img src={product.imageURL} alt={product.name}/>
					<div className={index % 2 === 0 ? "template-1-product-info even" : "template-1-product-info"} >
						<h3>{product.name}</h3>
						<p>{product.description}</p>
						{product.URL !== '' ? <a href={product.URL} className="primary-button template-1"><span>View On Site</span></a> : null}
					</div>
				</div>
				))
		return (
			<div>
				<Route path='/lookbooks/preview' render={(props) => <PreviewBar {...props}/>}/>
				<div className="template-1-header">
					<h1>{this.props.data.userInput.brandName}</h1>
					<h6>{this.props.data.userInput.collectionName}</h6>
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
	fetchLookbook: bindActionCreators(fetchLookbook, dispatch)
})

export default connect(mapStateToProps)(Template1)