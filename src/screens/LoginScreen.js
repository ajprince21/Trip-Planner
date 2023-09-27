import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import colors from '../global/colors';
import Loading from '../components/Loading';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleLogin = () => {
        //  field validation here
        if (!email || !password) {
            setSnackbarMessage('Email and password are required.');
            setSnackbarVisible(true);
            return;
        }

        if (email === 'ajay@gmail.com' && password === '123456') {
            // Successful login, navigate to the next Home.
            navigation.replace('Home');
        } else {
            // Failed login, display an error message.
            setSnackbarMessage('Invalid email or password.');
            setSnackbarVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Trip Planner</Text>
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
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button
                mode="contained"
                style={styles.loginButton}
                onPress={handleLogin}
            >
                Login
            </Button>
            <Text
                style={styles.signupLink}
                onPress={() => navigation.navigate('Signup')}
            >
                Don't have an account? Sign up
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
        justifyContent: 'center',
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
    loginButton: {
        backgroundColor: colors.primary,
        width: '100%',
        paddingVertical: 10,
    },
    signupLink: {
        marginTop: 20,
        color: colors.primary,
    },
});

export default LoginScreen;
