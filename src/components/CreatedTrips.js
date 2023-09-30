import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import colors from '../global/colors';
import TripCard from './TripCard ';

const CreatedTrips = ({ recentlyCreatedTrips }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Added Trips</Text>
            <FlatList
                data={recentlyCreatedTrips}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <TripCard trip={item} />}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No Trips found</Text>
                    </View>
                }
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
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
       
    },
    emptyText: {
        color: 'grey',
        textAlign: 'center',
        padding:10,
        width:'100%'
    },
});

export default React.memo(CreatedTrips);
