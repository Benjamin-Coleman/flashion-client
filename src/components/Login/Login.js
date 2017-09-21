import React, { Component } from 'react'
import './Login.css'
import { login } from "../../actions/auth"
import { connect } from 'react-redux'

class Login extends Component {

	state = {
		username: '',
		password: '',
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.login(this.state, this.props.history)
	}

	handleUsername = (e) => {
		this.setState({ username: e.target.value})
	}

	handlePassword = (e) => {
		this.setState({ password: e.target.value})
	}

	render() {
		console.log(this.state)
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type='text' onChange={this.handleUsername} value={this.state.username} placeholder='Username' required/>
					<input type='password' onChange={this.handlePassword} value={this.state.password} placeholder='Password' required/>
					<input type='submit' />
				</form>
			</div>
			)
	}
}

function mapDispatchToProps (dispatch) {
	return {
		login: (userData, history) => {
			dispatch(login(userData, history))
		}
	}
}

export default connect(null, mapDispatchToProps)(Login)