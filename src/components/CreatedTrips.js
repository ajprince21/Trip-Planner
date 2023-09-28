import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import colors from '../global/colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import TripCard from './TripCard ';


const CreatedTrips = () => {
    const [recentlyCreatedTrips, setRecentlyCreatedTrips] = useState([]);

    useEffect(() => {
        // Fetch trips data from Firestore
        const fetchTrips = async () => {
            try {
                const user = auth().currentUser;
                if (!user) {
                    console.error('User not logged in');
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
                console.error('Error fetching trips:', error);
            }
        };


        fetchTrips();
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Recently Created Trips</Text>
            <FlatList
                data={recentlyCreatedTrips}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <TripCard trip={item} />}

            />
            {recentlyCreatedTrips?.length === 0 &&
                <Text style={{ padding: 8, textAlign: 'center' }}>No Trip created!</Text>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        backgroundColor: colors.dividerLine,
        width: '100%',
        padding: 8,
        color: colors.placeholderText,
    },
});

export default CreatedTrips;
