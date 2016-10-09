import test from 'ava'
import React from 'react'
import { LoginScreen } from '../../App/Containers/LoginScreen'
import { shallow } from 'enzyme'
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

// test('Has text and set properly', t => {
//   t.is(wrapper.containsMatchingElement(<Text>HOWDY</Text>), true)
// })

// test('Has Icon and set properly', t => {
//   // default
//   t.is(wrapper.containsMatchingElement(<Icon name='ios-alert' />), true)

//   // custom
//   const custom = shallow(<LoginScreen onPress={() => {}} title='howdy' icon='test' />)
//   t.is(custom.containsMatchingElement(<Icon name='test' />), true)
// })

// test('style props are passed to top view', t => {
//   const withStyle = shallow(<LoginScreen title='howdy' style={{color: 'red'}} />)
//   t.is(withStyle.props().style[1].color, 'red')
// })

// test('show false', t => {
//   const hidden = shallow(<LoginScreen title='howdy' show={false} />)
//   t.is(hidden.children().length, 0)
// })
