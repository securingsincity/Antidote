import React, {PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyle'
import {Images, Metrics} from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

export class LoginScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      phoneNumber: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth },
      isAttemptingLogin: false
    }
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    const loginComplete = this.state.isAttemptingLogin && !newProps.fetching && !newProps.error
    if (loginComplete) {
      NavigationActions.verify()
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handlePressLogin = () => {
    const { phoneNumber } = this.state
    this.setState({isAttemptingLogin: true})
    this.props.attemptLogin(phoneNumber)
  }

  handleChangePhoneNumber = phoneNumber => {
    this.setState({ phoneNumber })
  }
  handlePressINeedHelp =  () => {
    // const { phoneNumber } = this.state
    // this.setState({isAttemptingLogin: true})
    NavigationActions.needsHelp()
  }
  render () {
    const { phoneNumber } = this.state
    const { fetching, error } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]}>
        <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
        <View style={[Styles.form, { borderWidth: 1, borderColor: 'black', borderRadius: 0 }]}>
          <View style={Styles.row} id='phone-number-input-row'>
            <Text style={Styles.rowLabel}>Phone Number</Text>
            <TextInput
              ref='phoneNumber'
              style={textInputStyle}
              value={phoneNumber}
              editable={editable}
              keyboardType='phone-pad'
              returnKeyType='next'
              onChangeText={this.handleChangePhoneNumber}
              underlineColorAndroid='transparent' />
          </View>

          <View style={[Styles.loginRow]}>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>I CARRY NALOXONE</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressINeedHelp}>
              <View style={Styles.loginButtonRight}>
                <Text style={Styles.loginText}>I NEED HELP</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[Styles.rowLabel, {paddingLeft: 20}]}>{error}</Text>

      </View>
    )
  }

}

LoginScreen.propTypes = {
  dispatch: PropTypes.func,
  fetching: PropTypes.bool,
  attemptLogin: PropTypes.func
}

const mapStateToProps = state => {
  return {
    fetching: state.login.fetching,
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (phoneNumber) => dispatch(LoginActions.loginRequest(phoneNumber))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)