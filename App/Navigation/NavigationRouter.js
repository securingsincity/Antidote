import React, { Component } from 'react'
import { Scene, Router, ActionConst } from 'react-native-router-flux'
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
import RequestHelp  from '../Containers/RequestHelp'
import ResponderOnMyWay  from '../Containers/ResponderOnMyWay'
import ResponderCurrentlyAvailable from '../Containers/ResponderCurrentlyAvailable'
class NavigationRouter extends Component {
  render () {
    return (
      <Router navigationBarStyle={[Styles.navBar]}>
        <Scene key="root">
          <Scene initial hideNavBar key='login' component={LoginScreen} title='Antidote' subTitle='Login'  />
          <Scene hideNavBar key='verify' component={VerifyPhoneNumberScreen} title='Verify Your Phone Number' />
          <Scene key='welcome' component={ResponderWelcomeScreen} title='Antidote' titleStyle={Styles.title} />
        </Scene>
        <Scene key='responderOnMyWay'  component={ResponderOnMyWay}  role="responder" title='Antidote' renderLeftButton={NavItems.call911}   type={ActionConst.REPLACE} />
        <Scene key='responder' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene key='responderHome' initial component={ResponderMapView} title='Antidote' renderLeftButton={NavItems.hamburgerButton}   />
            <Scene key='profile' component={Profile} title='Profile' renderLeftButton={NavItems.hamburgerButton}  />
            <Scene key='responderRequestHelp' component={RequestHelp} role="responder" title='Antidote' renderLeftButton={NavItems.call911}   type={ActionConst.REPLACE} />
            <Scene key='responderCurrentlyAvailable' component={ResponderCurrentlyAvailable} role="responder" title='Antidote' renderLeftButton={NavItems.call911}   type={ActionConst.REPLACE} />
          </Scene>
        </Scene>
        <Scene key='needsHelp'>
          <Scene key='home' initial component={HelpMap} title='Antidote' renderLeftButton={NavItems.call911}   />
          <Scene key='requestHelp'  component={RequestHelp}  role="needsHelp" title='Antidote' renderLeftButton={NavItems.call911} type={ActionConst.REPLACE}  />
          
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
