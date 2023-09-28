import React from 'react';
import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import colors from '../global/colors';

const Splash = ({ initializing }) => {

    return (
        <View style={styles.container}>
            <Image
                source={require('../images/tripPlannerlogo.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>Travel with Ease, Plan with Pleasure</Text>
            {initializing && <ActivityIndicator size="large" />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
        marginTop: 10,
        fontStyle: 'italic',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginTop: 20,
    },
});

export default Splash;
