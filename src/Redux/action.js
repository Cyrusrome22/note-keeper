import types from './type'

const setBackgroundColor = color => {
  return {
    type: types.CHANGE_BACKGROUND,
    payload: color
  }
}

const setSearchText = text => {
  return {
    type: types.CHANGE_SEARCH_TEXT,
    payload: text
  }
}

const addNote = note => {
  return {
    type: types.ADD_NOTE,
    payload: note
  }
}

const changeNote = note => {
  return {
    type: types.CHANGE_NOTE,
    payload: note
  }
}

export default {
  setBackgroundColor,
  setSearchText,
  addNote,
  changeNote
}
