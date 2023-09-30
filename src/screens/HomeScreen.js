import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import HomeHeader from '../components/HomeHeader';
import colors from '../global/colors';
import CreatedTrips from '../components/CreatedTrips';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import NearbyPlaces from '../components/NearbyPlaces';
import CraftedMessage from '../components/CraftedMessage';

const HomeScreen = ({ navigation }) => {
  const [recentlyCreatedTrips, setRecentlyCreatedTrips] = useState([]);

  // Fetch trips data from Firestore
  const fetchTrips = useCallback(async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        console.log('User not logged in');
        return;
      }

      const userUid = user.uid;

      // Reference to the Firestore collection for trips
      const tripsCollection = firestore().collection('trips');

      // Query trips where userId matches the user's UID
      const querySnapshot = await tripsCollection.where('userId', '==', userUid).get();

      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setRecentlyCreatedTrips(trips);
    } catch (error) {
      console.log('Error fetching trips:', error);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const navigateToCreateTrip = () => {
    navigation.navigate('CreateTrip');
  };

  return (
    <View style={styles.container}>
      <HomeHeader appName={'Trip Planner'} />
      <ScrollView>
        <CreatedTrips recentlyCreatedTrips={recentlyCreatedTrips} />
        <NearbyPlaces heading={'Top Places'} destination={'Top Places'} />
        <CraftedMessage />
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
    backgroundColor: colors.background,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
