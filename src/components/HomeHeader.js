import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { removeUserTokenData } from '../store/slice/AuthSlice';
import colors from '../global/colors';
import auth from '@react-native-firebase/auth';

const HomeHeader = ({ appName }) => {
    const dispatch = useDispatch();

    // Function to handle logout
    const handleLogout = () => {
        // Sign the user out using Firebase Authentication
        auth()
            .signOut()
            .then(() => {
                // Dispatch the Redux action to remove user data from the store
                dispatch(removeUserTokenData());
            })
            .catch((error) => {
                console.error('Error during sign-out:', error);
            });
    };

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{appName}</Text>

            {/* Logout button on the right side of the header */}
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                {/* Icon for the Logout button */}
                <Icon name="exit-to-app" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.primary,
        elevation: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    logoutButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
});

export default HomeHeader;
