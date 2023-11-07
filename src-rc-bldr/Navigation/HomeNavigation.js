import * as React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BUILDRR_BLUE } from '../constants/Colors';
import CategoryStack from './CategoryStack';
import HomeStack from './HomeStack';
import MapStack from './MapStack';
import ProfileStack from './ProfileStack';
import TabBar from './TabBar';
// import WishlistStack from './WishlistStack';
import AboutUs from '../Screen/MyProfile/AboutUs';
import AllList from '../Screen/Home/AllList';
import CommonStyles from '../Screen/styles/CommonStyles';
import ComponeyProfile from '../Screen/Home/ComponeyProfile';
import Notification from '../Screen/Home/Notification';
import SearchScreen from '../Screen/Home/SearchScreen';
import ViewMap from '../Screen/Map/ViewMap';
import WriteReview from '../Screen/Home/WriteReview';
import FavouriteStack from './FavouriteStack';
import ChatStack from './ChatStack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const defaultHeaderOptions = {
    headerTitleStyle: CommonStyles.defaultHeaderTitle,
    headerStyle: CommonStyles.defaultHeader,
    headerTintColor: 'black',
    headerBackTitleVisible: false,
    headerTitleAlign: "center",
};

const HomeNavigation = (props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
            }}
        >
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="BottomTab" component={BootmTab} />
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: BUILDRR_BLUE
                    },
                    ...defaultHeaderOptions,
                }}
                name="ComponeyProfile" component={ComponeyProfile} />
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: BUILDRR_BLUE
                    },
                    ...defaultHeaderOptions,
                }}
                name="WriteReview" component={WriteReview} />
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: BUILDRR_BLUE
                    },
                    ...defaultHeaderOptions,
                }}
                name="Notification" component={Notification} />
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: BUILDRR_BLUE
                    },
                    ...defaultHeaderOptions,
                }}
                name="AboutUs" component={AboutUs} />
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: BUILDRR_BLUE
                    },
                    ...defaultHeaderOptions,
                }}
                name="SearchScreen" component={SearchScreen} />
            <Stack.Screen
                options={{
                   headerShown: false
                 }}
                name="AllList" component={AllList} />
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

function BootmTab(props) {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
            <Tab.Screen name="HomeStack" component={HomeStack} />
            {/* <Tab.Screen name="WishlistStack" component={WishlistStack} /> */}
            <Tab.Screen name="FavouriteStack" component={FavouriteStack} />
            <Tab.Screen name="CategoryStack" component={CategoryStack} />
            <Tab.Screen name="ChatStack" component={ChatStack} />
            <Tab.Screen name="ProfileStack" component={ProfileStack} />
        </Tab.Navigator>
    );
}

export default HomeNavigation;