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
import Styles from './Styles/WelcomeScreenStyle'
import {Images, Metrics, Colors} from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import HeaderBar from '../Components/HeaderBar'
class WelcomeScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
  }

  handlePressSetupProfile() {
    NavigationActions.responder({type: 'reset'}) 
  }


  render () {
    const screenWidth = Metrics.screenWidth
    
    return (
      <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: Metrics.screenHeight, width: Metrics.screenWidth}]}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>ANTIDOTE</Text>
        
        <HeaderBar title={"Welcome"} screenWidth={screenWidth}/>
        
        <View style={Styles.row}>
          <Text style={[Styles.row, {fontWeight: 'bold', fontSize: 18}]}>Welcome to Antidote,</Text>
          <Text style={Styles.row}>We appreciate your willingness to be a responder. This is a serious job, so don't take it lightly. You will literally be saving lives.</Text>
          <Text style={Styles.row}>Please set up some basic details in your account.</Text>
        </View>

        <View style={[Styles.loginRow]}>
          <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressSetupProfile}>
            <View style={Styles.loginButton}>
              <Text style={Styles.loginText}>SET UP PROFILE</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
