import React, {useLayoutEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  Image,
  View,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import SpaceStyles from '../styles/SpaceStyles';
import TextStyles from '../styles/TextStyles';
import CommonStyles from '../styles/CommonStyles';
import {BUILDRR_BLUE, PRIMARY_COLOR} from '../../constants/Colors';
import {
  HeaderRightLogo,
  clap,
  headerLogo,
  primaryBG,
} from '../../constants/Images';
import styles from '../styles/pages/Auth/index';
import HeaderRight from '../../components/HeaderRight';


function RegisterSuccess({navigation, route}) {
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

  
  const uid = route?.params?.uid || null;
  const openWebLink = () => {
    const url = `https://buildrr.redbit.work/nl/complete/${uid}`;
    Linking.openURL(url)
      .catch((err) => console.error('An error occurred', err));
  }

  return (
    <ImageBackground
      source={primaryBG} // Hier geef je het pad naar je afbeelding op
      style={CommonStyles.backgroundImage}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={PRIMARY_COLOR}
      />
      <SafeAreaView style={{backgroundColor: BUILDRR_BLUE}} />
      <View style={styles.descWrapper}>
        <View>
          <View style={SpaceStyles.top5}>
            <View style={styles.headerIconWrapper}>
              <Image style={styles.builderLogo} source={headerLogo} />
            </View>
            <View>
              <Image style={styles.clapIcon} source={clap} />
            </View>
            <Text style={styles.successTitle}>
              Gefeliciteerd met je nieuwe Builder account !
            </Text>
            <Text style={styles.successDesc}>
              We hebben om je profiel af te werkrn nog al je basis gegevens,
              info over je zaak, en als het kan je logo en enkele foto's van je
              nodig.
            </Text>
            <Text style={styles.successDesc}>
              Het is super easy en het duur max 5 minuten om een prachtige
              profielpagina klaar te maken.
            </Text>
            <Text style={styles.successDesc}>
              Klik hier en maak je Buildrr pegina.
            </Text>
            <TouchableOpacity
                onPress={openWebLink}
                style={styles.verdernBtn}>
                <Text style={[TextStyles.bold16White, styles.loginBtnText]}>{'GA VERDER NAAR DE WEBSITE'}</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
export default RegisterSuccess;
