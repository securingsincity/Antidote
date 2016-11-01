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
import HelpActions from '../Redux/HelpRedux'
import Styles from './Styles/ResponderCurrentlyAvailableStyle'
import {Images, Metrics, Colors} from '../Themes'
import HeaderBar from '../Components/HeaderBar'
import CalloutBox from '../Components/CalloutBox'
import ProfileActions from '../Redux/ProfileRedux'
// import ProfileActions from '../Redux/ProfileRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

class ResponderCurrentlyAvailable extends Component {
    constructor (props) {
        console.log({props})
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
        const addressSplit = this.props.address.split(',')
           return (
            <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: Metrics.screenHeight, width: Metrics.screenWidth}]}>
                <HeaderBar title={"LOCATION"} screenWidth={screenWidth}/>
                <CalloutBox textAlign={'left'}>
                    {addressSplit[0]},{"\n"}
                    {addressSplit[1]},{"\n"}
                    {addressSplit[2]}
                </CalloutBox>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginBottom: 150,
                }}>
                    <TouchableOpacity
                        onPress={this.setAvailable}
                        style={[Styles.button, Styles.primaryButton]}
                    >
                        <Text style={[Styles.buttonText, Styles.primaryButtonText]}>I CAN CURRENTLY RESPOND</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.setUnavailable}
                        style={[Styles.button]}
                    >
                        <Text style={[Styles.buttonText]}>I'M NOT AVAILABLE RIGHT NOW</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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
        address: state.help.address
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponderCurrentlyAvailable)