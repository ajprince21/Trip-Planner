import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import checkNetworkState from '../utils/checkNetworkState';
import { setNetworkStatus } from '../store/slice/networkSlice';
import colors from '../global/colors';

const screenWidth = Dimensions.get('window').width;

const OfflineNotice = () => {
    const dispatch = useDispatch();
    const networkStatus = useSelector((state) => state.network.isConnected);
    const [retrying, setRetrying] = useState(false);

    const handleRetry = async () => {
        setRetrying(true);

        // Check the network state again on retry
        const isConnected = await checkNetworkState();

        // If the network state changed, dispatch the new status to the store
        if (isConnected !== networkStatus) {
            dispatch(setNetworkStatus(isConnected));
        }

        // Delay setting retrying to false for a better visual effect
        setTimeout(() => {
            setRetrying(false);
        }, 1000);
    };
    if (!networkStatus) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>No internet connection</Text>
                <Button
                    icon="refresh"
                    onPress={handleRetry}
                    mode="outlined "
                    disabled={retrying}
                    style={styles.retryButton}
                    loading={retrying}
                >
                    Tap to retry
                </Button>
            </View>
        );

    }

    return null;

};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.errorText,
        padding: 8,
        width: screenWidth * 0.8,
        borderRadius: 10,
        marginVertical: 5
    },
    message: {
        color: colors.background,
        marginRight: 8,
    },
    retryButton: {
        backgroundColor: colors.highlight,
    },
});

export default OfflineNotice;
