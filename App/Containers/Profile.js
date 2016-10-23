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
// import ProfileActions from '../Redux/ProfileRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

export class Profile extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      phoneNumber: '',
      name: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
    this.isAttemptingLogin = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    const loginComplete = this.isAttemptingLogin && !newProps.fetching && !newProps.error
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
    this.isAttemptingLogin = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.updateProfile(phoneNumber)
  }

  handleChangePhonenumber = phoneNumber => {
    this.setState({ phoneNumber })
  }

  handleChangeName = name => {
    this.setState({ name })
  }

  render () {
    const { phoneNumber, name } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]}>
        <Text style={Styles.rowLabel}>{this.props.error}</Text>
        <Text style={Styles.rowLabel}>Edit Profile</Text>
        <View style={Styles.form}>
          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>First Name</Text>
            <TextInput
              ref='name'
              style={textInputStyle}
              value={name}
              editable={editable}
              keyboardType='phone-pad'
              returnKeyType='next'r
              onChangeText={this.handleChangeName}
              underlineColorAndroid='transparent'
              placeholder={'John Smith'} />
            <Text style={Styles.rowLabel}>Phone Number</Text>
            <TextInput
              ref='phoneNumber'
              style={textInputStyle}
              value={phoneNumber}
              editable={editable}
              keyboardType='phone-pad'
              returnKeyType='next'
              onChangeText={this.handleChangePhonenumber}
              underlineColorAndroid='transparent'
              placeholder={'555-555-1111'} />
          </View>

          <View style={[Styles.loginRow]}>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    )
  }

}

Profile.propTypes = {
  dispatch: PropTypes.func,
  fetching: PropTypes.bool,
  updateProfile: PropTypes.func
}

const mapStateToProps = state => {
  return {
    fetching: state.profile.fetching,
    error: state.profile.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (phoneNumber, name) => dispatch(ProfileActions.profileRequest(phoneNumber, name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
