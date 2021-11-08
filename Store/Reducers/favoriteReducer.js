const initialState = { favoritesFilm: [] };

function toggleFavorite(state = initialState, action) {
  let nextState;
  switch(action.type) {
    case 'TOGGLE_FAVORITE':
      const film = state.favoritesFilm.find(f => f.id === action.value.id);

      if(film !== undefined) {
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter(f => f.id !== film.id),
        };
      } else {
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value],
        };
      }

      return nextState || state;
    default:
      return state;
  }
}

export default toggleFavorite;