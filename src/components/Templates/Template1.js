import React, { Component } from 'react'
import './Template1.css'

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
						<a href={product.URL}><button className="primary-button"><span>View On Site</span></button></a>
					</div>
				</div>
				))
		return (
			<div>
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

export default connect(mapStateToProps)(Template1)