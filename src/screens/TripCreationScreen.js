import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../global/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as yup from 'yup';
import Loading from '../components/Loading';

const TripCreationScreen = ({ navigation }) => {
  const [tripData, setTripData] = useState({
    tripName: '',
    destination: '',
    startDate: null,
    endDate: null,
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [isLoading, setLoading] = useState(false);

  // Yup schema for form validation
  const validationSchema = yup.object().shape({
    tripName: yup.string().required('Trip Name is required'),
    destination: yup.string().required('Destination is required'),
    startDate: yup.date().nullable(),
    endDate: yup.date().nullable(),
  });

  const createTrip = async () => {
    try {
      // Validate form data
      await validationSchema.validate(tripData, { abortEarly: false });

      // Ensure the user is logged in
      setLoading(true);
      const user = auth().currentUser;
      if (!user) {
        console.error('User not logged in');
        return;
      }

      // Get the user's UID
      const userUid = user.uid;

      // Reference to the Firestore collection for trips
      const tripsCollection = firestore().collection('trips');

      // Add the trip document to Firestore
      await tripsCollection.add({
        ...tripData,
        startDate: tripData.startDate ? tripData.startDate.toISOString() : null,
        endDate: tripData.endDate ? tripData.endDate.toISOString() : null,
        userId: userUid,
      });

      // Clear the form data after successfully adding the trip
      setTripData({
        tripName: '',
        destination: '',
        startDate: null,
        endDate: null,
      });

      setSnackbarText('Trip added to Firestore successfully');
      setSnackbarVisible(true);
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Handle Yup validation errors
        const validationErrors = error.inner.map((e) => e.message);
        setSnackbarText(validationErrors.join('\n'));
      } else {
        setSnackbarText('An error occurred while creating the trip.');
      }

      // Show Snackbar with error message
      setSnackbarVisible(true);
    } finally {
      setLoading(false)
    }
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Plan a new trip</Text>
      <TextInput
        label="Trip Name"
        value={tripData.tripName}
        onChangeText={(text) => setTripData({ ...tripData, tripName: text })}
        style={styles.input}
        theme={{
          colors: {
            primary: colors.primary,
          },
        }}
      />
      <TextInput
        label="Where to go?"
        value={tripData.destination}
        onChangeText={(text) => setTripData({ ...tripData, destination: text })}
        style={styles.input}
        theme={{
          colors: {
            primary: colors.primary,
          },
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button onPress={showStartDatePickerModal} mode="contained" style={styles.datePickerButton}>
          {tripData.startDate ? tripData.startDate.toDateString() : 'Select Start Date'}
        </Button>
        {showStartDatePicker && (
          <DateTimePicker
            value={tripData.startDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartDatePicker(false);
              if (selectedDate) {
                setTripData({ ...tripData, startDate: selectedDate });
              }
            }}
          />
        )}
        <Button onPress={showEndDatePickerModal} mode="contained" style={styles.datePickerButton}>
          {tripData.endDate ? tripData.endDate.toDateString() : 'Select End Date'}
        </Button>
        {showEndDatePicker && (
          <DateTimePicker
            value={tripData.endDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndDatePicker(false);
              if (selectedDate) {
                setTripData({ ...tripData, endDate: selectedDate });
              }
            }}
          />
        )}
      </View>
      <Button mode="contained" onPress={createTrip} style={styles.createButton} theme={{
        colors: {
          primary: colors.primaryButtonTxt,
        },
      }}>
        Create Trip
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'OK',
          onPress: () => { },
        }}
      >
        {snackbarText}
      </Snackbar>
      <Loading visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.grey1,
  },
  input: {
    marginBottom: 16,
    backgroundColor: colors.background,
  },
  datePickerButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: colors.primary,
  },
  createButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
  },
});

export default TripCreationScreen;
