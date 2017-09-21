import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../actions/auth'

class Signup extends Component {

	state = {
		username: '',
		email: '',
		password: '',
		confirm_password: ''
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.signup(this.state, this.props.history)
	}

	handleUsername = (e) => {
		this.setState({ username: e.target.value})
	}

	handleEmail = (e) => {
		this.setState({ email: e.target.value})
	}

	handlePassword = (e) => {
		this.setState({ password: e.target.value})
	}

	handleConfirmPassword = (e) => {
		this.setState({ confirm_password: e.target.value})
	}

	render() {
		console.log(this.state)
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type='text' onChange={this.handleUsername} value={this.state.username} placeholder='Username' required/>
					<input type='text' onChange={this.handleEmail} value={this.state.email} placeholder='Email' required/>
					<input type='password' onChange={this.handlePassword} value={this.state.password} placeholder='Password' required/>
					<input type='password' onChange={this.handleConfirmPassword} value={this.state.confirm_password} placeholder='Password Confirmation' required/>
					<input type='submit' />
				</form>
			</div>
			)
	}
}

function mapDispatchToProps (dispatch) {
	return {
		signup: (userData, history) => {
			dispatch(signup(userData, history))
		}
	}
}

export default connect(null, mapDispatchToProps)(Signup)