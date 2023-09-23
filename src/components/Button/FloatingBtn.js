/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, Fragment, useRef } from "react";
import {
  StyleSheet,
  View,
  Button,
  PanResponder,
  Animated,
  DeviceEventEmitter,
  Pressable,
  Text,
} from "react-native";
import dimensions from "../../styles/dimensions";
import { withTiming } from "react-native-reanimated";
import colors from "../../styles/colors";
import { getRootNavigation, navigationIterator } from "../../navigations/navigations";
import { AntDesign } from '@expo/vector-icons';
let startTime;
let endTime;

let floatingBtnBottomOffset = 30;
let floatingBtnCenterPosition = {
  x: dimensions.width / 2,
  y: dimensions.height - (150 + floatingBtnBottomOffset),
};

class FloatingBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      isVisible: false,
      angle: 0,
      preAngle: 0,
      startAngle: 0,
      isSplit: false,
      fadeAnim: new Animated.Value(0),
      sizeAnim: new Animated.Value(50),
    };

    this.updatePreAngle = () => {
      this.setState({
        preAngle: this.state.angle,
      });
    };

    this.fixStartAngle = (angle) => {
      this.setState({
        startAngle: angle,
      });
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

      onPanResponderEnd: () => {
        console.log("end");
        this.updatePreAngle();
        this.fixStartAngle(null);
      },
      onPanResponderMove: (evt, gestureState) => {
        let newAngle =
          (Math.atan2(
            gestureState.moveY - floatingBtnCenterPosition.y,
            gestureState.moveX - floatingBtnCenterPosition.x
          ) *
            180) /
          Math.PI;
        if (this.state.startAngle) {
          this.AngleChange(newAngle);
        } else {
          this.fixStartAngle(newAngle);
        }
      },
      onPanResponderRelease: () => {
        // console.log("back");
      },
    });
  }

  touchFloatBtn = () => {
    console.log("touch");
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible,
    }));
  };

  AngleChange = (angle) => {
    if (angle && this.state.startAngle) {
      this.setState({
        angle: this.state.preAngle + angle - this.state.startAngle,
      });
    }
  };

  handleClose = () => {
    this.setState((prevState) => ({
      isVisible: false,
    }));
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
    Animated.timing(this.state.sizeAnim, {
      toValue: 50,
      duration: 150,
      useNativeDriver: false,
    }).start();

    // setTimeout(()=>{

    // },150)
  };

  handleOpen = () => {
    Animated.timing(this.state.sizeAnim, {
      toValue: 300,
      duration: 150,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
      this.setState((prevState) => ({
        isVisible: true,
      }));
    }, 150);
  };

  render() {
    const { pan } = this.state;
    const { isVisible } = this.state;

    let X_center = pan.x._value + 25;
    let Y_center = pan.y._value + 25;
    const btn_radius = 20;
    const radian = (this.state.angle * Math.PI) / 180;
    const len = 100;

    menus = [
      <Pressable
        onPress={() => {
          getRootNavigation().reset({routes: [{name: 'CustomPage'}]})
          // getRootNavigation().navigate('CustomPage',{});
        }}
        style={[
          styles.menuContainer,
          {
            backgroundColor: "red",
          },
        ]}
      >
        <Text>커스텀 페이지</Text>
      </Pressable>,
      <Pressable
        onPress={() => {
          getRootNavigation().navigate('Extension',{});
          this.handleClose();
        }}
        style={[
          styles.menuContainer,
          {
            backgroundColor: "yellow",
          },
        ]}
      >
        <Text>익스텐션</Text>
      </Pressable>,
      <Pressable
        onPress={() => {
          let nextIsSplitValue = !this.state.isSplit;
          DeviceEventEmitter.emit("splitView", nextIsSplitValue);
          this.setState({ isSplit: nextIsSplitValue });
        }}
        style={[
          styles.menuContainer,
          {
            backgroundColor: "green",
          },
        ]}
      >
        <Text>{this.state.isSplit === true ? "분할끄기" : "분할켜기"}</Text>
      </Pressable>,
      <Pressable
        onPress={() => {
          getRootNavigation().reset({routes: [{name: 'MainHome'}]})
          // getRootNavigation().navigate('MainHome',{});
        }}
        style={[
          styles.menuContainer,
          {
            backgroundColor: "blue",
          },
        ]}
      >
        <Text>메인 페이지</Text>
      </Pressable>,
      <Pressable
        onPress={() => {
          // DeviceEventEmitter.emit("splitView",true)
          let nextIsSplitValue = !this.state.isSplit;
          DeviceEventEmitter.emit("splitView", nextIsSplitValue);
          this.setState({ isSplit: nextIsSplitValue });
          console.log(this.state.isSplit);
        }}
        style={[
          styles.menuContainer,
          {
            backgroundColor: "black",
          },
        ]}
      >
        <Text>{this.state.isSplit === true ? "분할끄기" : "분할켜기"}</Text>
      </Pressable>,
      <Pressable
        onPress={() => {
          let nextIsSplitValue = !this.state.isSplit;
          DeviceEventEmitter.emit("splitView", nextIsSplitValue);
          this.setState({ isSplit: nextIsSplitValue });
          console.log(this.state.isSplit);
        }}
        style={[
          styles.menuContainer,
          {
            backgroundColor: "purple",
          },
        ]}
      >
        <Text>{this.state.isSplit === true ? "분할끄기" : "분할켜기"}</Text>
      </Pressable>,
    ];

    return (
      <Fragment>
        {isVisible && (
          <Pressable style={styles.activeDim} onPress={this.handleClose} />
        )}
        {isVisible && (
          <Animated.View
            style={[
              styles.MenuBtn,
              {
                left: dimensions.width / 2 - 150,
                bottom: floatingBtnBottomOffset,
                opacity: this.state.fadeAnim,
              },
            ]}
            {...this.PR_Back.panHandlers}
          >
            <Pressable
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.blue.GoogleBlue,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={this.handleClose}
            >
              <AntDesign name="star" size={24} color="black" />
            </Pressable>
            {menus.map((menu, menuIndex) => (
              <View
                key={menuIndex}
                style={{
                  // backgroundColor: ["red","yellow","blue","white","black","orange"][menuIndex],
                  position: "absolute",
                  width: 90,
                  height: 90,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "red" ,
                  transform: [
                    {
                      translateX:
                        len *
                        Math.cos(
                          radian + ((Math.PI * 2) / menus.length) * menuIndex
                        ),
                    },
                    {
                      translateY:
                        len *
                        Math.sin(
                          radian + ((Math.PI * 2) / menus.length) * menuIndex
                        ),
                    },
                  ],
                }}
              >
                {menu}
              </View>
            ))}
          </Animated.View>
        )}
        <View
          style={{
            position: "absolute",
            left: dimensions.width / 2,
            bottom: 0,
            backgroundColor: "red",
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.View
            style={[
              styles.FloatBtn,
              {
                bottom: floatingBtnBottomOffset,
                width: this.state.sizeAnim,
                height: this.state.sizeAnim,
              },
            ]}
            // {...this.panResponder.panHandlers}
          >
            <Pressable
              onPress={this.handleOpen}
              style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}
            >
              <AntDesign name="star" size={24} color="black" />
            </Pressable>
          </Animated.View>
        </View>
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
    borderRadius: 150,
    backgroundColor: colors.blue.GoogleBlue,
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
    backgroundColor: colors.blue.Blue400,
    // backgroundColor: "red",
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
    backgroundColor: "black",
    zIndex: 8,
    opacity: 0.6,
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 50,
    width: 90,
    height: 90,
  },
});

export default FloatingBtn;
