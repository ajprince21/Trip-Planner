import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import HomeHeader from '../components/HomeHeader';
import colors from '../global/colors';
import CreatedTrips from '../components/CreatedTrips';
import RecommendedPlaces from '../components/RecommendedPlaces';

const HomeScreen = ({ navigation }) => {
  const navigateToCreateTrip = () => {
    navigation.navigate('CreateTrip');
  };

  return (
    <View style={styles.container}>
      <HomeHeader appName={'Trip Planner'} />
      <ScrollView>
        <CreatedTrips />
        <RecommendedPlaces />
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        label="New Trip"
        color={colors.primary}
        onPress={navigateToCreateTrip}
        variant={'tertiary'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.background
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
