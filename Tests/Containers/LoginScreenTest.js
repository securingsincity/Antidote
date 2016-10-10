import test from 'ava'
import React from 'react'
import * as LoginScreenComponent from '../../App/Containers/LoginScreen'
import { shallow } from 'enzyme'
import { Text } from 'react-native'
import * as sinon from 'sinon'
import { Actions as NavigationActions } from 'react-native-router-flux'

const {LoginScreen} = LoginScreenComponent
let wrapper
test.beforeEach(t => wrapper = shallow(<LoginScreen />))

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
  wrapper.setProps({error: 'FOOBAR ERROR TEXT'})
  t.true(wrapper.containsMatchingElement(<Text>FOOBAR ERROR TEXT</Text>))
})

test('attempts to login', t => {
  const attemptLogin = sinon.stub()
  wrapper.setProps({attemptLogin})
  const form = wrapper.childAt(2)
  const buttons = form.childAt(1)
  const firstButton = buttons.childAt(0)
  t.false(attemptLogin.called)
  firstButton.simulate('press')
  t.true(attemptLogin.called)
})

test('direct the user to the verify page after successful login', t => {
  const VerifyStub = sinon.stub(NavigationActions, 'verify')
  const wrapper = shallow(<LoginScreen />)
  wrapper.setState({ isAttemptingLogin: true })
  wrapper.setProps({ fetching: false, error: false })
  t.true(VerifyStub.called)
})
