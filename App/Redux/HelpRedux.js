import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
    locationRequest: ['lat','long'],
    locationSuccess: ['address', 'lat','long'],
    locationFailure: ['error'],
})

export const HelpTypes = Types
export default Creators
export const INITIAL_STATE = Immutable({
    lat:0,
    long: 0,
    address:'', 
    error: null,
})

export const locationRequest = state => state.merge({fetching: true})

export const locationSuccess = (state, {address, lat, long}) => 
    state.merge({fetching: false, error: null, address, lat,long})

export const failure = (state, {error}) => state.merge({fetching: false, error})


export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOCATION_REQUEST]: locationRequest,
    [Types.LOCATION_SUCCESS]: locationSuccess,
    [Types.LOCATION_FAILURE]: failure,
})