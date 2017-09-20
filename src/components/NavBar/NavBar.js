import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './NavBar.css'

class NavBar extends Component {
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
					<NavLink to='/login' activeClassName="selected">Login</NavLink>
				</div>
			</div>
			)
	}
}

export default NavBar