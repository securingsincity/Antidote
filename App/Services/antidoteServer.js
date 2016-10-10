import apisauce from 'apisauce'
import { corercePhoneNumber } from './utils'
const baseURL = 'http://localhost:9002'
const timeout = 10 * 1000
const api = apisauce.create({
  baseURL,
  timeout,
  headers: {
    'Cache-Control': 'no-cache'
  }
})

export default function (phoneNumber) {
  const coercedNumber = corercePhoneNumber(phoneNumber)
  return api.post('/users', { phoneNumber: coercedNumber })
}

export const login = (phoneNumber, verificationCode) => {
  return api.post('/login', {phoneNumber, verificationCode})
}

