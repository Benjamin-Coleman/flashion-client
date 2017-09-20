import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import thunk from 'redux-thunk'
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import TemplatesIndex from './components/Templates/TemplatesIndex'
import Create from './components/Create/Create'
import Lookbook from './components/Lookbook/Lookbook'

import { screenResize } from './actions'

class App extends Component {

  componentWillMount = () => {
    window.addEventListener('resize', () => this.props.onResize({ width: window.innerWidth, height: window.innerHeight }))
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path="/" component={ Home } />
        <Route exact path="/templates" component={ TemplatesIndex } />
        <Route exact path="/templates/:id/new" component={ Create } />
        <Route exact path="/lookbooks/:brandName/:collection" component={ Lookbook } />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    viewport: state.viewport
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onResize: (viewport) => {
      dispatch(screenResize(viewport))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
