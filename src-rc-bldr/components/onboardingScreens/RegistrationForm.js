import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {openSettings} from 'react-native-permissions';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import constants from '../../constants';
import {BUILDRR_BLUE, LIGHTGRAY} from '../../constants/Colors';
import {info} from '../../constants/Images';
import CommonStyles from '../../Screen/styles/CommonStyles';
import SpaceStyles from '../../Screen/styles/SpaceStyles';
import TextStyles from '../../Screen/styles/TextStyles';
import styles from '../../Screen/styles/pages/Auth/index';
import {handleSignUp} from '../../redux/auth';
import {isEmpty} from '../../utils/native';
import firestore from '@react-native-firebase/firestore';
import UserService from '../../services/user';
import {loadingEnd, loadingStart} from '../../redux/common/slice';
import {isIOS} from '../../utils/helpers';

const WIDTH = constants.BaseStyle.DEVICE_WIDTH / 100;
const {height} = Dimensions.get('screen');
const RegistrationForm = ({navigation}) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loading.isLoading);
  const [isVsisbleLocationPermission, setIsVsisbleLocationPermission] =
    useState(false);
  const [email, setEmail] = useState({
    value: '',
    error: '',
  });
  const [username, setUsername] = useState({
    value: '',
    error: '',
  });
  const [password, setPassword] = useState({
    value: '',
    error: '',
  });
  const [cpassword, setCpassword] = useState({
    value: '',
    error: '',
  });
  const updateUserDetails = uid => {
    const user = {
      email: email.value,
      // password: password.value,
      // cpassword: cpassword.value,
      username: username.value,
      fullname: username.value,
      uid,
      type: 'guest',
    };
    UserService.setUser(user).then(async resp => {
      navigation.navigate('RegisterSuccess', {uid});
    });
  };

  const signup = () => {
    dispatch(loadingStart());
    const response = (created, res) => {
      if (created === true) {
        updateUserDetails(res.user.uid);
      } else {
        if (res.message.includes('[auth/weak-password]')) {
          setPassword(prevState => ({
            ...prevState,
            error: 'Please enter a strong password.',
          }));
          return;
        }
        if (res.message.includes('[auth/email-already-in-use]')) {
          setEmail(prevState => ({
            ...prevState,
            error: 'The email address is already in use by another account.',
          }));
          return;
        }
        dispatch(loadingEnd());
      }
    };
    const user = {
      email: email.value,
      password: password.value,
      cpassword: cpassword.value,
      username: username.value,
      type: 'guest',
    };
    dispatch(handleSignUp({user, response}));
  };

  const onSubmit = async () => {
    if (!isValid()) {
      return;
    }
    const isUniqueUserName = await checkUsernameAvailability(username.value);
    if (!isUniqueUserName) {
      setUsername(prevState => ({
        ...prevState,
        error: `Username ${username.value} already taken. Please choose a different one.`,
      }));
      return;
    }

    if (isValid()) {
      signup();
    }
  };

  const handleBlueValidation = key => {
    switch (key) {
      case 'email':
        if (isEmpty(email.value)) {
          setEmail(prevState => ({
            ...prevState,
            error: 'Email is requied!',
          }));
          return;
        }
        if (!isEmpty(email.value)) {
          if (reg.test(email.value) === false) {
            setEmail(prevState => ({
              ...prevState,
              error: 'Enter Valid Email',
            }));
          } else {
            setEmail(prevState => ({
              ...prevState,
              error: '',
            }));
          }
        }
        return;
      case 'username':
        if (isEmpty(username.value)) {
          setUsername(prevState => ({
            ...prevState,
            error: 'Username is requied!',
          }));
        } else {
          setUsername(prevState => ({
            ...prevState,
            error: '',
          }));
        }
        return;
      case 'password':
        if (isEmpty(username.value)) {
          setPassword(prevState => ({
            ...prevState,
            error: 'Password is requied!',
          }));
          return;
        }
        if (!isEmpty(password.value) && password.value.length < 6) {
          setPassword(prevState => ({
            ...prevState,
            error: 'Password is required at least 6 characters!',
          }));
          return;
        } else {
          setPassword(prevState => ({
            ...prevState,
            error: '',
          }));
        }
        return;
      default:
        if (password.value != cpassword.value) {
          setCpassword(prevState => ({
            ...prevState,
            error: 'Password and Confirm password did not match',
          }));
        } else {
          setCpassword(prevState => ({
            ...prevState,
            error: '',
          }));
        }
        return;
    }
  };

  const isValid = () => {
    if (isEmpty(email.value)) {
      setEmail(prevState => ({
        ...prevState,
        error: 'Email is requied!',
      }));
    }
    if (!isEmpty(email.value)) {
      if (reg.test(email.value) === false) {
        setEmail(prevState => ({
          ...prevState,
          error: 'Enter Valid Email',
        }));
      } else {
        setEmail(prevState => ({
          ...prevState,
          error: '',
        }));
      }
    }

    if (isEmpty(username.value)) {
      setUsername(prevState => ({
        ...prevState,
        error: 'Username is requied!',
      }));
    } else {
      setUsername(prevState => ({
        ...prevState,
        error: '',
      }));
    }

    if (isEmpty(password.value)) {
      setPassword(prevState => ({
        ...prevState,
        error: 'Password is requied!',
      }));
      return;
    }
    if (!isEmpty(password.value) && password.value.length < 6) {
      setPassword(prevState => ({
        ...prevState,
        error: 'Password is required at least 6 characters!',
      }));
      return;
    } else {
      setPassword(prevState => ({
        ...prevState,
        error: '',
      }));
    }
    if (password.value != cpassword.value) {
      setCpassword(prevState => ({
        ...prevState,
        error: 'Password and Confirm password did not match',
      }));
    } else {
      setCpassword(prevState => ({
        ...prevState,
        error: '',
      }));
    }
    if (
      isEmpty(email.value) ||
      reg.test(email.value) === false ||
      isEmpty(password.value) ||
      password.value.length < 6 ||
      password.value != cpassword.value ||
      isEmpty(username.value)
    ) {
      return false;
    }
    return true;
  };
  const checkUsernameAvailability = async username => {
    const snapshot = await firestore()
      .collection('users')
      .where('username', '==', username)
      .get();
    return snapshot.empty; // Returns true if no documents found with the same username
  };
  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        scrollEnabled={true}
        extraHeight={height / 2}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{flexGrow: 1}}
        >
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={BUILDRR_BLUE}
        />
        <Modal isVisible={isVsisbleLocationPermission && !isLoading}>
          <View style={[CommonStyles.modalWrapper, SpaceStyles.paddingBottom5]}>
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
          style={styles.authWrapper}>
          <View style={{marginTop: WIDTH * 7}}>
            <Text style={styles.blueRightText}>
              Maak nu een account aan als Buildrr
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{'Vul je e-mail adres in:'}</Text>
              <TextInput
                style={styles.borderedInput}
                placeholder="E-mail adres"
                placeholderTextColor={LIGHTGRAY}
                onBlur={() => handleBlueValidation('email')}
                onChangeText={value => {
                  setEmail(prevState => ({
                    ...prevState,
                    value: value.replace(/\s/g, ''),
                  }));
                }}
                value={email.value}
                blurOnSubmit={false}
                autoCapitalize="none"
              />
              {!isEmpty(email.error) && (
                <Text style={styles.error}>{email.error}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{'Kies je gebruikersnaam'}</Text>
              <TextInput
                style={styles.borderedInput}
                placeholder="Gebruikersnaam"
                placeholderTextColor={LIGHTGRAY}
                onBlur={() => handleBlueValidation('username')}
                onChangeText={value => {
                  setUsername(prevState => ({
                    ...prevState,
                    value,
                  }));
                }}
                value={username.value}
                blurOnSubmit={false}
                autoCapitalize="none"
              />
              {!isEmpty(username.error) && (
                <Text style={styles.error}>{username.error}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{'Kies je paswoord'}</Text>
              <TextInput
                style={styles.borderedInput}
                placeholder="Paswoord"
                onBlur={() => handleBlueValidation('password')}
                placeholderTextColor={LIGHTGRAY}
                onChangeText={value => {
                  setPassword(prevState => ({
                    ...prevState,
                    value,
                  }));
                }}
                value={password.value}
                blurOnSubmit={false}
                autoCapitalize="none"
                secureTextEntry={true}
              />
              {!isEmpty(password.error) && (
                <Text style={styles.error}>{password.error}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{'Herhaal je paswoord'}</Text>
              <TextInput
                style={styles.borderedInput}
                placeholder="Herhaal paswoord"
                placeholderTextColor={LIGHTGRAY}
                onBlur={() => handleBlueValidation('cpassword')}
                onChangeText={value => {
                  setCpassword(prevState => ({
                    ...prevState,
                    value,
                  }));
                }}
                value={cpassword.value}
                blurOnSubmit={false}
                secureTextEntry={true}
                autoCapitalize="none"
              />
              {!isEmpty(cpassword.error) && (
                <Text style={styles.error}>{cpassword.error}</Text>
              )}
            </View>
          </View>
          {/* <TouchableOpacity
            onPress={() => onSubmit()}
            style={[
              CommonStyles.updateButton,
              SpaceStyles.top2,
              SpaceStyles.width90,
              {alignSelf: 'center'},
            ]}>
            <Text style={[TextStyles.bold16White]}>{'Register and chat'}</Text>
          </TouchableOpacity>
          <Text style={TextStyles.boldCalluna16Black}>
            {'Already have an account?'}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[
              CommonStyles.updateButton,
              SpaceStyles.top2,
              SpaceStyles.width90,
              {alignSelf: 'center'},
            ]}>
            <Text style={[TextStyles.bold16White]}>{'Login'}</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => onSubmit()}
            style={[
              CommonStyles.updateButton,
              SpaceStyles.top2,
              SpaceStyles.width85,
              {
                alignSelf: 'center',
                backgroundColor: '#2A7CAF',
                borderRadius: 30,
                paddingVertical: 8,
                marginTop: 20,
              },
            ]}>
            <Text style={[TextStyles.bold16White]}>{'Volgende'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegistrationForm;
