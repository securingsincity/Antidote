import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['phoneNumber'],
  loginRequestNeedHelp: ['phoneNumber'],
  loginSuccess: ['phoneNumber', 'token'],
  loginFailure: ['error'],
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  phoneNumber: null,
  error: null,
  fetching: false,
  token: null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = state => state.merge({ fetching: true })

export const requestNeedHelp = (state, extras) => {
  return state.merge({ fetching: false, phoneNumber: extras.phoneNumber })
}

// we've successfully logged in
export const success = (state, { phoneNumber }) =>
  state.merge({ fetching: false, error: null, phoneNumber })

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

// we've logged out
export const logout = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_REQUEST_NEED_HELP]: requestNeedHelp,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = loginState => loginState.phoneNumber !== null
