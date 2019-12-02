import React, {createContext, useReducer} from 'react'
import { ActionTypes } from './actions'

const initialState = {
  loading: false,
  pullRequests: [],
  error: ''
}
const store = createContext(initialState)
const { Provider } = store

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case ActionTypes.START_LOADING:
        return { ...state, loading: true }
      case ActionTypes.ADD_PULL_REQUESTS:
        return { ...state, loading: false, pullRequests: action.pullRequests }
      case ActionTypes.SET_ERROR:
        console.log('HIT AN ERROR OH NO')
        return { ...state, error: action.error }
      default:
        return state
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }