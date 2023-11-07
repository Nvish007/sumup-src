import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Text,
} from 'react-native';
import React from 'react';
import styles from '../Screen/styles/component/HeaderWithLogo';
import {headerLogo, searchGray, shareIcon} from '../constants/Images';
import {LIGHTGRAY} from '../constants/Colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import {backIcon} from '../constants/Images';
import HeaderTitle from './headerTitle';
import TextStyles from '../Screen/styles/TextStyles';

const HeaderWithLogo = ({navigation, headerTitle}) => {
  return (
    <SafeAreaView style={styles.safeareaView}>
      <View style={styles.header}>
        <View style={styles.headerIconWrapper}>
          <Image style={styles.headerIcon} source={headerLogo} />
        </View>
      </View>
      {headerTitle && navigation && (
        <View style={styles.headerStack}>
          <HeaderLeft
            text={''}
            iconName={backIcon}
            onPress={() => navigation.goBack()}
          />
          <HeaderTitle title={headerTitle} />
          <HeaderRight />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HeaderWithLogo;
