import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { apiKey } from '../global/apiKey';

const screenWidth = Dimensions.get('window').width;

const PlaceCard = ({ place, onPress }) => {
    const photoReference = place.photos && place.photos[0] ? place.photos[0].photo_reference : null;
    const photoUrl = photoReference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`
        : null;

    return (
        <TouchableOpacity style={styles.placeCard} onPress={() => onPress(place)}>
            {photoUrl ? (
                <Image source={{ uri: photoUrl }} style={styles.backgroundImage} resizeMode="cover" />
            ) : (
                <View style={styles.defaultBackground} />
            )}
            <View style={styles.placeInfoContainer}>
                <View style={styles.placeNameBackground}>
                    <Text numberOfLines={1} style={styles.placeName}>{place.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    placeCard: {
        marginHorizontal: 8,
        width: screenWidth * 0.25,
        height: screenWidth * 0.30,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 5,
        marginVertical: 5,
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    placeInfoContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',


    },
    placeNameBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '100%',
        alignItems: 'center'
    },
    placeName: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
    },
    defaultBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'lightgray',
        zIndex: -1,
    },
});

export default memo(PlaceCard);
