import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../global/colors';

const CraftedMessage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.sloganContainer}>
                <Text style={styles.sloganText}>{`Explore\nDream\nDiscover !`}</Text>
                <Text style={styles.locationText}>Crafted with <Icon name="heart" size={18} color="red" /> in Indore, India.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        padding: 16
    },
    sloganContainer: {
        flex: 1,
    },
    sloganText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: colors.grey1,
        marginBottom: 8,
    },
    locationText: {
        fontSize: 16,
        color: colors.grey1,
    },
});

export default CraftedMessage;
