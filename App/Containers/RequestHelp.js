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
import {Images, Metrics} from '../Themes'
import HeaderBar from '../Components/HeaderBar'
import CalloutBox from '../Components/CalloutBox'
// import ProfileActions from '../Redux/ProfileRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

class RequestHelp extends Component {
    constructor (props) {
        super(props);
        this.cancelRequest = this.cancelRequest.bind(this);
    }
    cancelRequest() {
        if (this.props.role === 'responder') {
            NavigationActions.responderHome({type: "reset"});
        } else if(this.props.role === 'needsHelp') {
            NavigationActions.home({type: "reset"});
        }
    }
    render() {
        const screenWidth = Metrics.screenWidth;
        return (
            <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: Metrics.screenHeight, width: Metrics.screenWidth}]}>
                <HeaderBar title={"Alert"} screenWidth={screenWidth}/>
                <CalloutBox>{"Requesting\n Help".toUpperCase()}</CalloutBox>
                <View style={[Styles.row, {marginLeft: 30}]}>
                    <Text style={{
                        fontSize: 18,
                        textAlign: "left"
                    }}>We are requesting help.</Text>
                    <Text style={{
                        fontSize: 18,
                        textAlign: "left"
                    }}>You're location is set to:</Text>
                </View>
                <View style={[Styles.row, {marginLeft: 30}]}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        textAlign: "left"
                    }}>{this.props.address}</Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        textAlign: "left"
                    }}>{this.props.phoneNumber}</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginBottom: 20,
                }}>
                    <TouchableOpacity onPress={this.cancelRequest}>
                        <Text style={{
                        fontSize: 14,
                        textAlign: "center"
                    }}>CANCEL REQUEST</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        address: state.help.address,
        lat: state.help.lat,
        long: state.help.long,
        phoneNumber: state.login.phoneNumber
    }
}

const  mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RequestHelp)