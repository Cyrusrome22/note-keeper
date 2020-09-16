import { combineReducers } from 'redux'
import { v4 as uuidv4 } from 'uuid'
import types from './type'
import Notes from '../TestData/Notes'
import deepClone from 'javascript-deepclone'

const initPageState = {
  backgroundColor: { hex: '#ECECEC', hsl: { a: 1 } }
}

const notesState = {
  prevState: Notes,
  newState: Notes
}

const pageReducer = (state = initPageState, action) => {
  switch (action.type) {
    case types.CHANGE_BACKGROUND:
      return { ...state, backgroundColor: action.payload }
    default:
      return { ...state }
  }
}

const notesReducer = (state = notesState, action) => {
  let notes = []
  switch (action.type) {
    case types.ADD_NOTE:
      notes = deepClone(state.prevState)
      notes.unshift({ id: uuidv4(), ...action.payload })
      return { prevState: notes, newState: notes }
    case types.CHANGE_NOTE:
      notes = deepClone(state.prevState)
      const index = notes.findIndex(note => note.id === action.payload.id)
      notes[index] = action.payload
      return { prevState: notes, newState: notes }
    case types.CHANGE_SEARCH_TEXT:
      const { text, pinned, archived } = action.payload
      notes = deepClone(state.prevState)
      if (!text && !pinned && !archived) {
        return { prevState: notes, newState: notes }
      }
      if (text) {
        notes = notes.filter(note => {
          if (
            note.title.toLowerCase().includes(text) ||
            note.description.toLowerCase().includes(text)
          ) {
            return true
          }
        })
      }
      if (notes.length && pinned && archived) {
        notes = notes.filter(note => {
          if (note.pinned && note.archived) {
            return true
          }
        })
      }
      if (notes.length && pinned && !archived) {
        notes = notes.filter(note => {
          if (note.pinned && !note.archived) {
            return true
          }
        })
      }
      if (notes.length && archived && !pinned) {
        notes = notes.filter(note => {
          if (note.archived && !note.pinned) {
            return true
          }
        })
      }
      if (notes.length && !archived && !pinned) {
        notes = notes.filter(note => {
          if (!note.archived && !note.pinned) {
            return true
          }
        })
      }
      return { ...state, newState: notes }
    default:
      return { ...state }
  }
}

export default combineReducers({
  pageState: pageReducer,
  notesState: notesReducer
})
