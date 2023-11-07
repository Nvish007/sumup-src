import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {clock, rattingView} from '../constants/Images';
// import { UnFavSvg } from "../constants/SvgImage";
import NavigationService from '../Navigation/NavigationService';
import CommonStyles from '../Screen/styles/CommonStyles';
import SpaceStyles from '../Screen/styles/SpaceStyles';
import TextStyles from '../Screen/styles/TextStyles';
import {useDispatch, useSelector} from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {removeFromFavourite, addToFavourite} from '../redux/favourite/slice';
import {calculateDistanceAndTime} from '../utils/helpers';

const NearYouCard = ({
  item,
  isFavourite,
  index,
}) => {
  const dispatch = useDispatch();
  const {myCurrentLocation} = useSelector(state => state.nearestNearestItems);
  const location2 = {
    latitude: item.contact.latitude,
    longitude: item.contact.longitude,
  };
  const {distanceInMeters} = calculateDistanceAndTime(
    myCurrentLocation,
    location2,
  );
  
  return (
    <TouchableOpacity
      onPress={() =>
        NavigationService.navigate('ComponeyProfile', {
          itemInfo: item,
        })
      }
      style={CommonStyles.nearYouCardView}>
      <View style={SpaceStyles.flexRow}>
        <Image
          style={CommonStyles.nearYouImage}
          source={{uri: item?.general?.tags[0]?.image}}
        />
        <View style={SpaceStyles.left3}>
          <Text style={TextStyles.bold18}>{item?.general?.name}</Text>
          <Text style={TextStyles.regularCalluna16Gray}>
            {item?.general?.tags[0]?.title}
          </Text>
          {/*<Text style={TextStyles.regular16Black}>{item?.contact?.address}</Text>*/}
          <View style={SpaceStyles.flexRow}>
            <Image source={clock} />

            <Text
              style={[
                TextStyles.regular14black,
                SpaceStyles.left1,
                {marginTop: 2},
              ]}>{`${((distanceInMeters || 0) / 1000).toFixed()} km`}</Text>
          </View>
          {/* <View style={[SpaceStyles.flexRow, { marginTop: 4 }]}>
                        <Image style={CommonStyles.rattingStar} source={rattingView} />
                        <Text style={[TextStyles.regular16DarkGray, SpaceStyles.left3, { marginTop: 2 }]}>{`(26)`}</Text>
                    </View> */}
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          isFavourite
            ? dispatch(removeFromFavourite(index))
            : dispatch(addToFavourite(item))
        }
        style={CommonStyles.favIconView}>
        <AntDesign
          name="heart"
          style={
            isFavourite ? CommonStyles.activeFavIcon : CommonStyles.favIcon
          }
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default NearYouCard;
