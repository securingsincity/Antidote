import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
// import NavItems from './NavItems'
// screens we are actually using
import LoginScreen from '../Containers/LoginScreen'
import VerifyPhoneNumberScreen from '../Containers/VerifyPhoneNumberScreen'
import ResponderWelcomeScreen from '../Containers/ResponderWelcomeScreen'
import Profile from '../Containers/Profile'
import MapviewExample from '../Containers/MapviewExample'

// screens identified by the router
// import PresentationScreen from '../Containers/PresentationScreen'
// import AllComponentsScreen from '../Containers/AllComponentsScreen'
// import UsageExamplesScreen from '../Containers/UsageExamplesScreen'
// import ListviewExample from '../Containers/ListviewExample'
// import ListviewGridExample from '../Containers/ListviewGridExample'
// import ListviewSectionsExample from '../Containers/ListviewSectionsExample'
// import APITestingScreen from '../Containers/APITestingScreen'
// import ThemeScreen from '../Containers/ThemeScreen'
// import DeviceInfoScreen from '../Containers/DeviceInfoScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

// class NavigationRouter extends Component {
//   render () {
//     return (
//       <Router>
//         <Scene key='drawer' component={NavigationDrawer} open={false}>
//           <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
//             <Scene initial key='presentationScreen' component={PresentationScreen} title='Ignite' renderLeftButton={NavItems.hamburgerButton} />
//             <Scene key='componentExamples' component={AllComponentsScreen} title='Components' />
//             <Scene key='usageExamples' component={UsageExamplesScreen} title='Usage' rightTitle='Example' onRight={() => window.alert('Example Pressed')} />
//             <Scene key='login' component={LoginScreen} title='Login' hideNavBar />
//             <Scene key='listviewExample' component={ListviewExample} title='Listview Example' />
//             <Scene key='listviewGridExample' component={ListviewGridExample} title='Listview Grid' />
//             <Scene key='listviewSectionsExample' component={ListviewSectionsExample} title='Listview Sections' />
//             <Scene key='mapviewExample' component={MapviewExample} title='Mapview Example' />
//             <Scene key='apiTesting' component={APITestingScreen} title='API Testing' />
//             <Scene key='theme' component={ThemeScreen} title='Theme' />
//             <Scene key='deviceInfo' component={DeviceInfoScreen} title='Device Info' />
//           </Scene>
//         </Scene>
//       </Router>
//     )
//   }
// }

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene key='verify' component={VerifyPhoneNumberScreen} title='Verify Your Phone Number' hideNavBar />
            <Scene key='login' component={LoginScreen} title='Login' hideNavBar />
            <Scene initial key='welcome' component={ResponderWelcomeScreen} title='Welcome' hideNavBar />
            <Scene key='profile' component={Profile} title='Profile' hideNavBar />

            <Scene key='mapviewExample' component={MapviewExample} title='Mapview Example' />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
