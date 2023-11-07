import React, {useLayoutEffect} from 'react';
import {FlatList, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {BUILDRR_BLUE} from '../../constants/Colors';
import {backIcon, pizza2} from '../../constants/Images';
import HeaderLeft from '../../components/HeaderLeft';
import HeaderRight from '../../components/HeaderRight';
import HeaderTitle from '../../components/headerTitle';
import WishlistCard from '../../components/WishlistCard';
import CommonStyles from '../styles/CommonStyles';
import SpaceStyles from '../styles/SpaceStyles';
import NearYouCard from '../../components/NearYouCard';
import HeaderWithLogo from '../../components/HeaderWithLogo';

const data = [
  {
    image: pizza2,
    name: `Jimmy's Pizza`,
    cat: `Fast food, Burger, Beverages`,
  },
  {
    image: pizza2,
    name: `Jimmy's Pizza`,
    cat: `Fast food, Burger, Beverages`,
  },
  {
    image: pizza2,
    name: `Jimmy's Pizza`,
    cat: `Fast food, Burger, Beverages`,
  },
  {
    image: pizza2,
    name: `Jimmy's Pizza`,
    cat: `Fast food, Burger, Beverages`,
  },
];

const AllList = ({navigation, route}) => {
  const {title} = route?.params;
  const restaurantTagInfo = useSelector(
    state => state.restaurantTypes.restaurantTagInfo,
  );
  const nearestNearestItemsInfo = useSelector(
    state => state.nearestNearestItems.nearestNearestItemsInfo,
  );
  const {favouriteItems} = useSelector(state => state.favourite);

  const isLoading = useSelector(state => state.loading.isLoading);
  const renderRecentLocation = ({item, index}) => {
    const isFavourite = favouriteItems.find(favouriteItem => {
      return (
        String(item?.general?.name).toLowerCase() ==
        String(favouriteItem?.general?.name).toLowerCase()
      );
    });
    return <NearYouCard isFavourite={isFavourite} item={item} index={index} />;
  };
  const itemLength =
    title == 'Near you'
      ? nearestNearestItemsInfo?.length
      : restaurantTagInfo?.length;
  return (
    <View style={CommonStyles.safeAreaView}>
      <HeaderWithLogo
        headerTitle={title || 'Explore by Category'}
        navigation={navigation}
      />
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={BUILDRR_BLUE}
      />
      <View
        style={[
          SpaceStyles.spaceHorizontal,
          itemLength > 0 && !isLoading && SpaceStyles.top3,
        ]}>
        {!isLoading && (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={
              title == 'Near you' ? nearestNearestItemsInfo : restaurantTagInfo
            }
            showsVerticalScrollIndicator={false}
            renderItem={renderRecentLocation}
          />
        )}
        
      </View>
      {restaurantTagInfo.length == 0 && !isLoading && title != 'Near you' && (
          <View style={CommonStyles.noData}>
            <Text>Data not found</Text>
          </View>
        )}
        {nearestNearestItemsInfo.length == 0 &&
          title == 'Near you' &&
          !isLoading && (
            <View style={CommonStyles.noData}>
              <Text>Data not found</Text>
            </View>
          )}
    </View>
  );
};
export default AllList;
