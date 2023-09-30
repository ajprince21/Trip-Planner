import axios from 'axios';
import { apiKey } from './apiKey';
import { Alert } from 'react-native';

// Function to fetch recommended places
export const fetchRecommendedPlaces = async (destination) => {
    try {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
            destination
        )}&key=${apiKey}&type=tourist_attraction&maxResults=${20}`;

        const response = await axios.get(apiUrl);

        if (response.data.status === 'OK') {
            const places = response.data.results;
            return places;
        } else {
            Alert.alert('Error fetching recommended places:', response.data.status);
            return [];
        }
    } catch (error) {
        Alert.alert('Error fetching recommended places:', error);
        return [];
    }
};
