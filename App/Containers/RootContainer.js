import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
// import './Config/PushConfig'

import ReactNativeUA from 'react-native-ua'; // import <module></module>
// Styles
import styles from './Styles/RootContainerStyle'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

    ReactNativeUA.enable_notification(); // prompt user to enable notification

    ReactNativeUA.enable_geolocation(); // prompt user to enable geolocation

    ReactNativeUA.enable_action_url(); // enable url action

    ReactNativeUA.handle_background_notification(); // handle notifications when app is in background

    ReactNativeUA.add_tag('tag'); // set tag to the user

    ReactNativeUA.set_named_user_id('user_id'); // set named user id
  }

  componentWillMount() {
      // add handler to handle all incoming notifications
      ReactNativeUA.on_notification((notification) => {
          console.log('notification:',
                      notification.url, // if action url is disabled
                      notification.platform,
                      notification.event,
                      notification.alert,
                      notification.data);

          alert(notification.alert);
      });
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NavigationRouter />
      </View>
    )
  }
}

const mapStateToDispatch = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapStateToDispatch)(RootContainer)
