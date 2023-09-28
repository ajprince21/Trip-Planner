import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../global/colors';

const TripCard = ({ trip }) => {
    const { name, destination, startDate, endDate } = trip;

    return (
        <View style={styles.card}>
            <Text style={styles.tripName}>{name}</Text>
            <Text style={styles.destination}>{destination}</Text>
            <Text style={styles.dateRange}>
                {startDate} - {endDate}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 200,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: colors.secondary,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        marginVertical: 5,
    },
    tripName: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.primary,
    },
    destination: {
        fontSize: 14,
        color: colors.text,
        fontWeight: '600'
    },
    dateRange: {
        fontSize: 14,
        color: colors.grey1,
    },
});

export default React.memo(TripCard);
