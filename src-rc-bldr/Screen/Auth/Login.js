import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import SpaceStyles from '../styles/SpaceStyles';
import TextStyles from '../styles/TextStyles';
import CommonStyles from '../styles/CommonStyles';
import {BUILDRR_BLUE, LIGHTGRAY, PRIMARY_COLOR} from '../../constants/Colors';
import {
  HeaderRightLogo,
  builderImage,
  headerLogo,
  primaryBG,
} from '../../constants/Images';
import constants from '../../constants';
import styles from '../styles/pages/Auth/index';
import HeaderRight from '../../components/HeaderRight';
import {useDispatch} from 'react-redux';
import {handleSignIn} from '../../redux/auth';
import {isEmpty} from '../../utils/native';

function Login({navigation}) {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  const dispatch = useDispatch();
  const [email, setEmail] = useState({
    value: '',
    error: '',
  });

  const [password, setPassword] = useState({
    value: '',
    error: '',
  });

  const passwordInput = useRef();

  const onChangeEmail = value => {
    setEmail(prevState => ({
      ...prevState,
      value: value.replace(/\s/g, ''),
    }));
  };

  const onChangePassword = value => {
    setPassword(prevState => ({
      ...prevState,
      value: value,
    }));
  };

  const isValid = () => {
    if (isEmpty(email.value)) {
      setEmail(prevState => ({
        ...prevState,
        error: 'Email is requied!',
      }));
    }

    if (!isEmpty(email.value)) {
      if(reg.test(email.value) === false){
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
        error: 'Please enter a strong password.',
      }));
    } else {
      setPassword(prevState => ({
        ...prevState,
        error: '',
      }));
    }
    if (
      isEmpty(email.value) ||
      reg.test(email.value) === false ||
      isEmpty(password.value) ||
      password.value.length < 6
    ) {
      return false;
    }
    return true;
  };

  const handleBlueValidation = key => {
    switch (key) {
      case 'email':
        if (isEmpty(email.value)) {
          setEmail(prevState => ({
            ...prevState,
            error: 'Email is requied!',
          }));
        }
    
        if (!isEmpty(email.value)) {
          if(reg.test(email.value) === false){
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
      default:
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
            error: 'Please enter a strong password.',
          }));
        } else {
          setPassword(prevState => ({
            ...prevState,
            error: '',
          }));
        }
        return;
    }
  };

  const onSubmit = () => {
    if (isValid() === false) {
      return;
    }
    if (isValid() === true) {
      const user = {
        email: email.value,
        password: password.value,
      };
      dispatch(handleSignIn(user));
    }
  };

  useEffect(() => {
    setEmail(prevState => ({
      ...prevState,
      error: '',
    }));
    setPassword(prevState => ({
      ...prevState,
      error: '',
    }));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => '',
      headerLeft: () => '',
      headerRight: () => (
        <HeaderRight
          iconName={HeaderRightLogo}
          iconWrapperStyle={CommonStyles.headerRightIconWrapper}
          imageStye={CommonStyles.headerRightIcon}
        />
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      scrollEnabled={true}
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
      enableAutomaticScroll={false}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={PRIMARY_COLOR}
      />
      <ImageBackground
        source={primaryBG} // Hier geef je het pad naar je afbeelding op
        style={CommonStyles.backgroundImage}>
        <SafeAreaView style={{backgroundColor: BUILDRR_BLUE}} />
        <View style={{}}>
          <View>
            <View style={styles.yellowBar}>
              <Text
                style={[TextStyles.boldDarkPrimary12, styles.joinbuildrrText]}>
                JOIN BUILDRR
              </Text>
              <Text style={[TextStyles.lightPrimary14, styles.lineHeight]}>
                €361/jaar
              </Text>
            </View>
            <View style={SpaceStyles.top7}>
              <View style={styles.headerIconWrapper}>
                <Image style={styles.builderLogo} source={headerLogo} />
              </View>
              <View style={styles.authWrapper}>
                <Text style={[TextStyles.primaryBold14, styles.loginText]}>
                  {'Inloggen'}
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="E-mail adres"
                    placeholderTextColor={LIGHTGRAY}
                    value={email.value}
                    onChangeText={onChangeEmail}
                    keyboardType="email-address"
                    onBlur={() => handleBlueValidation('email')}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      passwordInput.current.focus();
                    }}
                    blurOnSubmit={false}
                    autoCapitalize="none"
                  />
                  {!isEmpty(email.error) && (
                    <Text style={styles.error}>{email.error}</Text>
                  )}
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Paswoord"
                    placeholderTextColor={LIGHTGRAY}
                    onChangeText={onChangePassword}
                    value={password.value}
                    onBlur={() => handleBlueValidation('password')}
                    ref={passwordInput}
                    onSubmitEditing={() => onSubmit()}
                    secureTextEntry={true}
                  />
                  {!isEmpty(password.error) && (
                    <Text style={styles.error}>{password.error}</Text>
                  )}
                </View>
                <TouchableOpacity onPress={onSubmit} style={styles.loginBtn}>
                  <Text style={[TextStyles.bold16White, styles.loginBtnText]}>
                    {'Log in'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Onboarding')}
                  style={styles.createAccountBtn}>
                  <Text style={[TextStyles.bold16White, styles.textCenter]}>
                    {'ACCOUNT AANMAKEN'}
                  </Text>
                </TouchableOpacity>
                <View style={styles.builderIconWrapper}>
                  <Image style={styles.builderIcon} source={builderImage} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}
export default Login;
