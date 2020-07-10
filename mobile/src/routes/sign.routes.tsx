import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '~/pages/SignIn';

const Sign = createStackNavigator();

const SignRoutes: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Sign.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Sign.Screen name="SignIn" component={SignIn} />
      </Sign.Navigator>
    </>
  );
};

export default SignRoutes;
