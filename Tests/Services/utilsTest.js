import test from 'ava'
import { coercePhoneNumber } from '../../App/Services/utils'

test('coercePhoneNumber is a function', t => {
  t.true((typeof coercePhoneNumber === 'function'))
})

test('coercePhoneNumber does nothing to a phone number with us country code', t => {
  t.is(coercePhoneNumber('+17742510087'), '+17742510087')
})

test('coercePhoneNumber does nothing to a phone number with us country code', t => {
  t.is(coercePhoneNumber('7742510087'), '+17742510087')
})

test('coercePhoneNumber throws error when phone number is under 10 char', t => {
  t.throws(() => coercePhoneNumber('1'), 'Phone Number not long enough')
})
