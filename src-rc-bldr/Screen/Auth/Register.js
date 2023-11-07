import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  requestMultiple,
  PERMISSIONS,
  openSettings,
  request,
} from 'react-native-permissions';
import Modal from 'react-native-modal';

import Swiper from 'react-native-swiper';
import constants from '../../constants';
import {BUILDRR_BLUE, LIGHTGRAY, WHITE} from '../../constants/Colors';
import {
    // addImage,
    backIcon,
    burger2,
    cake2,
    clock,
    dosa2,
    fries2,
    pasta2,
    rattingView,
    sandwich2,
    searchGray,
    shake2,
    thali2,
    pizza2,
    tempSlider1,
    tempSlider2,
    info,
  } from '../../constants/Images';
import AuthStyle from '../styles/AuthStyle';
import CommonStyles from '../styles/CommonStyles';
import SpaceStyles from '../styles/SpaceStyles';
import TextStyles from '../styles/TextStyles';
import styles from '../styles/Home';
import { handleLogin, handleSignUp } from '../../redux/auth';
import { isEmpty, showAlert } from '../../utils/native';
import firestore from '@react-native-firebase/firestore';
import UserService from '../../services/user';
import { updateToken } from '../../utils/fcm';

const dataSlider1 = [{image: tempSlider1}];
const dataSlider2 = [{image: tempSlider2}];

const WIDTH = constants.BaseStyle.DEVICE_WIDTH / 100;

