import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import colors from '../global/colors';
import firestore from '@react-native-firebase/firestore';
import TaskCard from '../components/TaskCard';
import NearbyPlaces from '../components/NearbyPlaces';

const TripDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const trip = route.params.trip;
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);



  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasksForTrip(trip.id);
      setTasks(fetchedTasks);
      setLoading(false);
    };

    fetchTasks();
  }, [trip.id, navigation]);




  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: trip.tripName,
    });
  }, [trip.tripName, navigation]);




  // Function to navigate to the "Add Task" screen
  const navigateToAddTask = () => {
    navigation.navigate('AddTask', { trip: trip });
  };




  // Function to fetch tasks for a specific trip
  const getTasksForTrip = async (tripID) => {
    try {
      const tasksCollection = firestore().collection('tasks');
      const querySnapshot = await tasksCollection.where('tripID', '==', tripID).get();

      const tasks = [];

      querySnapshot.forEach((documentSnapshot) => {
        const taskData = documentSnapshot.data();
        tasks.push({
          id: documentSnapshot.id,
          taskName: taskData.taskName,
          taskDate: taskData.taskDate,
          taskTime: taskData.taskTime,
          taskDescription: taskData.taskDescription,
          isCompleted: taskData.isCompleted,
        });
      });

      return tasks;
    } catch (error) {
      console.log('Error fetching tasks:', error);
      return [];
    } finally {
      setLoading(false)
    }
  };


  // Function to delete a task from Firestore
  const deleteTask = useCallback(async (taskId) => {
    try {
      const taskRef = firestore().collection('tasks').doc(taskId);
      await taskRef.delete();

      // Update the tasks state by removing the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }, []);

  // Function to mark a task as complete in Firestore
  const markTaskAsComplete = useCallback(async (taskId) => {
    try {
      const taskRef = firestore().collection('tasks').doc(taskId);
      await taskRef.update({ isCompleted: true });

      // Update the tasks state by mapping through the tasks and updating isCompleted
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, isCompleted: true } : task
        )
      );
    } catch (error) {
      console.error('Error marking task as complete:', error);
    }
  }, []);


  // Render the header section of the FlatList
  const renderListHeader = () => {
    return (
      <View>

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
      <TaskCard
        task={item}
        deleteTask={deleteTask}
        markTaskAsComplete={markTaskAsComplete}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <NearbyPlaces heading={`Nearby places (${trip.destination})`} destination={trip.destination} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderListHeader}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={
          isLoading
            ? (
              <View style={{ alignItems: 'center', padding: 10 }}>
                <ActivityIndicator />
                <Text>Getting Task</Text>
              </View>
            )
            : (
              <Text style={{ fontSize: 14, textAlign: 'center', margin: 10, color: colors.grey1 }}>No task added!! </Text>
            )}
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
