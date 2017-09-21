import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, getUserData } from '../../actions/auth'
import './NavBar.css'

class NavBar extends Component {

	loggedIn = () => {
		return !!localStorage.getItem("jwt")
	}

	componentWillMount = () => {
		if (this.loggedIn()) {
			this.props.getUserData(localStorage.getItem('jwt'))
		}
	}

	handleLogout = (e) => {
		e.preventDefault()
		this.props.logout()
		this.props.history.push('/')
	}

	render() {
		return (
			<div className='navbar'>
				<div className='logo'>
					<NavLink to='/'>
						<h3>Flashion</h3>
					</NavLink>
				</div>
				<div className='nav-links'>
					<NavLink to='/about' activeClassName="selected">About</NavLink>
					<NavLink to='/templates' activeClassName="selected">Templates</NavLink>
					{ this.loggedIn() ? 
						<NavLink to='/profile' activeClassName="selected">Profile</NavLink> 
						: 
						<NavLink to='/login' activeClassName="selected">Login</NavLink>
					}
					{ this.loggedIn() ? 
						<NavLink to='/' activeClassName="selected" onClick={this.handleLogout}>Logout</NavLink> 
						:
						<NavLink to='/signup' activeClassName="selected">Signup</NavLink>
					}
				</div>
			</div>
			)
	}
}

const mapStateToProps = (state) => {
  return {
    user: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout())
    },
    getUserData: (jwt) => {
      dispatch(getUserData(jwt))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)