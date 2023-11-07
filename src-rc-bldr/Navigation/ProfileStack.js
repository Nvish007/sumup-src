import React, {useEffect} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {BUILDRR_BLUE} from '../constants/Colors';
import MyProfile from '../Screen/MyProfile/MyProfile';
import CommonStyles from '../Screen/styles/CommonStyles';
import ContactUs from '../Screen/MyProfile/ContactUs';
import EditProfile from '../Screen/MyProfile/EditProfile';
import TermsofUse from '../Screen/MyProfile/TermsofUse';
import Login from '../Screen/Auth/Login';
import Register from '../Screen/Auth/Register';
import OnboardingScreen from '../Screen/MyProfile/OnboardingScreen';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import RegisterSuccess from '../Screen/MyProfile/RegisterSuccess';
import {useIsFocused} from '@react-navigation/native';

const Stack = createStackNavigator();

const defaultHeaderOptions = {
  headerTitleStyle: CommonStyles.defaultHeaderTitle,
  headerStyle: CommonStyles.defaultHeader,
  headerTintColor: 'black',
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
};

const ProfileStack = () => {
  const isFocused = useIsFocused();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigation = useNavigation();
  // const [route, setRoute] = useState();
  useEffect(() => {
    if (isFocused) {
      if (isLoggedIn) {
        navigation.navigate('MyProfile');
      } else {
        navigation.navigate('Login');
      }
    }
  }, [isLoggedIn, navigation, isFocused]);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
      }}
      initialRouteName={isLoggedIn ? 'MyProfile' : 'Login'}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: BUILDRR_BLUE,
          },
          ...defaultHeaderOptions,
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: BUILDRR_BLUE,
          },
          ...defaultHeaderOptions,
        }}
        name="MyProfile"
        component={MyProfile}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: BUILDRR_BLUE,
          },
          ...defaultHeaderOptions,
        }}
        name="Onboarding"
        component={OnboardingScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: BUILDRR_BLUE,
          },
          ...defaultHeaderOptions,
        }}
        name="RegisterSuccess"
        component={RegisterSuccess}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: BUILDRR_BLUE,
          },
          ...defaultHeaderOptions,
        }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: BUILDRR_BLUE,
          },
          ...defaultHeaderOptions,
        }}
        name="ContactUs"
        component={ContactUs}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: BUILDRR_BLUE,
          },
          ...defaultHeaderOptions,
        }}
        name="TermsofUse"
        component={TermsofUse}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: BUILDRR_BLUE,
          },
          ...defaultHeaderOptions,
        }}
        name="EditProfile"
        component={EditProfile}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
