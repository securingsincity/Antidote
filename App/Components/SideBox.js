import React, {Component} from 'react';
import {
  View,
} from 'react-native'
class SideBox extends Component {
    render() {
        const widthInTenths = (this.props.width/10)
        return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: widthInTenths * 2}}/>
            <View style={{borderTopWidth: 1, borderTopColor: '#000000', width: widthInTenths * 6 }} />
            <View style={{width: widthInTenths * 2}}/>
        </View>
        )
    }
}

export default SideBox;