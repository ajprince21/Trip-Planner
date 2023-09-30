import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../global/colors';
import { format } from 'date-fns'
import { useNavigation } from '@react-navigation/native';

const TripCard = ({ trip }) => {
    const { tripName, destination, startDate, endDate, id } = trip;
    const navigation = useNavigation();

    const handleCardPress = () => {
        navigation.navigate('TripDetail', { trip });
    };

    return (
        <TouchableOpacity onPress={handleCardPress} style={styles.card}>
            <Text style={styles.tripName}>{tripName}</Text>
            <Text style={styles.destination}>{destination}</Text>
            {startDate ?
                <Text style={styles.dateRange}>
                    {format(new Date(startDate), "dd MMM yy")} - {format(new Date(endDate), "dd MMM yy")}
                </Text>
                : <Text style={styles.dateRange}>Dates not available</Text>
            }
        </TouchableOpacity>
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
