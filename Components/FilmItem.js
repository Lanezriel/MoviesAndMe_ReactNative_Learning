import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import FadeIn from '../Animations/FadeIn';
import { getImageFromApi } from '../API/TMDBApi';
import ic_favorite from '../Images/ic_favorite.png'

export default function FilmItem({
  film,
  displayDetailForFilm,
  isFilmFavorite,
}) {
  const displayFavoriteImage = () => {
    if(isFilmFavorite) {
      return <Image
        style={styles.favoriteImage}
        source={ic_favorite}
      />
    }
  };

  return (
    <FadeIn>
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={() => displayDetailForFilm(film.id)}
      >
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(film.poster_path)}}
        />
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            {displayFavoriteImage()}
            <Text style={styles.titleText}>{film.title}</Text>
            <Text style={styles.voteText}>{film.vote_average}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText} numberOfLines={6}>{film.overview}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </FadeIn>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 190,
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
  },
  contentContainer: {
    flex: 1,
    margin: 5,
  },
  headerContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionContainer: {
    flex: 7,
  },
  dateContainer: {
    flex: 1,
  },
  favoriteImage: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
  },
  voteText: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666',
  },
  descriptionText: {
    fontStyle: 'italic',
    color: '#666666',
  },
  dateText: {
    textAlign: 'right',
    fontSize: 14,
  },
});