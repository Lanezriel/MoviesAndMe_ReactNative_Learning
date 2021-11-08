import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  FlatList,
  ActivityIndicator
} from 'react-native';

import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
import { connect } from 'react-redux';
import FilmList from './FilmList';

function Search({ navigation, favoritesFilm }) {
  const [isLoading, setIsLoading] = useState(false);
  const [films, setFilms] = useState([]);
  let searchedText = useRef('');
  let page = useRef(0);
  let totalPages = useRef(0);

  useEffect(() => {
    if(films.length === 0 && searchedText.current !== '') {
      loadFilms();
    }
  }, [films]);

  const loadFilms = () => {
    if (searchedText.current.length > 0) {
      setIsLoading(true);

      getFilmsFromApiWithSearchedText(searchedText.current, page.current + 1)
        .then(data => {
          page.current = data.page;
          totalPages.current = data.total_pages;
          setFilms([...films, ...data.results]);
          setIsLoading(false);
        });
    }
  };

  const searchFilms = () => {
    page.current = 0;
    totalPages.current = 0;
    setFilms([]);
  };

  const searchTextInputChange = (text) => {
    searchedText.current = text;
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
      <TextInput
        style={styles.textInput}
        placeholder="Film title"
        onChangeText={searchTextInputChange}
        onSubmitEditing={searchFilms}
      />
      <Button title="Search" onPress={searchFilms} />
      <FilmList
        films={films}
        navigation={navigation}
        loadFilms={loadFilms}
        page={page.current}
        totalPages={totalPages.current}
      />
      {displayLoading()}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  textInput: {
    margin: 5,
    height: 50,
    borderColor: '#000000',
    borderRadius: 25,
    borderWidth: 1,
    padding: 5,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(Search);