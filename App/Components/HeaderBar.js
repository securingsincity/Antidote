import React, {Component} from 'react';
import {
  View,
  Text,
} from 'react-native'
import SideBox from './SideBox'
import Styles from './Styles/HeaderBarStyle'


class HeaderBar extends Component {
    render() {
        const screenWidthIn12 = (this.props.screenWidth/12)
        return  ( 
        <View style={[Styles.container]}>
            <SideBox width={screenWidthIn12*5} />
            <View style={{width: screenWidthIn12*2}}>
                <Text style={[Styles.text]}>{this.props.title}</Text><View />
            </View>
            <SideBox width={screenWidthIn12*5} /> 
        </View>
        )
    }
}
export default HeaderBar;