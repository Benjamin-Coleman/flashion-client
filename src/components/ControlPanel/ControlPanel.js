import React, { Component } from 'react'
import './ControlPanel.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateProductOpacity, updateProductColor, updateImageGrayscale, updateImageAppearDuration, updateInfoAppearDuration, updateFontFamily } from '../../actions/templates'
import ColorPicker from 'react-color-picker'
import Slider from 'rc-slider'
import 'react-color-picker/index.css'
import 'rc-slider/assets/index.css'
import { TweenMax, Back, Power2 } from 'gsap'

class ControlPanel extends Component {

	state = {
		open: false,
		editDialogues: {
			productInfoColor: false,
			productInfoOpacity: false
		},
		currentElement: '',
	}

	handleSidebarClick = () => {
		if (!this.state.open) {
			TweenMax.to(this.refs.controlPanel, .5, {x: 0, ease: Back.easeOut.config(1.2)})
			this.setState({ open: true})
		} else {
			TweenMax.to(this.refs.controlPanel, .5, {x: 650, ease: Power2.easeOut})
			this.setState({ open: false})
		}
	}

	render() {

		console.log('CONTROL PANEL STATE', this.state)
		return (
			<div className="control-panel" ref='controlPanel'>
				
				<div onClick={this.handleSidebarClick}  className="sidebar-text"><h6>Control Panel</h6><h6>{this.state.open ? 'Close': 'Open'}</h6></div>
				<div className="controls-wrapper">
					<div className="product-info-dialogues">
						<h2>Product Info Options</h2>
						<div style={{ display: 'flex', flexWrap: 'wrap'}}>
							<div style={{ padding: '10px'}}>
								<h4>Color</h4>
								<ColorPicker saturationWidth={150} saturationHeight={150} value={this.props.data.lookbook.styles.color1} onDrag={this.props.updateProductColor} />
							</div>
							<div style={{ padding: '10px'}}>
								<h4>Opacity</h4>
								<h4 style={{ marginBottom: '0'}}>{this.props.data.lookbook.styles.opacity || 100}%</h4>
								<div style={{ width: '250px' }}>
									<Slider trackStyle={{ 
											background: 'linear-gradient(315deg, #929BEF 0%, #63E2FF 100%)', 
											height: 10 
										}} 
										handleStyle={{
											height: 20,
											width: 20,
										}}
										onChange={this.props.updateProductOpacity} defaultValue={100} 
									/>
								</div>
								{this.props.data.lookbook.template === 2 ? 
									<div>
										<h4 style={{ fontFamily: `${this.props.data.lookbook.styles.fontFamily || 'Avenir, sans-serif'}`}}>Font Family: {this.props.data.lookbook.styles.fontFamily || 'Playfair Display'}</h4>
										<div style={{ width: '250px'}}>
											<select onChange={this.props.updateFontFamily}>
												<option style={{ fontFamily: 'Playfair Display'}} value="Playfair Display">Playfair Display</option>
												<option style={{ fontFamily: 'Avenir'}} value="Avenir">Avenir</option>
												<option style={{ fontFamily: 'Josefin Slab'}} value="Josefin Slab">Josefin Slab</option>
												<option style={{ fontFamily: 'Poppins'}} value="Poppins">Poppins</option>
											</select>
										</div>
									</div>
									: null}
							</div>
						</div>
					</div>
					<div className="product-image-dialogues">
						<h2>Product Image Options</h2>
						<div style={{ display: 'flex', flexWrap: 'wrap'}}>
							<div style={{ padding: '10px'}}>
								<h4>Grayscale</h4>
								<div style={{width: '250px'}}>
									<Slider 
										trackStyle={{ 
											background: 'linear-gradient(315deg, #929BEF 0%, #63E2FF 100%)', 
											height: 10 
										}} 
										handleStyle={{
											height: 20,
											width: 20,

										}}
										onChange={ this.props.updateImageGrayscale } 
										defaultValue={0} 
									/>
								</div>
							</div>

						</div>
					</div>
					<div className="product-image-dialogues">
						<h2>Animation Options</h2>
						<div style={{ display: 'flex', flexWrap: 'wrap'}}>
							<div style={{ padding: '10px'}}>
								<h4>Image Appear Duration</h4>
								<h4 style={{ marginBottom: '0'}}>{this.props.data.lookbook.styles.imageAppearDuration}s</h4>
								<div style={{ width: '250px' }}>
									<Slider 
										trackStyle={{ 
											background: 'linear-gradient(315deg, #929BEF 0%, #63E2FF 100%)', 
											height: 10 
										}} 
										handleStyle={{
											height: 20,
											width: 20,

										}}
										onChange={ this.props.updateImageAppearDuration } 
										defaultValue={ this.props.data.lookbook.styles.imageAppearDuration || 1.5 } 
										step={0.1}
										min={0}
										max={5}
									/>
								</div>
							</div>
							<div style={{ padding: '10px' }}>
								<h4>Info Appear Duration</h4>
								<h4 style={{ marginBottom: '0'}}>{this.props.data.lookbook.styles.infoAppearDuration || 1}s</h4>
								<div style={{ width: '250px' }}>
									<Slider 
										trackStyle={{ 
											background: 'linear-gradient(315deg, #929BEF 0%, #63E2FF 100%)', 
											height: 10 
										}} 
										handleStyle={{
											height: 20,
											width: 20,
										}}
										onChange={ this.props.updateInfoAppearDuration } 
										defaultValue={1} 
										step={0.1}
										min={0}
										max={5}
									/>
								</div>
							</div>
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
	updateProductOpacity: bindActionCreators(updateProductOpacity, dispatch),
	updateProductColor: bindActionCreators(updateProductColor, dispatch),
	updateImageGrayscale: bindActionCreators(updateImageGrayscale, dispatch),
	updateImageAppearDuration: bindActionCreators(updateImageAppearDuration, dispatch),
	updateInfoAppearDuration: bindActionCreators(updateInfoAppearDuration, dispatch),
	updateFontFamily: bindActionCreators(updateFontFamily, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)