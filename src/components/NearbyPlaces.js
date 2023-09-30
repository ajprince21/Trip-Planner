import React, { useEffect, useState, useCallback, memo } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import colors from '../global/colors';
import PlaceCard from './PlaceCard';
import { fetchRecommendedPlaces } from '../global/placeService';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const NearbyPlaces = memo(({ destination, heading }) => {
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecommendedPlaces = async () => {
      try {
        const recommendedPlaces = await fetchRecommendedPlaces(destination);
        setPlaces(recommendedPlaces);
        setError(null); // Reset error if request succeeds
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendedPlaces();
  }, [destination]);

  const handleRetry = () => {
    setLoading(true);
    loadRecommendedPlaces();
  };

  const handleItemClick = useCallback((place) => {
    navigation.navigate('PlaceDetail', { place: place });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} color={colors.primary} size="small" />
          <Text style={styles.loadingText}>Fetching Places...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error fetching recommended places:</Text>
          <Button onPress={handleRetry}>Retry</Button>
        </View>
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.place_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <PlaceCard place={item} onPress={handleItemClick} />
          )}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
});

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
  flatListContent: {
    paddingHorizontal: 16,
  },
  loadingContainer: {
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 16,
    color: colors.primary,
    fontSize: 16,
  },
  errorContainer: {
    alignItems: 'center'
  },
  errorText: {
    marginTop: 16,
    color: colors.errorText,
    fontSize: 16,
  },
});

export default NearbyPlaces;
