import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import TripCard from './TripCard ';
import colors from '../global/colors';


const CreatedTrips = () => {
    // Generate sample data with more realistic date values
    const generateSampleData = () => {
        const currentDate = new Date();
        const recentTrips = [];

        for (let i = 1; i <= 10; i++) {
            const startDate = new Date(currentDate);
            const endDate = new Date(currentDate);
            startDate.setDate(currentDate.getDate() - i);
            endDate.setDate(currentDate.getDate() + i);

            recentTrips.push({
                id: i,
                name: `Trip ${i}`,
                destination: `Destination ${i}`,
                startDate: startDate.toLocaleDateString('en-IN'),
                endDate: endDate.toLocaleDateString('en-IN'),
            });
        }

        return recentTrips;
    };

    const recentlyCreatedTrips = generateSampleData();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Recently Created Trips</Text>
            <FlatList
                data={recentlyCreatedTrips}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <TripCard trip={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        backgroundColor:colors.dividerLine,
        width: '100%',
        padding: 8,
        color: colors.placeholderText
    },
});

export default CreatedTrips;
