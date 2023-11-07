import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Text,
  Share,
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

const HeaderWithoutBar = ({navigation, headerTitle}) => {
  
  const shareFun = async () => {
    try {
        const result = await Share.share({
            message: `Welcome to Buildrr App`
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
            } else {
            }
        } else if (result.action === Share.dismissedAction) {
        }
    } catch (error) {
        alert(error.message);
    }
}
  return (
    <View style={styles.safeareaView}>
      <View style={styles.topBoxes}>
        <TouchableOpacity style={styles.bar}>
          <Text style={[TextStyles.regularPrimary12]}>
            Jouw onderneming ook op BUILDRR?
          </Text>
          <Text style={TextStyles.primaryBold14}>
            Join now! €361/<Text style={[TextStyles.lightPrimary14]}>jaar</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={shareFun} style={[styles.rightBar, styles.rightSideRadius]}>
          <Image source={shareIcon} style={styles.shareIcon} />
          <View>
            <Text style={[TextStyles.lightPrimary12]}>Deel Buildrr</Text>
            <Text style={TextStyles.lightPrimary12}>met vrienden</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <View style={styles.headerIconWrapper}>
          <Image style={styles.headerIcon} source={headerLogo} />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchScreen')}
            style={styles.searchBox}>
            <Image source={searchGray} style={{marginLeft: 10}} />
            <TextInput
              style={styles.input}
              placeholder="Vind Buildrr dicht bij jou"
              placeholderTextColor={LIGHTGRAY}
              editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.instagram.com/buildrr_app/')
            }
            style={styles.instagramIconContainer}>
            <MaterialCommunityIcon
              size={40}
              name="instagram"
              style={styles.instagramIcon}
            />
          </TouchableOpacity>
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
    </View>
  );
};

export default HeaderWithoutBar;
