/* eslint-disable react/prop-types */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Profile from '~/pages/Profile';
import DeliveryRoutes from './delivery.routes';

const Tab = createBottomTabNavigator();

const UserRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#7d40e7',
        inactiveTintColor: '#999',
      }}
      initialRouteName="Delivery"
    >
      <Tab.Screen
        name="Delivery"
        component={DeliveryRoutes}
        options={{
          tabBarLabel: 'Entregas',
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <Icon name="reorder" size={40} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Meu perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" size={40} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserRoutes;
