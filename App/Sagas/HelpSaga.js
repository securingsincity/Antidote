import {call, put} from 'redux-saga/effects'
import HelpActions from '../Redux/HelpRedux'
import { getAddress, sendAlert } from '../Services/antidoteServer'


const errorMsg = 'Failed to get address';
const alertErrorMessage = 'Failed to send alert';
export function * addressLookup({lat, long}) {
    if (!lat || !long) {
        yield put(HelpActions.locationFailure(errorMsg))
    } else {
        var result = yield call(getAddress, lat, long)
        if (result.ok && result.data.success) {
            yield put(HelpActions.locationSuccess(result.data.address, lat, long))
        } else {
            yield put(HelpActions.locationFailure(errorMsg));
        }
    }
}

export function * createAlert({body}) {
    if (!body.phoneNumber) {
        yield put(HelpActions.alertFailure(alertErrorMessage))
    } else {
        var result = yield call(sendAlert, body);
        if (result.ok && result.data.result !== 'no users found') {
            yield put(HelpActions.alertSuccess(result.data.result))
        } else {
            yield put(HelpActions.alertFailure(alertErrorMessage))
        }
    }
}