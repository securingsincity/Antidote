import React, {PropTypes, Component} from 'react'
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
import Styles from './Styles/LoginScreenStyle'
import {Images, Metrics, Colors} from '../Themes'
import HeaderBar from '../Components/HeaderBar'
import CalloutBox from '../Components/CalloutBox'
import ProfileActions from '../Redux/ProfileRedux'
// import ProfileActions from '../Redux/ProfileRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

class ResponderCurrentlyAvailable extends Component {
    constructor (props) {
        super(props);
        this.setAvailable = this.setAvailable.bind(this);
        this.setUnavailable = this.setUnavailable.bind(this);
    }
    setAvailable() {
        const user = this.props.profile.user.merge({available: true});
        this.props.updateProfile(user);
        NavigationActions.responderHome({type: "reset"});
    }
    
    setUnavailable() {
        const user = this.props.profile.user.merge({available: false});
        this.props.updateProfile(user);
        NavigationActions.responderHome({type: "reset"});
    }
    render() {
        const location = 'Roxbury, MA \n 02119'
        const screenWidth = Metrics.screenWidth;
           return (
            <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: Metrics.screenHeight, width: Metrics.screenWidth}]}>
                <HeaderBar title={"Alert"} screenWidth={screenWidth}/>
                <CalloutBox>{'Are you available?'}</CalloutBox>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginBottom: 20,
                }}>
                    <TouchableOpacity
                        onPress={this.setAvailable}
                        style={[style.button, style.primaryButton]}
                    >
                        <Text style={[style.buttonText, style.primaryButtonText]}>I CAN CURRENTLY RESPOND</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.setUnavailable}
                        style={[style.button]}
                    >
                        <Text style={[style.buttonText]}>I'M NOT AVAILABLE RIGHT NOW</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const style = {
    button: {
        width: 300,
        paddingHorizontal: 12,
        paddingVertical: 15,
        alignItems: 'center',
        margin: 10,
        backgroundColor: Colors.steel,
    },
    buttonText: {
        color: Colors.coal,    
        fontSize: 16
    },
    primaryButton: {
        backgroundColor: Colors.green,
    },
    primaryButtonText: {
        color: Colors.white,
    }


}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (user) => {
            dispatch(ProfileActions.updateProfileRequest(user))
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        profile: state.profile,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponderCurrentlyAvailable)