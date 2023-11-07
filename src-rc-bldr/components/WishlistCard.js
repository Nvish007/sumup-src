import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RenderHtml from 'react-native-render-html';

import {clock} from '../constants/Images';
import NavigationService from '../Navigation/NavigationService';
import CommonStyles from '../Screen/styles/CommonStyles';
import SpaceStyles from '../Screen/styles/SpaceStyles';
import TextStyles from '../Screen/styles/TextStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {addToFavourite, removeFromFavourite} from '../redux/favourite/slice';

const WishlistCard = ({item, index}) => {
  const dispatch = useDispatch();
  const {favouriteItems} = useSelector(state => state.favourite);

  const isFavourite = favouriteItems.find(favouriteItem => {
    return (
      String(item?.general?.name).toLowerCase() ==
      String(favouriteItem?.general?.name).toLowerCase()
    );
  });

  return (
    <TouchableOpacity
      onPress={() =>
        NavigationService.navigate('ComponeyProfile', {
          itemInfo: item,
        })
      }
      style={CommonStyles.wishlistMainView}>
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
      <Image
        style={CommonStyles.wishlistImageView}
        source={{uri: item?.general?.tags[0]?.image}}
      />
      <View style={SpaceStyles.spaceHorizontal}>
        <View style={SpaceStyles.alignSpaceBlock}>
          <Text style={[TextStyles.bold18, SpaceStyles.top1]}>
            {item?.general?.name || ''}
          </Text>
          <View style={SpaceStyles.flexRow}>
            {/* <View style={CommonStyles.rattingView}>
                            <Text style={[TextStyles.regular15White, { top: 2 }]}>{`5.0`}</Text>
                            <Image source={{whiteStarIcon}} />
                        </View>
                        <Text style={[TextStyles.regular16Black, SpaceStyles.left2, { top: 2 }]}>{`200`}</Text> */}
          </View>
        </View>
        <View style={SpaceStyles.alignSpaceBlock}>
          <RenderHtml
            source={{
              html: item?.general?.description,
            }}
          />
        </View>
        <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.bottom1]}>
          {/* <Text style={TextStyles.semiBold15}>{`20% OFF`}</Text> */}
          <View />
          <View style={SpaceStyles.flexRow}>
            <Image source={clock} />
            <Text
              style={[
                TextStyles.regular14black,
                SpaceStyles.left1,
                {marginTop: 2},
              ]}>{`20 min`}</Text>
            <View style={CommonStyles.verticleLine} />
            <Text
              style={[
                TextStyles.regular14black,
                SpaceStyles.left1,
                {marginTop: 2},
              ]}>{`2.3 km`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default WishlistCard;
