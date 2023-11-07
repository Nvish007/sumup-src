import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favourite from '../Screen/Favourite';
import HeaderWithLogo from '../components/HeaderWithLogo';

const Stack = createStackNavigator();

const FavouriteStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                   header: ({ navigation }) => <HeaderWithLogo navigation={navigation} headerTitle="Favorieten" />
                }}
                name="Favourite" component={Favourite} />

        </Stack.Navigator>
    );
}

export default FavouriteStack;
