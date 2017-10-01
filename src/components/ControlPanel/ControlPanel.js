import React, { Component } from 'react'
import './ControlPanel.css'

import ColorPicker from 'react-color-picker'
import Slider from 'rc-slider'
import 'react-color-picker/index.css'
import 'rc-slider/assets/index.css'

class ControlPanel extends Component {

	state = {
		...this.props.templateState,
		open: false,

	}

	render() {
		console.log('CONTROL PANEL STATE', this.state)
		return (
			<div>
				<div className="product-info-dialogues">
					{this.state.editDialogues.productInfoColor ? <ColorPicker value={this.state.customizations.color1} onDrag={this.onDrag} /> : null}
					{this.state.editDialogues.productInfoOpacity ? <div style={{width: '500px', height: '100px', position: 'absolute'}}><Slider onChange={this.onOpacitySlide} defaultValue={100} /></div> : null}
				</div>
			</div>
			)
	}
}

export default ControlPanel