import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {getMetricMetaInfo, timeToString, getDailyReminderValue,
clearLocalNotification,
setLocalNotification} from '../utils/helpers'
import UdacitySteppers from './UdacitySteppers'
import UdacitySlider from './UdacitySlider'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry} from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { white, purple} from '../utils/colors'
import {NavigationActions} from 'react-navigation'


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      
    },
    bttn: {
      backgroundColor: purple,
      padding: 10,
      height: 45,
      justifyContent: "center",
      alignItems: 'center',
      
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosBttn: {
        borderRadius: 7,
        marginLeft: 40,
        marginRight: 40,
    },
    androidBttn: {
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "flex-end",
        paddingLeft: 30,
        paddingRight: 30,
    },
    bttnText: {
      color: 'white',
      fontSize: 22,
      textAlign: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30,
    }
  })


function SubmitButton({onPress}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={Platform.OS === 'ios' ? [styles.bttn, styles.iosBttn] : [styles.bttn, styles.androidBttn] }
        >
            <Text style={styles.bttnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    }
    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] + step;
            return {
                [metric]: count > max ? max : count
            }
        })
    }
    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddEntry'
        }))
    }
    decrement = (metric) => {
        const {step} = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] - step;
            return {
                [metric]: count < 0 ? 0 : count
            }
        })
    }
    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }
    submit = () => {
        const key = timeToString()
        const entry = this.state
        this.props.dispatch(addEntry({
            [key]: entry
        }))
        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        }))
        submitEntry({key, entry})
        this.toHome()
        clearLocalNotification()
            .then(setLocalNotification)

    }
    reset = () => {
        const key = timeToString()
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))
        removeEntry(key)
    }
    render () {
        console.log('props', this.props)
        const metaInfo = getMetricMetaInfo()

        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons 
                        name='md-happy'
                        size={100}
                    />
                    <Text style={{padding: 10}}>You already logged your information for today</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )    
        }
        
        return (
            <View style={styles.container}>
                <DateHeader date={(new Date).toLocaleDateString()}/>
                {Object.keys(metaInfo).map((key) => {
                    const {getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]
                    return (
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            {
                                type === 'slider'
                                    ? <UdacitySlider
                                        value={value}
                                        onChange={(value) => this.slide(key, value)}
                                        {...rest}
                                    />
                                    : <UdacitySteppers
                                        value={value}
                                        onIncrement={() => this.increment(key)}
                                        onDecrement={() => this.decrement(key)}
                                        {...rest}
                                    />
                            }

                        </View>
                    )
                })}
                <SubmitButton onPress={this.submit}/>
            </View>
        )
    }
}

function mapStateToProps({entries}) {
    const key = timeToString()
    return {
        alreadyLogged: entries[key] && typeof entries[key].today === 'undefined'
    }
}
export default connect(mapStateToProps)(AddEntry)