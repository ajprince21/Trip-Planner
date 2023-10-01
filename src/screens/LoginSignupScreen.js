import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import colors from '../global/colors';
import Loading from '../components/Loading';
import logo from '../images/tripPlannerlogo.png';
import OfflineNotice from '../components/OfflineNotice';
import { useSelector } from 'react-redux';

const LoginSignupScreen = () => {
    const navigation = useNavigation();
    const networkStatus = useSelector((state) => state.network.isConnected);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false); // For toggling between sign up and login
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleAuthMode = () => {
        setIsSignup(!isSignup); // Toggle between sign up and login
        setSnackbarVisible(false); // Hide any previous error messages
    };

    const handleAuthentication = async () => {
        // Field validation here
        if (!email || !password) {
            setSnackbarMessage('Email and password are required.');
            setSnackbarVisible(true);
            return;
        }

        try {
            // Show loading indicator
            setLoading(true);

            if (isSignup) {
                // Sign up with Firebase Authentication
                await auth().createUserWithEmailAndPassword(email, password);
                setSnackbarMessage('Sign-up was successful. Please login.');
            } else {
                // Login with Firebase Authentication
                await auth().signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            let errorMessage = 'An error occurred while authenticating.';

            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'User not found. Please check your email.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password. Please try again.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address. Please check your email.';
                    break;
                case 'auth/email-already-in-use':
                    errorMessage = 'Email address is already in use. Please use a different email.';
                    break;
                case 'auth/invalid-login':
                    errorMessage = 'Invalid login. Please check your credentials.';
                    break;
                default:
                    errorMessage = error.message;
                    break;
            }

            // Display the appropriate error message
            setSnackbarMessage(errorMessage);
            setSnackbarVisible(true);
        } finally {
            // Hide loading indicator
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    return (
        <View style={styles.container}>
            <OfflineNotice />
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>
                {isSignup ? 'Sign Up for Trip Planner' : 'Welcome back to Trip Planner'}
            </Text>
            <TextInput
                label="Email"
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label="Password"
                mode="outlined"
                style={styles.input}
                secureTextEntry={secureTextEntry}
                value={password}
                onChangeText={text => setPassword(text)}
                right={
                    <TextInput.Icon
                        icon={secureTextEntry ? 'eye-off' : 'eye'}
                        onPress={togglePasswordVisibility}

                    />
                }
            />
            <Button
                mode="contained"
                style={styles.authButton}
                onPress={handleAuthentication}
                disabled={!networkStatus}
            >
                {isSignup ? 'Sign Up' : 'Login'}
            </Button>
            <Text
                style={styles.toggleLink}
                onPress={toggleAuthMode}
            >
                {isSignup ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up'}
            </Text>
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
            <Loading visible={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginBottom: 16,
    },
    authButton: {
        backgroundColor: colors.primary,
        width: '100%',
        paddingVertical: 10,
    },
    toggleLink: {
        marginTop: 20,
        color: colors.primary,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
});

export default LoginSignupScreen;
