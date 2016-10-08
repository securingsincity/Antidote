import apisauce from 'apisauce'

const baseURL = 'http://localhost:9002'

const api = apisauce.create({
    // base URL is read from the "constructor"
  baseURL,
    // here are some default headers
  headers: {
    'Cache-Control': 'no-cache'
  },
    // 10 second timeout...
  timeout: 10000
})

export default function (phoneNumber) {
  console.log(phoneNumber)
  return api.post('/users', { phoneNumber })
}

export const login = (phoneNumber, verificationCode) => {
  return api.post('/login', {phoneNumber, verificationCode})
}

