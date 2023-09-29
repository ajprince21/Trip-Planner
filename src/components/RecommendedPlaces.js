import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import axios from 'axios';
import colors from '../global/colors';

const screenWidth = Dimensions.get('window').width;

const RecommendedPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Function to fetch recommended places based on the destination and page
    const fetchRecommendedPlaces = async () => {
      try {
        const destination = 'India'; // Replace with the actual destination
        const apiKey = 'AIzaSyCezzYp8N0_NWP2o8No1teKG-vNKwZMEGs'; // Replace with your API key
        const perPage = 10; // Number of results per page
        const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination}&key=${apiKey}&pagetoken=${page}&type=tourist_attraction`;

        const response = await axios.get(apiUrl);
        console.log('Response ', response)
        if (response.data.status === 'OK') {
          const newPlaces = response.data.results;
          setPlaces((prevPlaces) => [...prevPlaces, ...newPlaces]);

          // Check if there are more results to fetch
          if (response.data.next_page_token) {
            // Recursively fetch the next page
            setPage(response.data.next_page_token);
          }
        }
      } catch (error) {
        console.error('Error fetching recommended places:', error);
      }
    };

    // Fetch recommended places when the component mounts
    // fetchRecommendedPlaces();
  }, [page]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Tips</Text>
      <FlatList
        data={places}
        keyExtractor={(item) => item.place_id}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.placeCard}>
            <Text>{item.name}</Text>
            {/* Add more details or components for each place */}
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: colors.dividerLine,
    width: '100%',
    padding: 8,
    color: colors.placeholderText,
  },
  placeCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  flatListContent: {
    paddingHorizontal: 16,
  },
});

export default RecommendedPlaces;
