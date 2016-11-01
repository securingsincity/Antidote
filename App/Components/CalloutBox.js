import React, {Component} from 'react';
import {Text, View } from 'react-native';
class CalloutBox extends Component {
    render() {
        return (
        <View style={{
                borderWidth: 1,
                borderColor: "#000000",
                alignItems:"center",
                padding: 20,
                margin: 40,
            }}>
                <Text style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#000000"
                }}>{this.props.children}</Text>
            </View>
        );
    }
}

export default CalloutBox;