import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {FontAwesome, Entypo} from '@expo/vector-icons'
import { purple, gray } from '../utils/colors'
import { color } from 'react-native-reanimated'

export default class UdacitySteppers extends Component {
    render() {
        const {max, unit, step, value, onIncrement, onDecrement} = this.props
        return (
            <View style={[styles.row]}>
                <TouchableOpacity onPress={onDecrement} style={styles.bttn}>
                    <FontAwesome name='minus' size={38} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={onIncrement} style={styles.bttn}>
                    <FontAwesome name='plus' size={38} color='white' />
                </TouchableOpacity>
                <View style={styles.score}>
                    <Text style={{fontSize:24}}>{value}</Text>
                    <Text style={{fontSize:18, color: gray}}>{unit}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: "space-between"
    },
    score: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto'
    },
    bttn: {
        margin: 5,
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
    }
})
