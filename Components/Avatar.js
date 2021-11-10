import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import { connect } from 'react-redux';

function Avatar({ dispatch, avatar }) {
  const avatarClicked = () => {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('L\'utilisateur a annulé');
      } else if (response.errorMessage) {
        console.log('Erreur : ' + response.errorMessage);
      } else {
        console.log('Photos : ' + response.assets[0].uri);
        const newAvatar = response.assets[0].uri;
        dispatch({ type: 'SET_AVATAR', value: {uri: newAvatar} });
      }
    });
  };

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={avatarClicked}
    >
      <Image style={styles.avatar} source={avatar} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2,
  },
});

const mapStateToProps = (state) => {
  return {
    avatar: state.setAvatar.avatar
  };
};

export default connect(mapStateToProps)(Avatar);