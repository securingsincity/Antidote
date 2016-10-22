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

class WelcomeScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
  }

  handlePressSetupProfile() {
    NavigationActions.mapviewExample() 
  }


  sideBox(defaultWidth) {
    const widthInTenths = (defaultWidth/10)
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: widthInTenths * 2}}/>
        <View style={{borderTopWidth: 1, borderTopColor: '#000000', width: widthInTenths * 6 }} />
        <View style={{width: widthInTenths * 2}}/>
      </View>
      )
  }

  welcomeBar() {
    const screenWidthIn12 = (Metrics.screenWidth/12)
    return  ( 
      <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 70}}>
        {this.sideBox(screenWidthIn12*5)} 
        <View style={{width: screenWidthIn12*2}}>
          <Text style={{textAlign: 'center', fontWeight: '600'}}>Welcome</Text><View />
        </View>
        {this.sideBox(screenWidthIn12*5)} 
      </View>
    )
  }

  render () {
    const screenWidth = Metrics.screenWidth
    
    return (
      <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: Metrics.screenHeight, width: Metrics.screenWidth}]}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>ANTIDOTE</Text>
        
        {this.welcomeBar()}
        
        <View style={Styles.row}>
          <Text style={Styles.row}>Welcome to Antidote, Thanks for signing up.  Please set up your profile so you can begin helping</Text>
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
