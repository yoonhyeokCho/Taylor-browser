/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/

import React, { Component } from 'react';
import { StyleSheet, View, Button, PanResponder, Animated, DeviceEventEmitter } from 'react-native';

let startTime;
let endTime;

class FloatingBtn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),

      isVisible: false,

      angle : 0,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => {
        return !(this.state.isVisible)
      },
      onPanResponderTerminationRequest: (event, gestureState) => {
        return gestureState.dx !== 0 || gestureState.dy !== 0;
      },

      onPanResponderGrant: () => {
        //console.log('start')
        startTime = Date.now();
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: () => {
        endTime = Date.now();
        this.state.pan.flattenOffset();
        console.log(endTime - startTime)
        if(endTime - startTime < 120){
          this.touchFloatBtn();
        }
        else if(this.state.isVisible){
          this.setState({
            isVisible: false
          })
        }
      },
    });

    //기능 버튼
    this.PR_btn = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder:() => false,
      onPanResponderRelease: () => {
        console.log('btn')
        this.AngleChange();
      }
    })

    //Background
    this.PR_Back = PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        return (this.state.isVisible)
      },
      onPanResponderMove: () => {
        console.log('Back')
        this.AngleChange();
      },
      onPanResponderRelease: () => {
        console.log('back')
      }
    })
  }

  touchFloatBtn = () => {
    console.log('touch')
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }))
    let nextMultiwindowState = !this.props.state.MultiWindow;
    DeviceEventEmitter.emit("splitView",nextMultiwindowState);
    this.props.setState({ MultiWindow: nextMultiwindowState});
  }

  AngleChange = () => {
    console.log('spin')
    this.setState(prevState => ({
      angle : prevState.angle + 10
    }))
  }

  render () {

    const { pan } = this.state;
    const { isVisible } = this.state;

    let X_center = pan.x._value + 25;
    let Y_center = pan.y._value + 25;
    const btn_radius = 20;
    const radian = (this.state.angle * Math.PI) / 180;
    const len = 50;
    
    
    return (
      <View style={styles.mainView}>
        {isVisible && <View style={[styles.BackGround, {transform: [{translateX: pan.x._value - 50}, {translateY: pan.y._value - 50}]}]}
                            {...this.PR_Back.panHandlers}/>}
        {isVisible && <View style={[styles.MenuBtn, {transform: [{translateX: X_center + len * Math.cos(radian) - btn_radius}, {translateY: Y_center + len * Math.sin(radian) - btn_radius}]}]}
                            {...this.PR_btn.panHandlers} />}
        <Animated.View
              style={[styles.FloatBtn, {transform: [{translateX: 180}, {translateY: 600}]}]}
              {...this.panResponder.panHandlers}/>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  FloatBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'blue',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MenuBtn: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'green',
    opacity: 0.7,
    
  },
  BackGround: {
    position: 'absolute',
    width : 150,
    height: 150,
    borderRadius: 170,
    backgroundColor: 'skyblue',
    opacity: 0.5,

  },
  mainView: {
    flex: 1,
  }
});


export default FloatingBtn;