const Register = ({navigation}) => {
    const dispatch = useDispatch();
      const isLoading = useSelector(state => state.loading.isLoading);
      const [isVsisbleLocationPermission, setIsVsisbleLocationPermission] =
        useState(false);
			const [validate, setValidate] = useState(false);
      const [user, setUser] = useState({
        email: '',
        password: '',
        cpassword: '',
        username: '',
        type: 'guest'
      });
			const [emailError, setEmailError] = useState(false);
		const [cpasswordError, setCpasswordError] = useState(false);


	const updateUserDetails = () => {
		UserService.setUser(user).then(async(resp) => {
			let token = await updateToken(resp.uid, 'new user');
			resp.token = token;
		})
	}

  const signup = () => {
			// setLoader(true);
			const response = (created, res) => {
        console.log('res', res);
				if (created === true) {
					user.uid = res.uid;
					delete user.password;
					delete user.cpassword;
					updateUserDetails();
				} else {
					if (res.message.includes('[auth/weak-password]')) {
						showAlert('Please enter a strong password.');
						return
					}
					if (res.message.includes('[auth/email-already-in-use]')) {
						showAlert('The email address is already in use by another account.');
						return
					}
					// setLoader(false);
				}
			};
			dispatch(handleSignUp({user, response}));
	};

	const onSubmit = async() => {
		setValidate(false);
		if (isValid() === false) {
			setValidate(true);
			return;
		}
		const isUniqueUserName = await checkUsernameAvailability(user.username);
		if (!isUniqueUserName) {
			showAlert(`Username ${user.username} already taken. Please choose a different one.`);
			return;
		}

		if (isValid()) {
			signup();
		}
	};

	const onChange = (type, value) => {
		if (type === 'email') {
			value = value.replace(/\s/g, '');
		}
		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
		setUser({
			...user,
			[type]: value
		});

		switch (type) {
			case 'email':
				if (reg.test(value) === false) {
					setEmailError(true);
					return false;
				} else {
					setEmailError(false);
				}
				break;
			case 'password':
				if (user.cpassword !== value) {
					setCpasswordError(true);
				} else {
					setCpasswordError(false);
				}
				break;
			case 'cpassword':
				if (user.password !== value) {
					setCpasswordError(true);
				} else {
					setCpasswordError(false);
				}
				break;
		}
	};

	const isValid = () => {
		if (isEmpty(user.email) || isEmpty(user.password) || isEmpty(user.cpassword) || isEmpty(user.username)) {
			return false;
		}

		if (emailError === true || cpasswordError === true) {
			return false;
		}

		return true;
	};

	const checkUsernameAvailability = async(username) => {
		const snapshot = await firestore().collection('users').where('username', '==', username).get();
		return snapshot.empty; // Returns true if no documents found with the same username
	};

    return (
        <ImageBackground
        source={require('../../Assets/backgroundImage.png')}
        style={CommonStyles.backgroundImage}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={BUILDRR_BLUE}
        />
        <View style={AuthStyle.containerWithoutBG}>
          <Modal isVisible={isVsisbleLocationPermission && !isLoading}>
            <View
              style={[CommonStyles.modalWrapper, SpaceStyles.paddingBottom5]}>
              <View style={[CommonStyles.imageWrapper, SpaceStyles.flexRow]}>
                <Image source={info} style={CommonStyles.infoIcon} />
                <Text
                  style={[
                    TextStyles.regular16Black,
                    {marginTop: 3, marginLeft: 8},
                  ]}>
                  Location permission is mandatory!
                </Text>
              </View>
              <View style={CommonStyles.openSettings}>
                <TouchableOpacity onPress={openSettings}>
                  <Text
                    style={[TextStyles.regular16Black, {color: BUILDRR_BLUE}]}>
                    Open Settings
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            style={CommonStyles.mainContainerWithoutBG}>
            
            <View>
              <View style={{height: 160, marginTop: WIDTH * 5}}>
                <Swiper
                  activeDotColor={WHITE}
                  horizontal={true}
                  autoplay={false}
                  dotStyle={CommonStyles.swiperDotStyle}
                  activeDotStyle={[
                    CommonStyles.swiperDotStyle,
                    {backgroundColor: BUILDRR_BLUE},
                  ]}>
                  {dataSlider2?.map(i => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate('ComponeyProfile')
                        }}
                        style={{width: WIDTH * 90, borderRadius: 15}}
                        activeOpacity={1}
                        key={i}>
                        <Image
                          source={i?.image}
                          style={CommonStyles.homeSwiperImage}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </Swiper>
              </View>
            </View>

            <View>
                <View>
                <Text style={TextStyles.boldCalluna16Black}>{'Email'}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={LIGHTGRAY}
                    onChangeText={(value) => {
                      onChange('email', value);
                    }}
                    value={user.email}
                />
                </View>
                <View>
                <Text style={TextStyles.boldCalluna16Black}>{'User name'}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="username"
                    placeholderTextColor={LIGHTGRAY}
										onChangeText={(value) => {
                      onChange('username', value);
                    }}
                    value={user.username}
                />
                </View>
                <View>
                <Text style={TextStyles.boldCalluna16Black}>{'Password'}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={LIGHTGRAY}
										onChangeText={(value) => {
                      onChange('password', value);
                    }}
                    value={user.password}
                />
                </View>
                <View>
                <Text style={TextStyles.boldCalluna16Black}>{'Confirm password'}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor={LIGHTGRAY}
										onChangeText={(value) => {
                      onChange('cpassword', value);
                    }}
                    value={user.cpassword}
                />
                </View>
            </View>
            <TouchableOpacity
                onPress={() => onSubmit()}
                style={[CommonStyles.updateButton, SpaceStyles.top2, SpaceStyles.width90, { alignSelf: 'center' }]}>
                <Text style={[TextStyles.bold16White]}>{"Register and chat"}</Text>
            </TouchableOpacity>
            <Text style={TextStyles.boldCalluna16Black}>{'Already have an account?'}</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={[CommonStyles.updateButton, SpaceStyles.top2, SpaceStyles.width90, { alignSelf: 'center' }]}>
                <Text style={[TextStyles.bold16White]}>{"Login"}</Text>
            </TouchableOpacity>
						{validate && <Text style={TextStyles.boldCalluna16Black}>{'Please fill all details'}</Text>}
          </ScrollView>
        </View>
        </ImageBackground>
    )
}

export default Register;
