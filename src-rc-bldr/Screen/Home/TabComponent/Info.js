import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import NearYouCard from '../../../components/NearYouCard';
import {
  burger2,
  locationBlueIcon,
  // john,
  mailIcon,
  mobileIcon,
  networkIcon,
} from '../../../constants/Images';
// import NavigationService from "../../../Navigation/NavigationService";
import CommonStyles from '../../styles/CommonStyles';
import SpaceStyles from '../../styles/SpaceStyles';
import TextStyles from '../../styles/TextStyles';
import {fullNameOfLanguage} from '../../../utils/helpers';

const recentLocation = [
  {
    image: burger2,
    name: `Jin's Pizza`,
    cat: 'Pizza',
    location: 'Hello Street, USA',
  },
  {
    image: burger2,
    name: `King's Burger`,
    cat: 'Burger',
    location: 'Hello Street, USA',
  },
  {
    image: burger2,
    name: `Jin's Pizza`,
    cat: 'Pizza',
    location: 'Hello Street, USA',
  },
  {
    image: burger2,
    name: `King's Burger`,
    cat: 'Burger',
    location: 'Hello Street, USA',
  },
];

const Item = ({icon, label}) => (
  <View style={[SpaceStyles.flexRow, SpaceStyles.bottom1]}>
    <Image source={icon} style={CommonStyles.icon} />
    <Text style={[TextStyles.regular15Black, SpaceStyles.left3, {top: 2}]}>
      {label}
    </Text>
  </View>
);

const Info = ({navigation, profileInfo}) => {
  const renderRecentLocation = ({item, index}) => {
    return <NearYouCard index={index} item={item} />;
  };
  const language =
    profileInfo?.extra_info &&
    profileInfo?.extra_info.find(info => info.key == 'language');
  const languageInString = language && language?.value.replace(/["{}]/g, '');
  const languageInArray = languageInString.split(',');
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={CommonStyles.ProfileCardView}>
          {/* <View style={SpaceStyles.alignSpaceBlock}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{uri: profileInfo?.media[0]}}
                style={CommonStyles.infoProfileImage}
              />
              <View style={SpaceStyles.left3}>
                <Text style={[TextStyles.semiBold15Black, {top: 2}]}>
                  {profileInfo?.extra_info[0]?.title}
                </Text>
                <Text style={[TextStyles.regular15DarkGray, {top: 2}]}>
                  (Franchise Owner)
                </Text>
              </View>
            </View>
            <Image source={whaatsapp} style={{height: 40, width: 40}} />
          </View> */}
          {/* <View style={[SpaceStyles.flexRow, SpaceStyles.top2]}> */}
          {profileInfo?.contact?.address && (
            <Item
              icon={locationBlueIcon}
              label={profileInfo?.contact?.address}
            />
          )}
          {profileInfo?.contact?.telephone && (
            <Item icon={mobileIcon} label={profileInfo.contact.telephone} />
          )}
          {profileInfo?.contact?.website && (
            <Item icon={networkIcon} label={profileInfo.contact.website} />
          )}

          {profileInfo?.contact?.email && (
            <Item icon={mailIcon} label={profileInfo.contact.email} />
          )}

          {language && languageInArray && (
            <View style={[SpaceStyles.flexRow]}>
              <Image source={networkIcon} style={CommonStyles.icon} />
              <View style={[SpaceStyles.flexRow]}>
                {languageInArray &&
                  languageInArray.map((lang, index) => (
                    <Text style={[TextStyles.regular15Black, {marginLeft: 10}]}>
                      {fullNameOfLanguage(lang)}{`${languageInArray.length - 1 != index && ',' }`}
                    </Text>
                  ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};
export default Info;
