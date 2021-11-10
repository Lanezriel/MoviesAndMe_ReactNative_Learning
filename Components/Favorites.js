import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import Avatar from './Avatar';
import FilmList from './FilmList';

function Favorites({ navigation, favoritesFilm }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.avatarContainer}>
        <Avatar />
      </View>
      <FilmList
        films={favoritesFilm}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
  };
};

export default connect(mapStateToProps)(Favorites);