import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserData } from '../../actions/auth'
import LookbookPreview from '../Lookbook/LookbookPreview'
import { TweenMax } from 'gsap'
import './Profile.css'

class Profile extends Component {

  loggedIn = () => {
    return !!localStorage.getItem("jwt")
  }

  componentDidMount = () => {
    if (this.loggedIn()) {
      this.props.getUserData(localStorage.getItem('jwt'))
	    }
     const els = document.querySelectorAll('.lookbook-preview')
     TweenMax.staggerFromTo(els, 1, {opacity: 0, y: -20}, {opacity: 1, y:0}, .2)
    }

  // componentDidMount = () => {
  // }

	render() {
    const renderLookbookPreviews = this.props.auth.user.lookbooks.map((x, index) => <LookbookPreview key={index} brandName={x.brandName} collectionName={x.collectionName} templateThumbnail={`/assets/img/template_preview_${x.template}`} lookbookId={x._id}/> )
    console.log(this.props)
		return (
      <div>
        <div className="profile-header">
          <h1>{this.props.auth.user.username}</h1>
          <h6>Published Lookbooks</h6>
        </div>
        <div className="page-wrapper">
          <div className='page-wrapper templates'>
            <div className='template-grid'>     
              {renderLookbookPreviews}
            </div>
          </div>
        </div>
      </div>
			)
	}
}


const mapStateToProps = (state) => {
  return {
    auth: state.auth
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