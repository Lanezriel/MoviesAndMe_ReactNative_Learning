import ic_tag_faces from '../../Images/ic_tag_faces.png';

const initialState = { avatar: ic_tag_faces };

function setAvatar(state = initialState, action) {
  let nextState;
  switch(action.type) {
    case 'SET_AVATAR': return {
      ...state,
      avatar: {uri: action.value.uri}
    } || state;
    default: return state;
  }
}

export default setAvatar;