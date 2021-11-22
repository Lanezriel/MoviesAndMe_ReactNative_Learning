import { createStore } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import toggleFavorite from './Reducers/favoriteReducer';
import toggleSeenFilm from './Reducers/seenFilmsReducer';
import setAvatar from './Reducers/setAvatar';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
};

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, toggleSeenFilm, setAvatar}));