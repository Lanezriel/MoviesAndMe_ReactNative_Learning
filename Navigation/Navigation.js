import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';
import News from '../Components/News';

import ic_search from '../Images/ic_search.png';
import ic_favorite from '../Images/ic_favorite.png';
import ic_fiber_news from '../Images/ic_fiber_new.png';
import ic_view_check from '../Images/ic_view_check.png';
import SeenFilms from '../Components/SeenFilms';

const SearchStack = createNativeStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator initialRouteName="Search">
      <SearchStack.Screen name="Search" component={Search} options={{title: 'Rechercher'}} />
      <SearchStack.Screen name="FilmDetail" component={FilmDetail} options={{title: 'Détails du film'}} />
    </SearchStack.Navigator>
  );
}

const FavoritesStack = createNativeStackNavigator();

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="Favorites" component={Favorites} options={{title: 'Favoris'}} />
      <FavoritesStack.Screen name="FilmDetail" component={FilmDetail} options={{title: 'Détails du film'}} />
    </FavoritesStack.Navigator>
  );
}

const NewsStack = createNativeStackNavigator();

function NewsStackScreen() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen name="News" component={News} options={{title: 'News'}} />
      <NewsStack.Screen name="FilmDetail" component={FilmDetail} options={{title: 'Détails du film'}} />
    </NewsStack.Navigator>
  )
}

const SeenFilmsStack = createNativeStackNavigator();

function SeenFilmsScreen() {
  return (
    <SeenFilmsStack.Navigator>
      <SeenFilmsStack.Screen name="SeenFilms" component={SeenFilms} options={{title: 'Films vus'}} />
      <SeenFilmsStack.Screen name="FilmDetail" component={FilmDetail} options={{title: 'Détails du film'}} />
    </SeenFilmsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveBackgroundColor: '#DDD',
          tabBarInactiveBackgroundColor: '#FFF',
          tabBarShowLabel: false,
        }}
      >
        {/* <Tab.Screen name="Test" component={Test} /> */}
        <Tab.Screen name="SearchTab"
          component={SearchStackScreen}
          options={{
            title: 'Rechercher',
            tabBarIcon: () => <Image source={ic_search} style={styles.icon} />,
          }}
        />
        <Tab.Screen name="FavoritesTab"
          component={FavoritesStackScreen}
          options={{
            title: 'Favoris',
            tabBarIcon: () => <Image source={ic_favorite} style={styles.icon} />,
          }}
        />
        <Tab.Screen name="NewsTab"
          component={NewsStackScreen}
          options={{
            title: 'News',
            tabBarIcon: () => <Image source={ic_fiber_news} style={styles.icon} />,
          }}
        />
        <Tab.Screen name="SeenFilmsTab"
          component={SeenFilmsScreen}
          options={{
            title: 'Films vus',
            tabBarIcon: () => <Image source={ic_view_check} style={styles.icon} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default Navigation;