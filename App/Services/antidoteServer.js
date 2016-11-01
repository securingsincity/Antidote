import apisauce from 'apisauce'
import { coercePhoneNumber } from './utils'
const baseURL = 'https://antidote-staging.herokuapp.com/'
const timeout = 10 * 1000

const api = apisauce.create({
  baseURL,
  timeout,
  headers: {
    'Cache-Control': 'no-cache'
  }
})

export default function (phoneNumber) {
  const coercedNumber = coercePhoneNumber(phoneNumber)
  return api.post('/users', { phoneNumber: coercedNumber })
}

export const updateProfile = (user) => {
  const phoneNumber = user.phoneNumber.slice(2,user.phoneNumber.length);
  console.log('address',`/users/${phoneNumber}?accessToken=${user.token}`)
  console.log('user',user)
  return api.post(`/users/${phoneNumber}?accessToken=${user.token}`, user)
}

export const login = (phoneNumber, verificationCode) => {
  return api.post('/login', {phoneNumber: `+1${phoneNumber}`, verificationCode})
}


export const getAddress = (lat, long) => {
  return api.post('/alerts/geocode', {lat, long})
}

