import React, { useState, useRef } from 'react';
import { StyleSheet, View, Platform, Dimensions, PanResponder } from 'react-native';

// bien penser à enlever l'extention .ios ou .android automatiquement ajoutée par les IDE
// import HelloWorld from './HelloWorld';

function Test() {
  const [topPosition, setTopPosition] = useState(0);
  const [leftPosition, setLeftPosition] = useState(0);
  let { height, width } = Dimensions.get('window');

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      let touches = evt.nativeEvent.touches;
      console.log(touches);
      if (touches.length == 1) {
        setTopPosition(touches[0].pageY - height/2);
        setLeftPosition(touches[0].pageX - width/2);
      }
    },
  })).current;

  return (
    <View style={styles.mainContainer}>
      <View
        {...panResponder.panHandlers}
        style={[styles.animationView, {top: topPosition, left: leftPosition}]}
      />
      {/* <View style={styles.subviewContainer}></View> */}
      {/*
        L'import de ce HelloWorld permet d'automatiquement sélectionner
        le bon Component dépendant du système sur lequel on se trouve
      */}
      {/* <HelloWorld /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationView: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
  },
  subviewContainer: {
    ...Platform.select({
      ios: {
        backgroundColor: 'blue',
        height: 100,
        width: 50,
      },
      android: {
        backgroundColor: 'red',
        height: 50,
        width: 100,
      },
    }),
  },
});

export default Test;