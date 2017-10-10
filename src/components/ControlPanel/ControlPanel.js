import React, { Component } from 'react'
import './ControlPanel.css'
import Template1Controls from './Template1Controls'
import Template2Controls from './Template2Controls'

import { connect } from 'react-redux'
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

	renderControls = () => {
		switch(this.props.data.lookbook.template){
		case 1:
			return <Template1Controls />
		case 2:
			return <Template2Controls />
		default:
			return <div>Something went wrong</div>
		}
	}

	render() {
		return (
			<div className="control-panel" ref='controlPanel'>
				<div onClick={this.handleSidebarClick}  className="sidebar-text"><h6>Control Panel</h6><h6>{this.state.open ? 'Close': 'Open'}</h6></div>
				{ this.renderControls() }
			</div>
			)
	}
}

const mapStateToProps = state => ({
	data: state.templates.data
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)