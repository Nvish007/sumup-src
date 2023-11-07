import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import styles from '../styles/pages/OnboardingStyles';
import {BUILDRR_BLUE, PRIMARY_COLOR} from '../../constants/Colors';
import HeaderRight from '../../components/HeaderRight';
import {
  HeaderRightLogo,
  builderImage,
  defaultBG,
} from '../../constants/Images';
import CommonStyles from '../styles/CommonStyles';
import SpaceStyles from '../styles/SpaceStyles';
import TextStyles from '../styles/TextStyles';
import OverViewScreen1 from '../../components/onboardingScreens/OverviewScreen1';
import OverViewScreen2 from '../../components/onboardingScreens/OverviewScreen2';
import RegistrationForm from '../../components/onboardingScreens/RegistrationForm';

const OnboardingScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => '',
      headerLeft: () => null,
      headerRight: () => (
        <HeaderRight
          iconName={HeaderRightLogo}
          iconWrapperStyle={CommonStyles.headerRightIconWrapper}
          imageStye={CommonStyles.headerRightIcon}
        />
      ),
    });
  }, [navigation]);

  const handleNext = () => {
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex === 2) {
      setCurrentIndex(0);
      console.log('Navigate to the next screen or take action here.');
    }
  };
  const Page01 = () => {
    return (
      <View style={styles.slide}>
        <Text style={styles.text}>
          {'Cool dat jij ook Buildrr-klant wil worden! '}
        </Text>
        <Text style={styles.text}>
          {'(Opgepast! Enkel voor zelfstandigen)'}
        </Text>
        <Text style={styles.text}>{'Pricesetting'}</Text>
        <Text style={styles.text}>
          {
            'Bij ons ben jij heel het jaar door zichtbaar en vindbaar via de app voor maar €1,99 per dag. De prijs van 1 kopje koffie per dag dus ! Met andere woorden, je betaalt slechts 726 euro per jaar. Prijs kwaliteit de beste reclame in zowel België als Nederland. Geen extra kosten per klik of contact'
          }
        </Text>
        <Text style={styles.text}>{'EARLY BIRD KORTING! €361/jaar'}</Text>
      </View>
    );
  };

  const Page02 = () => {
    return (
      <View style={styles.slide}>
        <Text style={styles.text}>{'EARLY BIRD KORTING !'}</Text>
        <Text style={styles.text}>{'€361/jaar! (i.p.v.: €726)'}</Text>
        <Text style={styles.text}>
          {'Geniet nu van de Early bird korting!'}
        </Text>
      </View>
    );
  };

  const Page03 = () => {
    return (
      <View style={styles.slide}>
        <Text style={styles.text}>
          {'Cool dat jij ook Buildrr-klant wil worden! '}
        </Text>
        <Text style={styles.text}>
          {'(Opgepast! Enkel voor zelfstandigen)'}
        </Text>
      </View>
    );
  };

  const buttonText =
    currentIndex === 1 ? 'Klant worden en profiel aanmaken' : 'Volgende';

  return (
    <>
      <SafeAreaView style={{backgroundColor: BUILDRR_BLUE}} />
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={PRIMARY_COLOR}
      />
      <View style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <View style={{justifyContent: 'flex-end'}}>
            <Image style={styles.headerIcon} source={builderImage} />
          </View>
          <View style={styles.buildrWorden}>
            <Text style={[TextStyles.mulishBold40, styles.buildrWordenText]}>
              Buildrr worden
            </Text>
          </View>
        </View>
        <ImageBackground
          source={defaultBG}
          style={CommonStyles.backgroundImage}>
          {currentIndex === 0 ? (
            <OverViewScreen1 />
          ) : currentIndex === 1 ? (
            <OverViewScreen2 />
          ) : (
            <RegistrationForm navigation={navigation} />
          )}
          {currentIndex < 2 && (
            <TouchableOpacity
              onPress={handleNext}
              style={[
                CommonStyles.updateButton,
                SpaceStyles.top2,
                SpaceStyles.width85,
                {
                  alignSelf: 'center',
                  backgroundColor: '#2A7CAF',
                  borderRadius: 30,
                  paddingVertical: 8
                },
              ]}>
              <Text style={[TextStyles.bold16White]}>{buttonText}</Text>
            </TouchableOpacity>
          )}
        </ImageBackground>
      </View>
    </>
  );
};

export default OnboardingScreen;
