import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
    locationRequest: ['lat','long'],
    locationSuccess: ['address', 'lat','long'],
    locationFailure: ['error'],
    alertRequest: ['body'],
    alertFetch: [],
    alertSuccess: ['alert'],
    alertFailure: ['error'],
})

export const HelpTypes = Types
export default Creators
export const INITIAL_STATE = Immutable({
    lat:0,
    long: 0,
    address:'', 
    alert: {},
    error: null,
})

export const locationRequest = state => state.merge({fetching: true})

export const locationSuccess = (state, {address, lat, long}) => 
    state.merge({fetching: false, error: null, address, lat,long})

export const failure = (state, {error}) => state.merge({fetching: false, error})

export const alertRequest = state =>  state.merge({fetching: true})


export const alertSuccess = (state, {alert}) => 
    state.merge({fetching: false, error: null, alert})


export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOCATION_REQUEST]: locationRequest,
    [Types.LOCATION_SUCCESS]: locationSuccess,
    [Types.ALERT_REQUEST]: alertRequest,
    [Types.ALERT_FETCH]: alertRequest,
    [Types.ALERT_SUCCESS]: alertSuccess,
    [Types.ALERT_FAILURE]: failure,

})