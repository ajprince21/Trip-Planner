import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import colors from '../global/colors';

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    });
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleSignUp = () => {
        const { name, email, mobile, password, confirmPassword } = formData;

        if (!name || !email || !mobile || !password || !confirmPassword) {
            setSnackbarMessage('Please fill in all fields.');
            setSnackbarVisible(true);
            return;
        }

        if (password !== confirmPassword) {
            setSnackbarMessage('Passwords do not match.');
            setSnackbarVisible(true);
            return;
        }

        // You can access the form data in the formData object here
        console.log('Form Data:', formData);

        // Clear the form fields
        setFormData({
            name: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: '',
        });


        setSnackbarMessage('Sign-up was successful. PLease Login !');
        setSnackbarVisible(true);

        navigation.navigate.goBack();
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.title}>Create an Account</Text>
                <Text style={styles.subTitle}>
                    Welcome to Trip Planner! Join us to plan your amazing trips.
                </Text>
                <TextInput
                    label="Name"
                    mode="outlined"
                    value={formData.name}
                    onChangeText={text => handleInputChange('name', text)}
                    style={styles.input}
                />
                <TextInput
                    label="Email"
                    mode="outlined"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={text => handleInputChange('email', text)}
                    style={styles.input}
                />
                <TextInput
                    label="Mobile"
                    mode="outlined"
                    keyboardType="numeric"
                    value={formData.mobile}
                    onChangeText={text => handleInputChange('mobile', text)}
                    style={styles.input}
                />
                <TextInput
                    label="Password"
                    mode="outlined"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={text => handleInputChange('password', text)}
                    style={styles.input}
                />
                <TextInput
                    label="Re-enter Password"
                    mode="outlined"
                    secureTextEntry
                    value={formData.confirmPassword}
                    onChangeText={text => handleInputChange('confirmPassword', text)}
                    style={styles.input}
                />
                <Button
                    mode="contained"
                    onPress={handleSignUp}
                    style={styles.signUpButton}
                >
                    Sign Up
                </Button>
                <Text
                    style={styles.signInLink}
                    onPress={() => navigation.goBack()}
                >
                    Already have an account? Sign In
                </Text>
            </ScrollView>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                action={{
                    label: 'OK',
                    onPress: () => { },
                }}
            >
                {snackbarMessage}
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContainer: {
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
    },
    input: {
        marginBottom: 16,
    },
    signUpButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        marginBottom: 16,
    },
    signInLink: {
        marginTop: 20,
        color: colors.primary,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});

export default SignUpScreen;
