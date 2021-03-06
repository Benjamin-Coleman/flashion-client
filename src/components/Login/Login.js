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

	componentDidEnter() {
		console.log('rtg enter')
	}


	render() {
		console.log(this.props)
		return (

			<div className="login-wrapper" ref="loginWrapper">
				<form className="login-form" onSubmit={this.handleSubmit}>
					<h1>Login</h1>
					{this.props.auth.errors ? <div ref="errors" style={{ visibility: 'visible', color: 'red'}}>{this.props.auth.errors}</div> : null}
					<div><input type='text' onChange={this.handleUsername} value={this.state.username} placeholder='Username' required/></div>
					<div><input type='password' onChange={this.handlePassword} value={this.state.password} placeholder='Password' required/></div>
					<div><input className="primary-button" type='submit' /></div>
				</form>
			</div>

			)
	}
}

function mapStatetoProps(state) {
	return {auth: state.auth}
}

function mapDispatchToProps(dispatch) {
	return {
		login: (userData, history) => {
			dispatch(login(userData, history))
		}
	}
}

export default connect(mapStatetoProps, mapDispatchToProps)(Login)