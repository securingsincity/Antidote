import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingTop: 70 
    },
    text: {
        textAlign: 'center', 
        fontWeight: '600',
        color: Colors.antidotePurple
    },
})

export const SideBoxStyle = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    bar: {
        borderTopWidth: 1, 
        borderTopColor: Colors.antidotePurple 
    }
})

