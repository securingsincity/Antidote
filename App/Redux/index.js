import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer,
    profile: require('./ProfileRedux').reducer,
    help: require('./HelpRedux').reducer,
  })

  return configureStore(rootReducer, rootSaga)
}
