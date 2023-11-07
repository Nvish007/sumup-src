import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screen/Home/Home';
import HeaderWithLogo from '../components/HeaderWithLogo';
import HeaderWithoutBar from '../components/HeaderWithoutBar';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    header: ({ navigation }) => <HeaderWithoutBar navigation={navigation} />
                 }}
                name="Home" component={Home} />

        </Stack.Navigator>
    );
}

export default HomeStack;
