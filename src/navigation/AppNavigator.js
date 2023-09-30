import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';

import Splash from '../screens/Splash';
import LoginSignupScreen from '../screens/LoginSignupScreen';
import HomeScreen from '../screens/HomeScreen';
import colors from '../global/colors';
import { removeUserTokenData, setUserTokenData } from '../store/slice/AuthSlice';
import TripCreationScreen from '../screens/TripCreationScreen';
import TripDetailScreen from '../screens/TripDetailScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';

const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginSignup" component={LoginSignupScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{
                headerShown: false,
                title: 'Trip Planner',
            }} />
            <Stack.Screen name="CreateTrip" component={TripCreationScreen} options={{
                title: 'New Trip',
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTitleAlign: 'center',
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerTintColor: colors.background
            }} />
            <Stack.Screen name="TripDetail" component={TripDetailScreen} options={{
                title: 'Trip Details',
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTitleAlign: 'left',
                ...TransitionPresets.SlideFromRightIOS,
                headerTintColor: colors.background
            }} />
             <Stack.Screen name="AddTask" component={AddTaskScreen} options={{
                title: 'Add Task',
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTitleAlign: 'left',
                ...TransitionPresets.SlideFromRightIOS,
                headerTintColor: colors.background
            }} />
             <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} options={{
                title: 'Place Detail',
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTitleAlign: 'left',
                ...TransitionPresets.SlideFromRightIOS,
                headerTintColor: colors.background
            }} />
        </Stack.Navigator>
    );
}

const AppNavigator = () => {
    const userToken = useSelector((state) => state.auth.userTokenData);
    const dispatch = useDispatch();
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            if (user) {
                const serializedUser = {
                    email: user.email,
                    uid: user.uid,
                };
                dispatch(setUserTokenData(serializedUser));
            } else {
                dispatch(removeUserTokenData());
            }
            if (initializing) setInitializing(false);
        });
        setTimeout(() => {
            setInitializing(false);
        }, 2000);

        return () => subscriber();
    }, []);

    if (initializing) {
        return (
            <Splash />
        );
    }

    return (
        <NavigationContainer>
            {userToken ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}


export default AppNavigator;
