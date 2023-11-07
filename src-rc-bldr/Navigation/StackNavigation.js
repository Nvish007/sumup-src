import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { BUILDRR_BLUE } from '../constants/Colors';
import HomeNavigation from './HomeNavigation';
// import Splash from '../Screen/Auth/Splash';
import Login from '../Screen/Auth/Login';
import Otp from '../Screen/Auth/Otp';
import HeaderTitle from '../components/headerTitle';
import CommonStyles from '../Screen/styles/CommonStyles';
import Register from '../Screen/Auth/Register';

const Stack = createStackNavigator();

const defaultHeaderOptions = {
  headerTitleStyle: CommonStyles.defaultHeaderTitle,
  headerStyle: CommonStyles.defaultHeader,
  headerTintColor: 'black',
  headerBackTitleVisible: false,
  headerTitleAlign: "center",
};

const StackNavigation = ({ params }) => (
  <Stack.Navigator
    initialRouteName={  "HomeNavigation"  }
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
    }}
  >
    {/* <Stack.Screen
      options={{
        headerShown: false
      }}
      name="Splash" component={Splash} /> */}
    <Stack.Screen
      options={{
        headerStyle: {
          backgroundColor: BUILDRR_BLUE
        },
        ...defaultHeaderOptions,
        headerTitle: () => <HeaderTitle title={'OTP Verification'} />,
      }}
      name="Otp"
      component={Otp} />
    <Stack.Screen
      options={{
        headerShown: false
      }}
      name="HomeNavigation" component={HomeNavigation} />
  </Stack.Navigator>
);

export default StackNavigation;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
});
