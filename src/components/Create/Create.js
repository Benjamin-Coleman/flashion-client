import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { collectCreateData } from '../../actions/templates'
import { setImageToUpload } from '../../actions/image'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import './Create.css'

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

	handleImageChange = (idx) => (e) => {
		e.preventDefault()
			let reader = new FileReader()
			let file = e.target.files[0]

		const newProducts = this.state.userInput.products.map((product, sidx) => {
			if (idx !== sidx) {
				return product
			}
			reader.onloadend = () => {
				return ({
					fileData: file,
					fileReader: reader,
					imagePreviewUrl: reader.result,
				});
			}

			const imgData = reader.onloadend()
			console.log(imgData)
			imgData.imagePreviewUrl = reader.result

			return { ...product, image: imgData }
		})
		console.log(newProducts)
		this.setState({ 
			...this.state, userInput: {
				...this.state.userInput, products: newProducts
				}
			})

			reader.readAsDataURL(file)
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

	handleDrop = (idx) => files => {

  // Push all the axios request promise into a single array
  const uploaders = files.map(file => {
    // Initial FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "qbpqctmc"); // Replace the preset name with your own
    formData.append("api_key", "582232915377864"); // Replace API key with your own Cloudinary key
    formData.append("timestamp", (Date.now() / 1000) | 0);
    
    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    return axios.post("https://api.cloudinary.com/v1_1/dqgw8xgpt/image/upload", formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    }).then(response => {
      const data = response.data;
      const fileURL = data.secure_url // You should store this URL for future references in your app
      console.log(data);
	    this.updateImageState(idx, data)
    })
  });

  // Once all the files are uploaded 
  axios.all(uploaders).then(() => {
    // ... perform after upload is successful operation
  });
}

updateImageState = (idx, data) => {
		const newProducts = this.state.userInput.products.map((product, sidx) => {
		if (idx !== sidx) {
			return product
		}
		return { ...product, imageURL: data.url
		}
	})
	this.setState({ 
		...this.state, userInput: {
			...this.state.userInput, products: newProducts
			} 
		})
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
		console.log(this.state)
		return (
			<div className="create-lookbook-wrapper">
				<div className="page-wrapper">
					<div className="create-header">
						<h6>CREATING YOUR BOOK USING</h6>
						<h1>Template {this.state.templateId}</h1>
					</div>
					<form className="create-lookbook-form" onSubmit={this.handleSubmit}>
						<div><input type='text' placeholder='Brand Name' value={this.state.userInput.brandName} onChange={this.changeBrandName} /></div>
						<div><input type='text' placeholder='Collection Name' value={this.state.brandNameInput} onChange={this.changeCollectionName} /></div>

						{this.state.userInput.products.map((product, idx) => (
							// assigning key to index might cause issues if we allow users to change order
							// would need to use something more random
							<div key={idx} className="product-input">
								<h3>{`Product ${idx + 1}`}</h3>
								<div><input type="text" placeholder={`Product #${idx + 1} name`} value={product.name} onChange={this.handleProductNameChange(idx)} /></div>
								<div><input type="text" placeholder={`Product #${idx + 1} url`} value={product.url} onChange={this.handleProductURLChange(idx)} /></div>
								<div><input type="text" placeholder={`Product #${idx + 1} description`} value={product.description} onChange={this.handleProductDescriptionChange(idx)} /></div>
								<div><input type="text" placeholder={`Product #${idx + 1} image url`} value={product.imageURL} onChange={this.handleProductImageURLChange(idx)} /></div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><Dropzone onDrop={this.handleDrop(idx)} accept="image/*" style={{
									 borderColor: 'rgb(200,200,200)', 
									 width: '200px', height: '200px', 
									 borderWidth: '2px', 
									 borderStyle: 'dashed', 
									 display: 'flex', 
									 alignItems: 'center', 
									 padding: '10px'
								}} >
								<p style={{ color: '#9a9aa6', textTransform: 'uppercase', fontWeight: '200', fontSize: '14px', letterSpacing: '1px'}}>Drop your file or click here to upload</p>
								</Dropzone>
								<div className="img-preview">
									{product.imageURL !== '' ? <img src={product.imageURL} />: null}
								</div>
								</div>
							</div>
							))}
						<div><a className='primary-button' onClick={this.handleAddProduct}><span>Add Another Product</span></a></div>
						<div><input type='submit' className='primary-button' value="Create Lookbook" /></div>
					</form>
				</div>
			</div>
			)
	}

}

const mapStateToProps = state => ({
	dataFromStore: state.templates.userInput
})

const mapDispatchToProps = dispatch => ({
	collectCreateData: bindActionCreators(collectCreateData, dispatch),
	setImageToUpload: bindActionCreators(setImageToUpload, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)