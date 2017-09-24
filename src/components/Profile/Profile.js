import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserData } from '../../actions/auth'
import LookbookPreview from '../Lookbook/LookbookPreview'

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
    const renderLookbookPreviews = this.props.user.data.lookbooks.map((x, index) => <LookbookPreview key={index} brandName={x.brand_name} collectionName={x.collection_name} templateThumbnail={`/assets/img/template_preview_${x.template_id}`} lookbookId={x.id}/> )
    console.log(this.props)
		return (
				<div className="page-wrapper">
					<h1>{this.props.user.data.user.username}</h1>
            <div className='page-wrapper templates'>
              <h2>Templates</h2>
              <div className='template-grid'>     
              {renderLookbookPreviews}
              </div>
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
    getUserData: (jwt) => {
      dispatch(getUserData(jwt))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)