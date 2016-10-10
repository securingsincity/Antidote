import test from 'ava'
import React from 'react'
import * as LoginScreenComponent from '../../App/Containers/LoginScreen'
import { shallow } from 'enzyme'
import { Text } from 'react-native'
import * as sinon from 'sinon'
// import * as Actions from 'react-native-router-flux'

const LoginScreen = LoginScreenComponent.LoginScreen
const wrapper = shallow(<LoginScreen />)

test('component exists', t => {
  t.is(wrapper.length, 1)
})

test('component structure', t => {
  t.is(wrapper.name(), 'ScrollView')
  t.is(wrapper.children().length, 3)
  t.is(wrapper.childAt(0).name(), 'Image')
  t.is(wrapper.childAt(1).name(), 'Text')
  t.is(wrapper.childAt(2).name(), 'View')

  const form = wrapper.childAt(2)
  t.is(form.children().length, 2)

  const phoneNumberInputRow = form.childAt(0)
  t.is(phoneNumberInputRow.name(), 'View')
  t.true(phoneNumberInputRow.contains('Phone Number'))
  t.is(phoneNumberInputRow.childAt(0).name(), 'Text')

  const buttons = form.childAt(1)
  t.is(buttons.name(), 'View')

  const firstButton = buttons.childAt(0)
  t.is(firstButton.name(), 'TouchableOpacity')
  t.true(firstButton.contains('I Carry Naloxone'))

  const secondButton = buttons.childAt(1)
  t.is(secondButton.name(), 'TouchableOpacity')
  t.true(secondButton.contains('I Need Help'))
})

test('sets errors from the props', t => {
  const wrapper = shallow(<LoginScreen error='FOOBAR ERROR TEXT' />)
  t.is(wrapper.containsMatchingElement(<Text>FOOBAR ERROR TEXT</Text>), true)
})

test('attempts to login', t => {
  const attemptLoginFn = sinon.stub()
  const wrapper = shallow(<LoginScreen attemptLogin={attemptLoginFn} error='FOOBAR ERROR TEXT' />)
  const form = wrapper.childAt(2)
  const buttons = form.childAt(1)
  const firstButton = buttons.childAt(0)
  firstButton.simulate('press')
  t.true(attemptLoginFn.called)
})

// TODO: Figure out how to work with routing.
// test('direct the user to the verify page of successful login', t => {
//   const ActionsSpy = sinon.stub(Actions, 'verify')
//   const wrapper = shallow(<LoginScreen />)
//   wrapper.setState({ isAttemptingLogin: true})
//   wrapper.setProps({ fetching: false, error: false})
//   console.log(ActionsSpy)
//   t.true(ActionsSpy.called)

// })
