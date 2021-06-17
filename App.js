import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Transaction from './screens/transaction'
import Search from './screens/search'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import LoginScreen from './screens/loginScreen';

export default class App extends React.Component{
  render(){
  return (
    <AppContainer />
  );
  }
}

const TabNavigator = createBottomTabNavigator({
  Transaction:{screen:Transaction},
  Search:{screen:Search}
},
{
defaultNavigationOptions : ({navigation})=>({ 
  tabBarIcon:()=>{
     const routeName = navigation.state.routeName;
     console.log(routeName) 
     if(routeName=== "Transaction") { 
       return( <Image source={require("C:/Users/Kanishk/Documents/Class_68/assets/book.png")} style={{width:40, height:40}} /> ) }
     else if (routeName === "Search"){ return( 
     <Image source={require("C:/Users/Kanishk/Documents/Class_68/assets/searchingbook.png")} 
     style={{width:40, height:40}} /> 
     ) } 
    } 
  }) }
)

const switchNavigator=createSwitchNavigator({
  LoginScreen:{screen:LoginScreen},
  TabNavigator:{screen:TabNavigator}
})

const AppContainer = createAppContainer(switchNavigator)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
