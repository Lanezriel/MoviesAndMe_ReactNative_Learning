import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

function FadeIn({ children }) {
  const positionLeft = useRef(new Animated.Value(Dimensions.get('window').width)).current;

  useEffect(() => {
    Animated.spring(
      positionLeft,
      {
        toValue: 0,
        useNativeDriver: false,
      },
    ).start();
  }, []);

  return <Animated.View style={{left: positionLeft}}>
    {children}
  </Animated.View>
}

export default FadeIn;