import React, { Component } from 'react'
import {View, Slider, Text, StyleSheet} from 'react-native'
import {gray, purple} from '../utils/colors'

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    score: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto'
    },
})

export default class UdacitySlider extends Component {
    render() {
        const {max, unit, step, onChange, value} = this.props
        return (
            <View style={styles.row}>
                <Slider
                    style={{flex: 1}} 
                    thumbTintColor= {purple}
                    minimumTrackTintColor= {purple}
                    step={step}
                    maximumValue={max}
                    value={value}
                    minimumValue={0}
                    onValueChange={onChange}
                />
                <View style={styles.score}>
                    <Text style={{fontSize:24,}}>{value}</Text>
                    <Text style={{fontSize:18, color: gray}}>{unit}</Text>
                </View>
                
            </View>
        )
    }
}