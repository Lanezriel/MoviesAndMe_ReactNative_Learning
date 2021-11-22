const initialState = { seenFilms: [] };

function toggleSeenFilm(state = initialState, action) {
  let nextState;
  switch(action.type) {
    case 'TOGGLE_SEEN_FILM':
      const film = state.seenFilms.find(f => f.id === action.value.id);

      if(film !== undefined) {
        nextState = {
          ...state,
          seenFilms: state.seenFilms.filter(f => f.id !== film.id),
        };
      } else {
        nextState = {
          ...state,
          seenFilms: [...state.seenFilms, action.value],
        };
      }

      return nextState || state;
    default:
      return state;
  }
}

export default toggleSeenFilm;