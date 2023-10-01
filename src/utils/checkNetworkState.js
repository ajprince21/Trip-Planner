import NetInfo from '@react-native-community/netinfo';

// Function to check network state and return a boolean value
const checkNetworkState = async () => {
    try {
        const state = await NetInfo.fetch();

        return state.isConnected; // Return true if connected, false if disconnected
    } catch (error) {
        return false;
    }
};

export default checkNetworkState;
