import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import FilmList from './FilmList';

function Favorites({ navigation, favoritesFilm }) {
  return (
    <FilmList
      films={favoritesFilm}
      navigation={navigation}
    />
  );
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(Favorites);