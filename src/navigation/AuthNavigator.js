import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// You will create these screens later
const PlaceholderScreen = () => null; 

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator initialRouteName="Customers" activeColor="#fff">
    <Tab.Screen
      name="Customers"
      component={PlaceholderScreen} // Replace with CustomerListScreen
      options={{ tabBarLabel: 'Customers', tabBarIcon: ({ color }) => <Icon name="account-group" color={color} size={26} /> }}
    />
    <Tab.Screen
      name="Dashboard"
      component={PlaceholderScreen} // Replace with DashboardScreen
      options={{ tabBarLabel: 'Dashboard', tabBarIcon: ({ color }) => <Icon name="chart-bar" color={color} size={26} /> }}
    />
  </Tab.Navigator>
);

export default AppNavigator;