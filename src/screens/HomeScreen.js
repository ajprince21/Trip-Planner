import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeHeader from '../components/HomeHeader'

const HomeScreen = () => {
  return (
    <View>
      <HomeHeader appName={'Trip Planner '}/>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})