import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';
import colors from '../global/colors';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const TripCard = ({ trip }) => {
    const { tripName, destination, startDate, endDate, id } = trip;
    const navigation = useNavigation();

    const handleCardPress = () => {
        navigation.navigate('TripDetail', { trip });
    };

    return (
        <TouchableRipple onPress={handleCardPress} rippleColor="rgba(0, 0, 0, 0.2)">
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.tripName}>{tripName}</Text>
                    <Text style={styles.destination}>{destination}</Text>
                    {startDate ? (
                        <Text style={styles.dateRange}>
                            {format(new Date(startDate), 'dd MMM yy')} -{' '}
                            {format(new Date(endDate), 'dd MMM yy')}
                        </Text>
                    ) : (
                        <Text style={styles.dateRange}>Dates not available</Text>
                    )}
                </Card.Content>
            </Card>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 200,
        marginHorizontal: 10,
        marginVertical: 5,
        elevation: 2,
    },
    tripName: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.primary,
    },
    destination: {
        fontSize: 14,
        color: colors.text,
        fontWeight: '600',
    },
    dateRange: {
        fontSize: 14,
        color: colors.grey1,
    },
});

export default React.memo(TripCard);
