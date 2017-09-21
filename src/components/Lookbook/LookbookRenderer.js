import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'

const LookbookRenderer  = (HOC) => {

	return class extends Component {
		render() {
			return (
				<div>
					<NavBar />
					<HOC {...this.props}/>
				</div>
				)
		}
	}
}

export default LookbookRenderer