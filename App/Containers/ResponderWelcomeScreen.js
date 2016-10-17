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
import VerifyActions from '../Redux/VerifyPhoneNumberRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

class WelcomeScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
  }

  handlePressLogin() {
    NavigationActions.mapviewExample() 
  }

  render () {
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: this.state.visibleHeight}]}>
        <View style={Styles.form}>
          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>Welcome</Text>
            <Text style={Styles.row}>Welcome to Antidote, Thanks for signing up.  Please set up your profile so you can begin helping</Text>
          </View>

          <View style={[Styles.loginRow]}>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>SET UP PROFILE</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>
    )
  }

}

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
