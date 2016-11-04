import React, { Component } from 'react'
import { View, StatusBar, Linking } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import FCM from 'react-native-fcm';
// import './Config/PushConfig'

// Styles
import Styles from './Styles/RootContainerStyle'

class RootContainer extends Component {

  handleDeepLink(e) {
    const route = e.url.replace(/.*?:\/\//g, "");
    console.log(route);
  }
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    Linking.addEventListener('url', this.handleDeepLink);
  }
  
  componentWillUnmount() {
    // prevent leaking
    // this.refreshUnsubscribe();
    // this.notificationUnsubscribe();
    Linking.removeEventListener('url', this.handleDeepLink);
  }


  render () {
    return (
      <View style={Styles.applicationView}>
        <StatusBar 
          barStyle='default' 
          style={[Styles.statusBar]} />
        <NavigationRouter />
      </View>
    )
  }
}

const mapStateToDispatch = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapStateToDispatch)(RootContainer)
