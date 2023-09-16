/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, Fragment } from "react";
import {
  StyleSheet,
  View,
  Button,
  PanResponder,
  Animated,
  DeviceEventEmitter,
  Pressable,
  Text
} from "react-native";
import dimensions from "../../styles/dimensions";

let startTime;
let endTime;

let menus = [
  <Pressable onPress={()=>{
    DeviceEventEmitter.emit("splitView",true)
  }} >
    <Text>On"</Text>
  </Pressable>,
  <Pressable onPress={()=>{
    DeviceEventEmitter.emit("splitView",false)
  }} >
    <Text>Off"</Text>
  </Pressable>,
  <Text>"menu1"</Text>,
  <Text>"menu1"</Text>,
  <Text>"menu1"</Text>,
  <Text>"menu1"</Text>,
]

let floatingBtnBottomOffset = 30;
let floatingBtnCenterPosition = {
  x: dimensions.width/2,
  y: dimensions.height - ( 150+floatingBtnBottomOffset )
};

class FloatingBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      isVisible: false,
      angle: 0,
      isSplit: false,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => {
        return !this.state.isVisible;
      },
      onPanResponderTerminationRequest: (event, gestureState) => {
        return gestureState.dx !== 0 || gestureState.dy !== 0;
      },

      onPanResponderGrant: () => {
        //console.log('start')
        startTime = Date.now();
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value,
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        endTime = Date.now();
        this.state.pan.flattenOffset();
        console.log(endTime - startTime);
        if (endTime - startTime < 120) {
          this.touchFloatBtn();
        } else if (this.state.isVisible) {
          this.setState({
            isVisible: false,
          });
        }
      },
    });

    //기능 버튼
    this.PR_btn = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderRelease: () => {
        console.log("btn");
        // this.AngleChange();
      },
    });

    //Background
    this.PR_Back = PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        return this.state.isVisible;
      },
      onPanResponderMove: (evt, gestureState) => {
        // console.log(gestureState.dx,gestureState.dy);
        // console.log(gestureState.moveY,floatingBtnCenterPosition.y);
        // console.log(gestureState.moveX-floatingBtnCenterPosition.x,floatingBtnCenterPosition.y-gestureState.moveY)
        // console.log( * 180 /  Math.PI)
        
        
        // console.log("Back");
        // floatingBtnCenterPosition
        // let direction;
        // if(gestureState.moveX <= floatingBtnCenterPosition.x){
        //   if(gestureState.moveY <= floatingBtnCenterPosition.y){
        //       //3
        //   }else{
        //     //1
        //   }
        // }else{
        //   if(gestureState.moveY <= floatingBtnCenterPosition.y){
        //     //4
        //   }else{
        //     //2
        //   }
        // }
        let a = (Math.atan2(gestureState.moveY-floatingBtnCenterPosition.y,gestureState.moveX-floatingBtnCenterPosition.x) * 180 / Math.PI);
        this.AngleChange(a);
      },
      onPanResponderRelease: () => {
        console.log("back");
      },
    });
  }

  touchFloatBtn = () => {
    console.log("touch");
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible,
    }));
    // let nextIsSplitValue = !this.state.isSplit;
    // DeviceEventEmitter.emit("splitView",nextIsSplitValue);
    // this.setState({ isSplit: nextIsSplitValue});
  };

  AngleChange = (angle) => {
    // console.log("spin");
    this.setState({angle: angle})
    // this.setState((prevState) => ({
    //   angle: prevState.angle + (direction === "plus" ? 10 : -10),
    // }));
  };

  handleClose = () => {
    this.setState((prevState) => ({
      isVisible: false
    }));
  }

  handleOpen = () => {
    this.setState((prevState) => ({
      isVisible: true
    }));
  }

  render() {
    const { pan } = this.state;
    const { isVisible } = this.state;

    let X_center = pan.x._value + 25;
    let Y_center = pan.y._value + 25;
    const btn_radius = 20;
    const radian = (this.state.angle * Math.PI) / 180;
    const len = 100;

    return (
      <Fragment>
        {isVisible && (
          <Pressable
            style={styles.activeDim}
            onPress={this.handleClose}
          />
        )}
        {isVisible && (
          <View
            style={[
              styles.MenuBtn,
              {
                left: dimensions.width / 2 - 150,
                bottom: floatingBtnBottomOffset,
              },
            ]}
            {...this.PR_Back.panHandlers}
          >
            {
              menus.map((menu,menuIndex) => <View
                key={menuIndex}
                style={{ 
                  // backgroundColor: ["red","yellow","blue","white","black","orange"][menuIndex],
                  position: "absolute",
                  width: 100,
                  height: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                    // backgroundColor: "red" ,
                    transform: [
                      {
                        translateX:  len * Math.cos(radian + ( Math.PI*2 / menus.length ) * menuIndex),
                      },
                      {
                        translateY:  len * Math.sin(radian + ( Math.PI*2 / menus.length ) * menuIndex),
                      },
                    ]
                }}
              >
                  {menu}
              </View>)
            }
            
          </View>
        )}
        {/* {isVisible && (
          <View
            style={[
              styles.MenuBtn,
              {
                left: dimensions.width / 2 - 150,
                bottom: 30,
              },
              {
                transform: [
                  {
                    translateX: X_center + len * Math.cos(radian) - btn_radius,
                  },
                  {
                    translateY: Y_center + len * Math.sin(radian) - btn_radius,
                  },
                ],
              },
            ]}
            {...this.PR_btn.panHandlers}
          />
        )} */}
        <Animated.View
          style={[
            styles.FloatBtn,
            {
              left: dimensions.width / 2 - 25,
              bottom: floatingBtnBottomOffset,
            },
          ]}
          {...this.panResponder.panHandlers}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  FloatBtn: {
    position: "absolute",
    zIndex: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "blue",
    opacity: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  MenuBtn: {
    position: "absolute",
    zIndex: 11,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "skyblue",
    opacity: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainView: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    borderWidth: 10,
    left: 0,
    width: "100%",
    height: 400,
  },
  activeDim: {
    height: dimensions.height,
    width: dimensions.width,
    backgroundColor: "gray",
    zIndex: 8,
    opacity: 0.5,
    position: "absolute",
    left: 0,
    bottom: 0,
  }
});

export default FloatingBtn;
