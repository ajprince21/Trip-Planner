import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        }, 3000);
    }, [])
    return (
        <View style={styles.container}>
            <Image
                source={require('../images/tripPlannerlogo.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>Travel with Ease, Plan with Pleasure</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#353935',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color:'#F0F0F0',
        textAlign:'center',
        marginTop:10,
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
