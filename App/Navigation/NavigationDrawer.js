import React, { PropTypes, Component } from 'react'
import Drawer from 'react-native-drawer'
import { DefaultRenderer, Actions as NavigationActions } from 'react-native-router-flux'
import DrawerContent from '../Containers/DrawerContent'
import { connect } from 'react-redux'
import Styles from './Styles/NavigationDrawerStyle'
import ProfileActions from '../Redux/ProfileRedux'

/* *******************
* Documentation: https://github.com/root-two/react-native-drawer
********************/

class NavigationDrawer extends Component {
  
  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    const alreadyLoggedIn = newProps.loggedInUser

    if (!alreadyLoggedIn) {
      NavigationActions.root();
    }
    
  }

  render () {
    const state = this.props.navigationState
    const children = state.children
    return (
      <Drawer
        ref='navigation'
        type='static'
        open={state.open}
        onOpen={() => NavigationActions.refresh({key: state.key, open: true})}
        onClose={() => NavigationActions.refresh({key: state.key, open: false})}
        content={<DrawerContent  logout={this.props.logout} />}
        styles={Styles}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={(ratio) => ({
          main: { opacity: Math.max(0.54, 1 - ratio) }
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    )
  }
}

NavigationDrawer.propTypes = {
  navigationState: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.profile.phoneNumber
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(ProfileActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)
