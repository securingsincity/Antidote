import React, {Component, PropTypes} from 'react'
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
import VerifyActions from '../Redux/ProfileRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

class VerifyPhoneNumberScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      verificationCode: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
    this.isAttempting = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching && !newProps.error) {
      NavigationActions.welcome()
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

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handlePressLogin = () => {
    const {verificationCode} = this.state
    const {phoneNumber} = this.props
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptVerify(phoneNumber, verificationCode)
  }

  handleChangeVerificationCode = (text) => {
    this.setState({ verificationCode: text })
  }

  render () {
    // const { username, password } = this.state
    const {verificationCode} = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]}>
        <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
        <Text style={Styles.rowLabel}>{this.props.error}</Text>
        <View style={Styles.form}>
          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Verification Code</Text>
            <TextInput
              ref='verificationCode'
              style={textInputStyle}
              defaultValue={verificationCode}
              editable={editable}
              keyboardType='phone-pad'
              returnKeyType='next'
              onChangeText={this.handleChangeVerificationCode}
              underlineColorAndroid='transparent'
              placeholder={'Verification Code'} />
          </View>

          <View style={[Styles.loginRow]}>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>Verify</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>
    )
  }

}

VerifyPhoneNumberScreen.propTypes = {
  dispatch: PropTypes.func,
  fetching: PropTypes.bool,
  attemptVerify: PropTypes.func
}

const mapStateToProps = state => {
  return {
    phoneNumber: state.login.phoneNumber,
    fetching: state.profile.fetching,
    error: state.profile.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptVerify: (phoneNumber, verificationCode) => dispatch(VerifyActions.verifyRequest(phoneNumber, verificationCode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneNumberScreen)
