import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import colors from '../global/colors';
import { format } from 'date-fns';

const TripDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const trip = route.params.trip;

  const [tasks, setTasks] = useState([]);

  // Function to navigate to the "Add Task" screen
  const navigateToAddTask = () => {
    // Navigate to the screen where users can add tasks
    navigation.navigate('AddTask', { trip: trip });
  };

  // Render the header section of the FlatList
  const renderListHeader = () => {
    return (
      <View>
        {/* Display trip details */}
        <View style={styles.tripDetailsContainer}>
          <Text style={styles.tripName}>{trip.tripName}</Text>
          <Text style={styles.tripDescription}>-{trip.destination}-</Text>
          <View style={styles.dateContainer}>
            <Text>Start Date : {trip.startDate && format(new Date(trip.startDate), 'dd MMM yy')}</Text>
            <Text>End Date  : {trip.endDate && format(new Date(trip.endDate), 'dd MMM yy')}</Text>
          </View>
        </View>
        {/* Display tasks header */}
        <View style={styles.tasksHeader}>
          <Text style={styles.tasksHeaderText}>Tasks</Text>
        </View>
      </View>
    );
  };

  // Render each item in the FlatList
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleTaskPress(item)}>
        {/* Display task information */}
        <Text>{item.taskName}</Text>
        {/* Display other task details */}
      </TouchableOpacity>
    );
  };

  // Function to handle task press 
  const handleTaskPress = (task) => {

  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderListHeader}
        renderItem={renderItem}
      />
      {/* Floating Action Button for adding tasks */}
      <FAB
        style={styles.fab}
        icon="plus"
        label="Add Task"
        color={colors.primary}
        onPress={navigateToAddTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tripDetailsContainer: {
    alignItems: 'center',
    padding: 8,
  },
  tripName: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 18,
  },
  tripDescription: {
    color: colors.grey1,
    fontWeight: '500',
    fontSize: 14,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.grey1,
  },
  deleteButton: {
    backgroundColor: colors.error,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  tasksHeader: {
    backgroundColor: colors.dividerLine,
    padding: 8,
    marginTop: 10,
    width: '100%',
  },
  tasksHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.placeholderText,
    textAlign: 'left',
  },
});

export default TripDetailScreen;
