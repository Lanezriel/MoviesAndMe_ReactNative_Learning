import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import numeral from 'numeral';

import { getFilmDetailsFromApi, getImageFromApi } from '../API/TMDBApi';
import ic_favorite from '../Images/ic_favorite.png';
import ic_favorite_border from '../Images/ic_favorite_border.png';

function FilmDetail({ route, dispatch, favoritesFilm }) {
  const { idFilm } = route.params;

  const [film, setFilm] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fav = favoritesFilm.find(f => f.id === idFilm);
    if (fav === undefined) {
      getFilmDetailsFromApi(idFilm)
        .then(data => {
          setFilm(data);
          setIsLoading(false);
        });
    }
    else {
      setFilm(fav);
      setIsLoading(false);
    }
  }, []);

  const displayLoading = () => {
    if(isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#099" />
        </View>
      );
    }
  };

  const displayFavoriteImage = () => {
    return (
      <Image
        style={styles.favoriteImage}
        source={favoritesFilm.findIndex(f => f.id === film.id) !== -1 ? ic_favorite : ic_favorite_border}
      />
    )
  };

  const toggleFavorite = () => {
    const action = { type: 'TOGGLE_FAVORITE', value: film };
    dispatch(action);
  };

  const displayFilm = () => {
    if(film !== undefined) {
      return (
        <ScrollView style={styles.scrollViewContainer}>
          <Image style={styles.image} source={{uri: getImageFromApi(film.backdrop_path)}} />

          <Text style={styles.title}>{film.title}</Text>
          <TouchableOpacity
            style={styles.favoriteContainer}
            onPress={toggleFavorite}
          >
            {displayFavoriteImage()}
          </TouchableOpacity>

          <Text style={styles.description}>{film.overview}</Text>

          <Text style={styles.defaultText}>
            Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.defaultText}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.defaultText}>
            Nombre de votes : {film.vote_count}
          </Text>
          <Text style={styles.defaultText}>
            Budget : {numeral(film.budget).format('0,0[.]00 $')}
          </Text>
          <Text style={styles.defaultText}>
            Genre(s) : {film.genres.map(g => g.name).join(' / ')}
          </Text>
          <Text style={styles.defaultText}>
            Companie(s) : {film.production_companies.map(c => c.name).join(' / ')}
          </Text>
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      {displayLoading()}
      {displayFilm()}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  image: {
    height: 200,
    margin: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  favoriteContainer: {
    alignItems: 'center',
  },
  favoriteImage: {
    width: 40,
    height: 40,
  },
  description: {
    fontStyle: 'italic',
    color: '#666',
    margin: 5,
    marginBottom: 15,
  },
  defaultText: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  };
};

export default connect(mapStateToProps)(FilmDetail);