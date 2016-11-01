import { call, put } from 'redux-saga/effects'
import ProfileActions from '../Redux/ProfileRedux'
import { login, updateProfile } from '../Services/antidoteServer'
// attempts to verify account info
export function * verify ({ phoneNumber, verificationCode }) {
  if (verificationCode === '') {
    // dispatch failure
    yield put(ProfileActions.verifyFailure('Need a valid code'))
  } else {
    var result = yield call(login, phoneNumber, verificationCode)
    if (result.ok && result.data.success) {
      yield put(ProfileActions.verifySuccess(`+1${phoneNumber}`, result.data.access_token, result.data.user))
    } else {
      yield put(ProfileActions.verifyFailure('WRONG'))
    }
  }
}

export function * updateProfileSaga({ user }) {
  if (!user.phoneNumber) {
    yield put(ProfileActions.updateProfileFailure('No phone number provided to update the user of'))
  } else {
    var result = yield call(updateProfile, user);
    if (result.ok && result.data.success) {
      yield put(ProfileActions.updateProfileSuccess(result.data.user))
    } else {
      yield put(ProfileActions.updateProfileFailure('Unable to update user'));
    }
  }
}