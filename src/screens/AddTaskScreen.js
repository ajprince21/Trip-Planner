import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, IconButton, Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import colors from '../global/colors';

const AddTaskScreen = ({ route, navigation }) => {
    const { trip } = route.params;
    console.log('Printing trip', trip);

    const [formData, setFormData] = useState({
        taskName: '',
        taskDate: null,
        taskTime: null,
        taskDescription: '',
    });

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setShowDatePicker(false);
            setFormData({ ...formData, taskDate: selectedDate });
        } else {
            setShowDatePicker(false);
            setFormData({ ...formData, taskDate: null });
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        if (selectedTime) {
            setShowTimePicker(false);
            setFormData({ ...formData, taskTime: selectedTime });
        } else {
            setShowTimePicker(false);
            setFormData({ ...formData, taskTime: null });
        }
    };

    const handleAddTask = async () => {
        try {
            // Validate task data (add validation logic as needed)
            if (!formData.taskName) {
                setSnackbarText('Task name is required.');
                setSnackbarVisible(true);
                return;
            }

            // Reference to the Firestore collection for tasks
            const tasksCollection = firestore().collection(`tasks`);

            // Add the task document to Firestore
            await tasksCollection.add({
                taskName: formData.taskName,
                taskDate: formData.taskDate ? formData.taskDate.toISOString() : null,
                taskTime: formData.taskTime ? formData.taskTime.toISOString() : null,
                taskDescription: formData.taskDescription || null,
                isCompleted: false,
                tripID: trip.id,
            });

            // Clear the form fields
            setFormData({
                taskName: '',
                taskDate: null,
                taskTime: null,
                taskDescription: '',
            });

            // Close the pickers if they are open
            if (showDatePicker) {
                setShowDatePicker(false);
            }
            if (showTimePicker) {
                setShowTimePicker(false);
            }
            navigation.goBack();
        } catch (error) {
            // Handle any errors that occur during task addition
            console.error('Error adding task:', error);
        }
    };



    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.modalTitle}>Trip- {trip.tripName}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <Icon name="location-city" size={18} color={colors.grey1} />
                <Text style={{ color: colors.grey1, marginLeft: 10 }}>{trip.destination}</Text>
            </View>

            <TextInput
                label="Task Name"
                value={formData.taskName}
                onChangeText={(text) => setFormData({ ...formData, taskName: text })}
                style={styles.input}
            />
            <Text style={{ color: colors.primary, marginBottom: 10 }}>Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View style={styles.dateContainer}>
                    <Icon name="event" size={24} color={colors.primary} />
                    <Text style={{ paddingLeft: 10 }}>{formData.taskDate ? formData.taskDate.toLocaleDateString() : 'Select Date'}</Text>
                </View>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={formData.taskDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <Text style={{ color: colors.primary, marginBottom: 10 }}>Time</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <View style={styles.dateContainer}>
                    <Icon name="access-time" size={24} color={colors.primary} />
                    <Text style={{ paddingLeft: 10 }}>{formData.taskTime ? formData.taskTime.toLocaleTimeString() : 'Select Time'}</Text>
                </View>
            </TouchableOpacity>
            {showTimePicker && (
                <DateTimePicker
                    value={formData.taskTime || new Date()}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                />
            )}
            <TextInput
                label="Task Description"
                value={formData.taskDescription}
                onChangeText={(text) => setFormData({ ...formData, taskDescription: text })}
                style={styles.input}
                multiline={true}
            />
            <Button
                mode="contained"
                style={styles.addButton}
                onPress={handleAddTask}
                labelStyle={styles.buttonText}
            >
                Add Task
            </Button>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000} // Adjust the duration as needed
            >
                {snackbarText}
            </Snackbar>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
    },
    input: {
        marginBottom: 16,
        backgroundColor: colors.background,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    addButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AddTaskScreen;
