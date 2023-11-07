import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BUILDRR_BLUE } from '../constants/Colors';
import CommonStyles from '../Screen/styles/CommonStyles';
import Wishlist from '../Screen/Wishlist/Wishlist';
import HeaderTitle from '../components/headerTitle';

const defaultHeaderOptions = {
    headerTitleStyle: CommonStyles.defaultHeaderTitle,
    headerStyle: CommonStyles.defaultHeader,
    headerTintColor: 'black',
    headerBackTitleVisible: false,
    headerTitleAlign: "center",
};

const Stack = createStackNavigator();
const WishlistStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: BUILDRR_BLUE
                    },
                    ...defaultHeaderOptions,
                    headerTitle: () => <HeaderTitle title={'Wishlist'} />,
                }}
                name="Wishlist" component={Wishlist} />
        </Stack.Navigator>
    );
}

export default WishlistStack;