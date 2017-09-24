import React, { Component } from "react";
import animation from './components/Login/animation'
import { Transition } from 'react-transition-group'

export const AnimatedWrapper = WrappedComponent => class AnimatedWrapper
 extends Component {

 componentWillEnter(cb) {
  console.log('enterrrrrr')
  animation.show(this.refs.animatedWrapper, cb)
  cb()
 }

 onEnter() {
  console.log('here')
 }

 onExited() {
  console.log('leaving')
 }

 render() {
  console.log('this:', this, 'props:', this.props)
  return (
   <div ref="animatedWrapper">
    <WrappedComponent {...this.props}  />
    </div>
  );
 }
};
//export AnimatedWrapper;


export class TestComponent extends Component {

  componentWillEnter(cb) {
  console.log('enterrrrrr')
  animation.show(this.refs.animatedWrapper, cb)
 }

 onEnter() {
  console.log('here')
 }

 onExited() {
  console.log('leaving')
 }

  render() {
    console.log(this.refs)
    return (
      <div ref="animatedWrapper">
        <p> Hello World</p>
      </div>
      )
    

  }
}