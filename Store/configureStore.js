import { createStore, combineReducers } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer';
import setAvatar from './Reducers/setAvatar';

export default createStore(combineReducers({toggleFavorite, setAvatar}));