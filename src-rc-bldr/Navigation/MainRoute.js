import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigation from './StackNavigation';

const Stack = createStackNavigator();

const MainRoute = ({ params }) => (
    <Stack.Navigator
        initialRouteName={"StackNavigation"}
        screenOptions={{
            headerShown: false,
        }} >
        <Stack.Screen name="StackNavigation" component={StackNavigation} />
    </Stack.Navigator>
);

export default MainRoute;
