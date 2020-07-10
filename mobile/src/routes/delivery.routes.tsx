import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '~/pages/Delivery/Dashboard';
import Details from '~/pages/Delivery/Details';
import Problems from '~/pages/Delivery/Problems';
import CreateProblem from '~/pages/Delivery/CreateProblem';
import Signature from '~/pages/Delivery/Signature';

export type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  Details: { id: number };
  Problems: { id: number };
  CreateProblem: { id: number; courierId: string };
  Signature: { id: number; courierId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const DeliveryRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 18 },
        headerTitleAlign: 'center',
      }}
      initialRouteName="Dashboard"
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: true, title: 'Detalhes da encomenda' }}
      />
      <Stack.Screen
        name="Problems"
        component={Problems}
        options={{ headerShown: true, title: 'Visualizar problemas' }}
      />
      <Stack.Screen
        name="CreateProblem"
        component={CreateProblem}
        options={{ headerShown: true, title: 'Informar problema' }}
      />
      <Stack.Screen
        name="Signature"
        component={Signature}
        options={{ headerShown: true, title: 'Confirmar entrega' }}
      />
    </Stack.Navigator>
  );
};

export default DeliveryRoutes;
