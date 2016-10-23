import React from 'react'
import { TouchableOpacity, Text, Linking } from 'react-native'
import styles from './Styles/NavItemsStyle'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics } from '../Themes'

const openDrawer = () => {
  NavigationActions.refresh({
    key: 'drawer',
    open: true
  })
}

const openCall911 = () => {
  const url ="tel:16318335568";
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + url);
    } else {
      return Linking.openURL(url);
    }
  })
  .catch(err => console.error('An error occurred', err));
}

export default {
  backButton () {
    return (
      <TouchableOpacity onPress={NavigationActions.pop}>
        <Icon name='angle-left'
          size={Metrics.icons.medium}
          color={Colors.coal}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },
  call911 () {
    return (
      <TouchableOpacity onPress={openCall911}>
        <Text name='angle-left'
          size={Metrics.icons.medium}
          color={Colors.coal}
          style={styles.navButtonLeft}
        >Call 911</Text>
      </TouchableOpacity>
    )
  },

  hamburgerButton () {
    return (
      <TouchableOpacity onPress={openDrawer}>
        <Icon name='bars'
          size={Metrics.icons.medium}
          color={Colors.coal}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  }

}
