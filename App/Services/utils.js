export const coercePhoneNumber = phoneNumber => {
  if (phoneNumber.length < 10) throw new Error('Phone Number not long enough')

  const includesCountryCode = (/(\+1)([\d]){10}/).test(phoneNumber)
  const noCountryCode = (/^([\d]){10}$/).test(phoneNumber)
  if (includesCountryCode) return phoneNumber
  if (noCountryCode) return `+1${phoneNumber}`

  return phoneNumber
}
