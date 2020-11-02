import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {recieveEntries, addEntry} from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalenderResults } from '../utils/api'
import {Agenda as UdaciFitnessCalendar } from 'react-native-calendars'
import {white} from '../utils/colors'
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'
import {AppLoading} from 'expo'


class History extends Component {
    state = {
        ready: false,
        selectedDate: new Date().toISOString().slice(0,10),
    }
    componentDidMount() {
        const {dispatch} = this.props
        fetchCalenderResults()
            .then((entries) => {
                console.log(entries)
                return dispatch(recieveEntries(entries))
            })
            .then(({entries}) => {
                if(!entries[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue()
                    }))
                }
            })
            .then(() => {
                this.setState({
                    ready: true
                })
            })
        
    }
    onDayPress = (day) => {
        console.log(day.dateString)
        this.setState({
          selectedDate: day.dateString
        })
      };
    renderItem = (id,{today, ...metrics}) => (
        <View style={styles.item} >
        {today?
            <View >
                {<Text style={styles.noDataText}>{today}</Text>}
            </View>:
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EntryDetail', {entryID: id})} >
                <MetricCard metrics={metrics}/>
            </TouchableOpacity>
        }    
        </View>    
      )
    renderDay = (day, {...metrics}) => (
        <View style={{marginTop: 50}}>
          {<Text>{JSON.stringify(metrics)}</Text>}
        </View>
    )  
      
      renderEmptyDate = () => {
        return (
          <View style={styles.item}>
            <Text
            style={styles.noDataText}
            >No Data for this day</Text>
          </View>
        )
      }
    render () {
        const {ready, selectedDate} = this.state
        const {entries,} = this.props
        const arryEntries = {}
        if (ready === false) {
            return (
                <AppLoading />
            )
        }
        for (let key in entries) {

            if(entries[key] == null){
                arryEntries[key] = []
            } else {
                arryEntries[key] = [entries[key]]
            }   
            
        }
        
        console.log(arryEntries)
        return (
            
                <UdaciFitnessCalendar 
                    items={arryEntries}
                    onDayPress={this.onDayPress}
                    renderItem={(item, firstItemInDay) => this.renderItem(selectedDate, item, firstItemInDay)}
                    // renderDay={this.renderDay}
                    renderEmptyDate={this.renderEmptyDate}
                />
            
        )
    }
}
const mapStateToProps = ({entries}) => ({
    entries
})
export default connect(mapStateToProps)(History)

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        marginBottom: 20
    }

})