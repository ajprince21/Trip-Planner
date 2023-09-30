import 'react-native-gesture-handler';
import React from 'react'
import { StatusBar } from 'react-native'
import AppNavigator from './src/navigation/AppNavigator';
import colors from './src/global/colors';
import { Provider } from 'react-redux';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.statusbar}
      />
      <AppNavigator />
    </Provider>

  )
}

export default App