import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserData } from '../../actions/auth'

class Profile extends Component {

  loggedIn = () => {
    return !!localStorage.getItem("jwt")
  }

  componentWillMount = () => {
    if (this.loggedIn()) {
      this.props.getUserData(localStorage.getItem('jwt'))
	    }
  	}

	render() {
		return (
				<div className="page-wrapper">
					<h1>{this.props.user.data.user.username}</h1>
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
    getUserData: (jwt) => {
      dispatch(getUserData(jwt))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)