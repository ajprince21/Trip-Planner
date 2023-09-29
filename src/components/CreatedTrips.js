import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import colors from '../global/colors';
import TripCard from './TripCard ';

const CreatedTrips = ({ recentlyCreatedTrips }) => {
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
            {recentlyCreatedTrips?.length === 0 && (
                <Text style={{ padding: 8, textAlign: 'center' }}>No Trip created!</Text>
            )}
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

export default React.memo(CreatedTrips);
