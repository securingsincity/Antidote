import React, {Component} from 'react';
import {
  View,
} from 'react-native'
import { SideBoxStyle } from './Styles/HeaderBarStyle'

class SideBox extends Component {
    render() {
        const widthInTenths = (this.props.width/10)
        return (
        <View style={SideBoxStyle.container}>
            <View style={{width: widthInTenths * 2}}/>
            <View  width={widthInTenths * 6} style={SideBoxStyle.bar} />
            <View style={{width: widthInTenths * 2}}/>
        </View>
        )
    }
}

export default SideBox;