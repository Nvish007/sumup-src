import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BUILDRR_BLUE } from '../constants/Colors';
import ViewMap from '../Screen/Map/ViewMap';
import CommonStyles from '../Screen/styles/CommonStyles';

const Stack = createStackNavigator();

const defaultHeaderOptions = {
    headerTitleStyle: CommonStyles.defaultHeaderTitle,
    headerStyle: CommonStyles.defaultHeader,
    headerTintColor: 'black',
    headerBackTitleVisible: false,
    headerTitleAlign: "center",
};

const MapStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: BUILDRR_BLUE
                    },
                    ...defaultHeaderOptions,
                }}
                name="ViewMap" component={ViewMap} />
        </Stack.Navigator>
    );
}

export default MapStack;
