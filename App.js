// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView, 
  TouchableHighlight, 
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Slider ,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AddEntry from './components/AddEntry'
import { red, white, purple } from './utils/colors';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import entries from './reducers'
import History from './components/History'
import FlexBoxExamples from './components/FlexBoxExamples'
import {combineReducers} from 'redux'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator as createBottomTabNavigator} from "react-navigation-tabs";
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { createStackNavigator } from 'react-navigation-stack';
import EntryDetail from './components/EntryDetail' 
import Live from './components/Live'
import { setLocalNotification } from './utils/helpers'

// function UdacityStatusBar ({backgroundColor, ...props}) {
//     return (
//         // <View style={{backgroundColor, height: Constants.statusBarHeight}}>
          
//         // </View>
//     )
// }



function Home () {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}
function DashBoard () {
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  )
}



const Tabs = createAppContainer(createBottomTabNavigator({
  History: {
    screen: History,

  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry'
    }

  },
  Live: {
    screen: Live
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions :{
    activeTintColor: white,
    style: {
      height: 56,
      backgroundColor: purple,
      shadowColor: 'rgba(0,0,0,0.24)',
    }
  }
}))

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerShown: false
    }
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      // title: 'woo',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
        
      }
    }
  }
}))

export default class App extends React.Component {

  state = {
    value: 0
  }
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(combineReducers({entries}))} >

        <View  style={{flex: 1}} >
          <StatusBar backgroundColor={purple} barStyle='light-content'/>
          <MainNavigator />          
        
        </View>

      
      </Provider>
    );
  }
  
}



