import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import FadeIn from '../Animations/FadeIn';
import { getImageFromApi } from '../API/TMDBApi';

function SeenFilms({ navigation, seenFilms }) {
  const [showDate, setShowDate] = useState(false);

  return (
    <FlatList
      style={styles.mainContainer}
      data={seenFilms}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => {
        const idFilm = item.id;
        return (<FadeIn>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate("FilmDetail", {idFilm})}
            onLongPress={() => setShowDate(!showDate)}
          >
            <Image style={styles.itemImage}
              source={{uri: getImageFromApi(item.poster_path)}}
            />
            <Text style={styles.text}>
              {showDate ? 'Sorti le ' + moment(new Date(item.release_date)).format('DD/MM/YYYY') : item.title}
            </Text>
          </TouchableOpacity>
        </FadeIn>)
      }}
    />
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 5,
  },
  itemContainer: {
    height: 125,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
    margin: 5,
  },
  text: {
    flex: 1,
    fontSize: 20,
    color: '#666',
    margin: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    seenFilms: state.toggleSeenFilm.seenFilms,
  };
}; 

export default connect(mapStateToProps)(SeenFilms);