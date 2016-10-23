import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import signUp from '../Services/antidoteServer'
// attempts to login

const errorMsg = 'There was an error logging in, please check your phone number and try again.'

export function * login ({ phoneNumber }) {
  if (phoneNumber === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure(errorMsg))
  } else {
    var result = yield call(signUp, phoneNumber)
    if (result.ok) {
      yield put(LoginActions.loginSuccess(phoneNumber))
    }
    yield put(LoginActions.loginFailure(errorMsg))
  }
}
