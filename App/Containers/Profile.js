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
import ProfileActions from '../Redux/ProfileRedux'

export class Profile extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      licensePlate: '',
      name: '',
      visibleHeight: Metrics.screenHeight,
      licensePlateEditMode: false,
      nameEditMode: false,
      topLogo: { width: Metrics.screenWidth }
    }
    this.isAttemptingLogin = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
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

  updateUser = () => {
    const { licensePlate, name, nameEditMode, licensePlateEditMode } = this.state
    let updatedUser = this.props.profile.user;
    if (nameEditMode) {
      updatedUser = updatedUser.merge({name});
    }
    if (licensePlateEditMode) {
      updatedUser = updatedUser.merge({licensePlate});
    }
    this.props.updateProfile(updatedUser)
  }

  handleChangeLicensePlate = licensePlate => {
    this.setState({ licensePlate,licensePlateEditMode: true })
  }

  handleChangeName = name => {
    this.setState({ name, nameEditMode: true })
  }

  render () {
    let { name, licensePlate, nameEditMode, licensePlateEditMode} = this.state
    if (!name && !nameEditMode) {
      name = this.props.name
    }
    if (!licensePlate && !licensePlateEditMode) {
      licensePlate = this.props.licensePlate
    }
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
              defaultValue={this.props.name}
              editable={editable}
              returnKeyType='next'r
              onChangeText={this.handleChangeName}
              underlineColorAndroid='transparent'
              placeholder={'John Smith'} />
            <Text style={Styles.rowLabel}>Phone Number</Text>
            <TextInput
              ref='phoneNumber'
              style={textInputStyle}
              value={licensePlate}
              editable={editable}
              returnKeyType='next'
              onChangeText={this.handleChangeLicensePlate}
              underlineColorAndroid='transparent'
              placeholder={'GFB-1212'} />
          </View>

          <View style={[Styles.loginRow]}>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.updateUser}>
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
    error: state.profile.error,
    profile: state.profile,
    name: state.profile.user.name,
    make: state.profile.user.make,
    model: state.profile.user.model,
    licensePlate: state.profile.user.licensePlate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (user) => dispatch(ProfileActions.updateProfileRequest(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
