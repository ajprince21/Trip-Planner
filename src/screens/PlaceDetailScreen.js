import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking, ScrollView, Dimensions, Animated, Alert } from 'react-native';
import { getPlacePhotos } from '../global/getPlacePhotos';
import colors from '../global/colors';

const screenWidth = Dimensions.get('window').width;
const PlaceDetailScreen = ({ route, navigation }) => {
    const { place } = route.params;
    const flatlistRef = useRef(0);
    const [photos, setPhotos] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // Fetch photos when the component mounts
        getPlacePhotos(place.place_id)
            .then((fetchedPhotos) => {
                setPhotos(fetchedPhotos);
            })
            .catch((error) => {
                Alert.alert('Error fetching place photos', error)
            });
    }, [place.place_id]);

    useEffect(() => {
        let interval;
    
        if (photos.length > 1) {
            interval = setInterval(() => {
                if (activeIndex === photos.length - 1) {
                    flatlistRef.current.scrollToIndex({
                        index: 0,
                        animated: true,
                    });
                } else {
                    flatlistRef.current.scrollToIndex({
                        index: activeIndex + 1,
                        animated: true,
                    });
                }
            }, 3000);
        }
    
        return () => {
            clearInterval(interval);
        };
    }, [activeIndex, photos]);
    

    useEffect(() => {
        navigation.setOptions({
            title: place.name,
        });
    }, [navigation, place.name]);

    // Render individual images in the FlatList
    const renderImage = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
        </View>
    );

    renderDotIndicator = () => {
        return (
            photos.map((dot, index) => {
                return (
                    <View
                        style={activeIndex === index ? styles.activedot : styles.dot}
                        key={index}
                    >

                    </View>
                )
            }))
    }


    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / screenWidth);
        setActiveIndex(index);
    }
    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index: index
    })

    return (
        <ScrollView style={styles.container}>
            <View>
                <FlatList
                    ref={flatlistRef}
                    data={photos}
                    getItemLayout={getItemLayout}
                    pagingEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.url}
                    renderItem={renderImage}
                    ListEmptyComponent={<Text style={styles.noImagesText}>No Images Found</Text>}
                    onScroll={handleScroll}

                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    {renderDotIndicator()}
                </View>

            </View>

            <View style={styles.details}>
                <Text style={styles.name}>{place.name}</Text>
                <Text style={styles.address}>{place.formatted_address}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>Rating:</Text>
                    <Text style={styles.rating}>{place.rating}</Text>
                </View>
                <Text style={styles.userRatings}>{place.user_ratings_total} User Ratings</Text>
            </View>
            <View style={{ padding: 10 }}>
                <TouchableOpacity
                    style={styles.directionsButton}
                    onPress={() => {
                        const { lat, lng } = place.geometry.location;
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                        Linking.openURL(url);
                    }}
                >
                    <Text style={styles.directionsButtonText}>Get Directions</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        overflow: 'hidden',
        width:screenWidth,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.background,
        padding:10
    },
    dot: {
        backgroundColor: colors.grey1,
        height: 10,
        width: 10,
        margin: 3,
        borderRadius: 5
    },
    activedot: {
        backgroundColor: colors.primary,
        height: 10,
        width: 10,
        margin: 3,
        borderRadius: 5
    },
    image: {
        width: screenWidth*0.85,
        height: 200,
        borderRadius:10

    },
    noImagesText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
    details: {
        marginTop: 16,
        padding: 16
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    address: {
        fontSize: 18,
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 4,
    },
    rating: {
        fontSize: 18,
    },
    userRatings: {
        fontSize: 16,
        marginTop: 8,
    },
    directionsButton: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    directionsButtonText: {
        fontSize: 18,
        color: 'white',
    },
});

export default PlaceDetailScreen;
