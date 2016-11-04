import React, { Component } from 'react'
import { ScrollView, Image, Alert, Text } from 'react-native'
import styles from './Styles/DrawerContentStyle'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import FCM from 'react-native-fcm';
class DrawerContent extends Component {

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressComponents = () => {
    this.toggleDrawer()
    NavigationActions.home()
  }

  handleProfile = () => {
    this.toggleDrawer()
    NavigationActions.profile()
  }


  handleLogout = () => {
    this.toggleDrawer()
    Alert.alert(
      'Logging out',
      'Are you sure you want to log out?',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {
          text: 'OK', 
          onPress: () => {
            this.props.logout();
            FCM.unsubscribeFromTopic('/topics/foo-bar');
            NavigationActions.login({type: 'reset'})  
          }
        },
      ]
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>ANTIDOTE</Text>
        <DrawerButton text='Home' onPress={this.handlePressComponents} />
        <DrawerButton text='Profile' onPress={this.handleProfile} />
        <DrawerButton text='Logout' onPress={this.handleLogout} />
      </ScrollView>
    )
  }

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}


export default DrawerContent