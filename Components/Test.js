import React from 'react';
import { StyleSheet, View } from 'react-native';

function Test() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subviewContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subviewContainer: {},
});

export default Test;