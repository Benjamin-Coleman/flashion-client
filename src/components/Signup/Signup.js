import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../actions/auth'
import './Signup.css'

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
			<div className="signup-wrapper">
				<form className="signup-form" onSubmit={this.handleSubmit}>
					<h1>Signup</h1>
					<div><input type='text' onChange={this.handleUsername} value={this.state.username} placeholder='Username' required/></div>
					<div><input type='text' onChange={this.handleEmail} value={this.state.email} placeholder='Email' required/></div>
					<div><input type='password' onChange={this.handlePassword} value={this.state.password} placeholder='Password' required/></div>
					<div><input type='password' onChange={this.handleConfirmPassword} value={this.state.confirm_password} placeholder='Confirmation' required/></div>
					<div><input className="primary-button" type='submit' /></div>
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