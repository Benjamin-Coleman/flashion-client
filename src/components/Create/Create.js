import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { collectCreateData } from '../../actions/templates'

class Create extends Component {

	state = {
		templateId: parseInt(this.props.match.params.id),
		userInput: {
			brandName: '',
			collectionName: '',
			products: [
				{
					imageURL: '',
					URL: '',
					description: '',
					name: ''
				}
			]
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		console.log(this.props)
		const sanitizedBrandName = this.state.userInput.brandName.split(' ').join('-').toLowerCase()
		const sanitizedCollectionName = this.state.userInput.collectionName.split(' ').join('-').toLowerCase()
		this.props.history.push(`/lookbooks/preview/${sanitizedBrandName}/${sanitizedCollectionName}`)
		this.props.collectCreateData({...this.state})
	}

	handleProductNameChange = (idx) => (e) => {
		const newProducts = this.state.userInput.products.map((product, sidx) => {
			if (idx !== sidx) {
				return product
			}
			return { ...product, name: e.target.value }
		})
		this.setState({ 
			...this.state, userInput: {
				...this.state.userInput, products: newProducts
				} 
			})
	}

	handleProductURLChange = (idx) => (e) => {
		const newProducts = this.state.userInput.products.map((product, sidx) => {
			if (idx !== sidx) {
				return product
			}
			return { ...product, URL: e.target.value }
		})
		this.setState({ 
			...this.state, userInput: {
				...this.state.userInput, products: newProducts
				} 
			})
	}

	handleProductDescriptionChange = (idx) => (e) => {
		const newProducts = this.state.userInput.products.map((product, sidx) => {
			if (idx !== sidx) {
				return product
			}
			return { ...product, description: e.target.value }
		})
		this.setState({ 
			...this.state, userInput: {
				...this.state.userInput, products: newProducts
				} 
			})
	}

	handleProductImageURLChange = (idx) => (e) => {
		const newProducts = this.state.userInput.products.map((product, sidx) => {
			if (idx !== sidx) {
				return product
			}
			return { ...product, imageURL: e.target.value }
		})
		this.setState({ 
			...this.state, userInput: {
				...this.state.userInput, products: newProducts
				} 
			})
	}

	handleAddProduct = () => {
		this.setState({
			...this.state, userInput: {
				...this.state.userInput,
			products: this.state.userInput.products.concat([{ imageURL: '',
					description: '',
					name: ''}])
			}
		})
	}

	handleRemoveProduct = (idx) => {
		this.setState({
			...this.state, userInput: {
				...this.state.userInput,
			products: this.state.products.filter((s, sidx) => idx !== sidx)
		}
		})
	}

	changeBrandName = (e) => {
		const { userInput } = this.state
		const newUserInput = {
			...userInput,
			brandName: e.target.value
		}
		this.setState({ userInput: newUserInput })
	}

	changeCollectionName = (e) => {
		const { userInput } = this.state
		const newUserInput = {
			...userInput,
			collectionName: e.target.value
		}
		this.setState({ userInput: newUserInput })
	}

	// changeCollectName = (e) => {
	// 	const { userInput } = this.state
	// 	const newUserInput = {
	// 		...userInput,
	// 		collectionName: e.target.value
	// 	}
	// 	this.setState({ userInput: newUserInput })
	// }

	render() {
		return (
			<div>
				<p>CREATING YOUR BOOK USING</p>
				<h1>Template {this.state.templateId}</h1>
				<form onSubmit={this.handleSubmit}>
					<input type='text' placeholder='Brand Name' value={this.state.userInput.brandName} onChange={this.changeBrandName} />
					<input type='text' placeholder='Collection Name' value={this.state.brandNameInput} onChange={this.changeCollectionName} />

					{this.state.userInput.products.map((product, idx) => (
						// assigning key to index might cause issues if we allow users to change order
						// would need to use something more random
						<div key={idx} className="product-input">
							<input type="text" placeholder={`Product #${idx + 1} name`} value={product.name} onChange={this.handleProductNameChange(idx)} />
							<input type="text" placeholder={`Product #${idx + 1} url`} value={product.url} onChange={this.handleProductURLChange(idx)} />
							<input type="text" placeholder={`Product #${idx + 1} description`} value={product.description} onChange={this.handleProductDescriptionChange(idx)} />
							<input type="text" placeholder={`Product #${idx + 1} image url`} value={product.imageURL} onChange={this.handleProductImageURLChange(idx)} />
						</div>
						))}
					<div><a className='primary-button' onClick={this.handleAddProduct}><span>Add Another Product</span></a></div>
					<div><input type='submit' className='submit-button' value="Go" /></div>
				</form>
			</div>
			)
	}

}

const mapStateToProps = state => ({
	dataFromStore: state.templates.userInput
})

const mapDispatchToProps = dispatch => ({
	collectCreateData: bindActionCreators(collectCreateData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)