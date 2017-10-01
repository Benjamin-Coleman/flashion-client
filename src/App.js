import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
// import { CSSTransitionGroup } from 'react-transition-group'
// import TransitionGroup from 'react-transition-group/TransitionGroup';
// import { TransitionGroup, CSSTransition } from 'react-transition-group'

import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import TemplatesIndex from './components/TemplatesIndex/TemplatesIndex'
import Create from './components/Create/Create'
import Lookbook from './components/Lookbook/Lookbook'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import About from './components/About/About'
import NotFound from './components/NotFound/NotFound'

import { getUserData } from './actions/auth'
import { screenResize } from './actions'
// import { AnimatedWrapper, TestComponent } from './AnimatedWrapper'


class App extends Component {

  loggedIn = () => {
    return !!localStorage.getItem("jwt")
  }

  componentDidMount = () => {
    if (this.loggedIn()) {
      // this.props.getUserData(localStorage.getItem('jwt'))
    }
    window.addEventListener('resize', () => this.props.onResize({ width: window.innerWidth, height: window.innerHeight }))
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Route path='/' component={ NavBar } />
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/about" component={ About } />
          <Route exact path="/signup" component={ Signup } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/templates" component={ TemplatesIndex } />
          <Route exact path="/templates/:id/new" component={ Create } />
          <Route exact path="/lookbooks/preview/:brandName/:collection" component={ Lookbook } />
          <Route exact path="/lookbooks/:id" component={ Lookbook } />
          <Route exact path="/lookbooks/:id/edit" component={ Lookbook } />
          <Route exact path="/profile" component={ Profile } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    viewport: state.viewport,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onResize: (viewport) => {
      dispatch(screenResize(viewport))
    },
    getUserData: (jwt) => {
      dispatch(getUserData(jwt))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
