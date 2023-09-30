import React, { useEffect, useState, useCallback, memo } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import colors from '../global/colors';
import PlaceCard from './PlaceCard';
import { fetchRecommendedPlaces } from '../global/placeService';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const NearbyPlaces = memo(({ destination, heading }) => {
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendedPlaces = async () => {
      try {
        const recommendedPlaces = await fetchRecommendedPlaces(destination);
        setPlaces(recommendedPlaces);
      } catch (error) {
        console.error('Error fetching recommended places:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendedPlaces();
  }, [destination]);

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
});

export default NearbyPlaces;
