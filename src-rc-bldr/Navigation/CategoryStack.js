import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Category from '../Screen/Category/Category';
import HeaderWithLogo from '../components/HeaderWithLogo';

const Stack = createStackNavigator();

const CategoryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                       options={{
                        header: ({ navigation }) => <HeaderWithLogo navigation={navigation} headerTitle="Categorie" />
                     }}
                name="Category" component={Category} />

        </Stack.Navigator>
    );
}

export default CategoryStack;
