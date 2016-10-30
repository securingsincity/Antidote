import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  verifyRequest: ['phoneNumber', 'verificationCode'],
  verifySuccess: ['phoneNumber', 'token', 'user'],
  verifyFailure: ['error'],
  updateProfileRequest: ['user'],
  updateProfileSuccess: ['user'],
  updateProfileFailure: ['error'],
  logout: null,
})

export const ProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  verificationCode: null,
  error: null,
  fetching: false,
  token: null,
  user: {},
})

/* ------------- Reducers ------------- */

export const request = state => state.merge({ fetching: true })

export const success = (state, { phoneNumber, token, user }) =>
  state.merge({ fetching: false, error: null, phoneNumber, token, user })


export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const empty = () => INITIAL_STATE


export const updateProfileSuccess =(state, {user}) => state.merge({user, fetching: false, error: null})
// we've logged out

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VERIFY_REQUEST]: request,
  [Types.VERIFY_SUCCESS]: success,
  [Types.VERIFY_FAILURE]: failure,
  [Types.UPDATE_PROFILE_REQUEST]: request,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_FAILURE]: failure,
  [Types.LOGOUT]: empty,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = loginState => loginState.phoneNumber !== null
