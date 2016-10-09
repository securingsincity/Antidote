import apisauce from 'apisauce'

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
  return api.post('/users', { phoneNumber })
}

export const login = (phoneNumber, verificationCode) => {
  return api.post('/login', {phoneNumber, verificationCode})
}

