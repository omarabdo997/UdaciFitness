import React, {Component} from 'react'
import {View, StyleSheet, Text, AppRegistry} from 'react-native'

class FlexboxExamples extends Component {
    render() {
      return (
        <View style={styles.container}>
          <View style={[styles.box, {flex: 1}]}/>
          <View style={[styles.box, {flex: 2, alignSelf: 'stretch'}]}/>
          <View style={[styles.box, {flex: 1}]}/>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    box: {
      height: 50,
      width: 50,
      backgroundColor: '#e76e63',
      margin: 10,
    }
  })
  
  export default FlexboxExamples;