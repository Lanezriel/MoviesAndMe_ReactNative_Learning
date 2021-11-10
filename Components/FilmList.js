import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import FilmItem from './FilmItem';

function FilmList({
  navigation,
  films,
  favoritesFilm,
  loadFilms,
  page,
  totalPages,
}) {
  const displayDetailForFilm = (idFilm) => {
    navigation.navigate("FilmDetail", {idFilm});
  };

  return (
    <FlatList
      style={styles.list}
      data={films}
      extraData={favoritesFilm}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) =>
        <FilmItem
          film={item}
          isFilmFavorite={favoritesFilm.findIndex(film => film.id === item.id) !== -1 ? true : false}
          displayDetailForFilm={displayDetailForFilm}
        />
      }
      onEndReachedThreshold={.5}
      onEndReached={() => {
        if (page < totalPages) {
          loadFilms();
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

FilmList.defaultProps = {
  page: 0,
  totalPages: 0,
};

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
  };
};

export default connect(mapStateToProps)(FilmList);