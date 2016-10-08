import { call, put } from 'redux-saga/effects'
import VerifyPhoneNumberActions from '../Redux/VerifyPhoneNumberRedux'
import { login } from '../Services/antidoteServer'
// attempts to verify account info
export function * verify ({ phoneNumber, verificationCode }) {
  if (verificationCode === '') {
    // dispatch failure
    yield put(VerifyPhoneNumberActions.verifyFailure('Need a valid code'))
  } else {
    var result = yield call(login, phoneNumber, verificationCode)
    console.log('fooboobaz', result)
    if (result.ok) {
      return yield put(VerifyPhoneNumberActions.verifySuccess(phoneNumber))
    }
    return yield put(VerifyPhoneNumberActions.verifyFailure('WRONG'))
  }
}
