import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {white} from '../utils/colors'
import MetricCard from './MetricCard'

class EntryDetail extends Component {
    static navigationOptions = ({navigation}) => {
        const {entryID} = navigation.state.params

        return {
            title: entryID,
            
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <MetricCard metrics={this.props.metrics} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : white,
        padding : 15
    }
    
})


function mapStateToProps ({entries}, {navigation}) {
    const {entryID} = navigation.state.params
    return {
        entryID,
        metrics: entries[entryID]
    }
}
export default connect(mapStateToProps)(EntryDetail);