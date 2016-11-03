import {call, put} from 'redux-saga/effects'
import HelpActions from '../Redux/HelpRedux'
import { getAddress } from '../Services/antidoteServer'


const errorMsg = 'Failed to get address'
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
