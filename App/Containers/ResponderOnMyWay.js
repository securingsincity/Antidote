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
// import ProfileActions from '../Redux/ProfileRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

class ResponderOnMyWay extends Component {
    constructor (props) {
        super(props);
        this.cancelRequest = this.cancelRequest.bind(this);
    }
    cancelRequest() {
        NavigationActions.responderHome({type: "reset"});
    }
    render() {
        const location = 'Roxbury, MA \n 02119'
        const screenWidth = Metrics.screenWidth;
           return (
            <View contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, {height: Metrics.screenHeight, width: Metrics.screenWidth}]}>
                <HeaderBar title={"Alert"} screenWidth={screenWidth}/>
                <CalloutBox>{location.toUpperCase()}</CalloutBox>
                <View style={[Styles.row, {marginLeft: 30}]}>
                    <Text style={{
                        fontSize: 18,
                        textAlign: "left",
                        fontWeight: "bold"
                    }}>Their Location:</Text>
                    <Text style={{
                        fontSize: 18,
                        textAlign: "left"
                    }}>{"4 Alyssa Court\nHolbrook NY 02141"}</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginBottom: 20,
                }}>
                    <TouchableOpacity
                        onPress={this.requestHelp}
                        style={[style.button, style.primaryButton]}
                    >
                        <Text style={[style.buttonText, style.primaryButtonText]}>I'M ON MY WAY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.cancelRequest}
                        style={[style.button]}
                    >
                        <Text style={[style.buttonText]}>OH NO! I CAN'T MAKE IT</Text>
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

const mapDispatchToProps = (state, ownProps) => {
    return {
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponderOnMyWay)