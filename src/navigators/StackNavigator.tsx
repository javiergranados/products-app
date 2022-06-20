import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProtectedScreen from '../screens/ProtectedScreen';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProtectedScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <RootStack.Screen name="ProtectedScreen" component={ProtectedScreen} />
    </RootStack.Navigator>
  );
};

export default StackNavigator;
