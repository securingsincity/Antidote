import { call, put } from 'redux-saga/effects'
import VerifyPhoneNumberActions from '../Redux/ProfileRedux'
import { login } from '../Services/antidoteServer'
// attempts to verify account info
export function * verify ({ phoneNumber, verificationCode }) {
  if (verificationCode === '') {
    // dispatch failure
    yield put(VerifyPhoneNumberActions.verifyFailure('Need a valid code'))
  } else {
    var result = yield call(login, phoneNumber, verificationCode)
    if (result.ok && result.data.success) {
      return yield put(VerifyPhoneNumberActions.verifySuccess(phoneNumber, result.data.access_token, result.data.user))
    }
    return yield put(VerifyPhoneNumberActions.verifyFailure('WRONG'))
  }
}
