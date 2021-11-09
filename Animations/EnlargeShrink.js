import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

function EnlargeShrink({ shouldEnlarge, children }) {
  const getSize = () => shouldEnlarge ? 80 : 40;

  const viewSize = useRef(new Animated.Value(getSize())).current;

  useEffect(() => {
    Animated.spring(
      viewSize,
      {
        toValue: getSize(),
        useNativeDriver: false,
      },
    ).start();
  }, [shouldEnlarge]);

  return <Animated.View style={{width: viewSize, height: viewSize}}>
    {children}
  </Animated.View>
}

export default EnlargeShrink;