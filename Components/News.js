import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import { getLatestFilmsFromApi } from '../API/TMDBApi';

import FilmList from './FilmList';

function News({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [films, setFilms] = useState([]);
  let page = useRef(0).current;
  let totalPages = useRef(0).current;

  useEffect(() => {
    loadFilms();
  }, []);

  const loadFilms = () => {
    setIsLoading(true);

    getLatestFilmsFromApi(page + 1)
      .then(data => {
        page = data.page;
        totalPages = data.total_pages;
        setFilms([...films, ...data.results]);
        setIsLoading(false);
      });
  };

  const displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#099" />
        </View>
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <FilmList
        films={films}
        navigation={navigation}
        loadFilms={loadFilms}
        page={page}
        totalPages={totalPages}
      />
      {displayLoading()}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default News;