import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import signUp from '../Services/antidoteServer'
// attempts to login
export function * login ({ phoneNumber }) {
  if (phoneNumber === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    var result = yield call(signUp, phoneNumber)
    if (result.ok) {
      return yield put(LoginActions.loginSuccess(phoneNumber))
    }
    return yield put(LoginActions.loginFailure('WRONG'))
  }
}
