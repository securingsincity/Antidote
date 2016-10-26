import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
// screens we are actually using
import LoginScreen from '../Containers/LoginScreen'
import VerifyPhoneNumberScreen from '../Containers/VerifyPhoneNumberScreen'
import ResponderWelcomeScreen from '../Containers/ResponderWelcomeScreen'
import Profile from '../Containers/Profile'
import HelpMap from '../Containers/HelpMap'
import ResponderMapView from '../Containers/ResponderMapView'

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key="root">
          <Scene initial key='login' component={LoginScreen} title='Antidote' subTitle='Login'  />
          <Scene key='verify' component={VerifyPhoneNumberScreen} title='Verify Your Phone Number' />
          <Scene key='welcome' component={ResponderWelcomeScreen} title='Welcome' />
        </Scene>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene key='responderHome' initial component={ResponderMapView} title='Antidote' renderLeftButton={NavItems.hamburgerButton}   />
            <Scene key='profile' component={Profile} title='Profile' renderLeftButton={NavItems.hamburgerButton}  />
          </Scene>
        </Scene>
        <Scene key='needsHelp'>
          <Scene key='home' initial component={HelpMap} title='Antidote' renderLeftButton={NavItems.call911}   />
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
