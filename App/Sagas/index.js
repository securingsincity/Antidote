import { takeLatest } from 'redux-saga'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */
import { LoginTypes } from '../Redux/LoginRedux'
import { ProfileTypes } from '../Redux/ProfileRedux'
import { HelpTypes } from '../Redux/HelpRedux'

/* ------------- Sagas ------------- */

import { login } from './LoginSagas'
import { verify,updateProfileSaga  } from './ProfileSaga'
import { addressLookup, createAlert } from './HelpSaga'


/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(ProfileTypes.VERIFY_REQUEST, verify),
    takeLatest(ProfileTypes.UPDATE_PROFILE_REQUEST, updateProfileSaga),
    takeLatest(HelpTypes.LOCATION_REQUEST, addressLookup),
    takeLatest(HelpTypes.ALERT_REQUEST, createAlert),
    // takeLatest(HelpTypes.ALERT_FETCH, fetchAlert),
    // some sagas receive extra parameters in addition to an action
  ]
}
