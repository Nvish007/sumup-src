import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  requestMultiple,
  PERMISSIONS,
  openSettings,
  request,
} from 'react-native-permissions';
import Modal from 'react-native-modal';

import Swiper from 'react-native-swiper';
import constants from '../../constants';
import {BUILDRR_BLUE, WHITE} from '../../constants/Colors';
import {
  // addImage,
  backIcon,
  burger2,
  cake2,
  clock,
  dosa2,
  fries2,
  pasta2,
  rattingView,
  sandwich2,
  searchGray,
  shake2,
  thali2,
  pizza2,
  tempSlider1,
  tempSlider2,
  info,
} from '../../constants/Images';
// import {NotificationHomeSvg} from '../../constants/SvgImage';
import {nearestNearestItems} from '../../redux/nearestSearch/index';
import {
  restaurantTypes,
  restaurantTag,
} from '../../redux/restaurantsDetails/index';
import {getCurrentLocation, isIOS} from '../../utils/helpers';
import HeaderLeft from '../../components/HeaderLeft';
import HeaderRight from '../../components/HeaderRight';
import NearYouCard from '../../components/NearYouCard';
import RecommendedCard from '../../components/RecommendedCard';
import AuthStyle from '../styles/AuthStyle';
import CommonStyles from '../styles/CommonStyles';
import SpaceStyles from '../styles/SpaceStyles';
import TextStyles from '../styles/TextStyles';
import styles from '../styles/Home';
import {saveCurrentLocation} from '../../redux/nearestSearch/slice';
const dataSlider1 = [{image: tempSlider1}];
const dataSlider2 = [{image: tempSlider2}];
const categoryData = [
  {image: pizza2, name: 'Pizza', id: '1'},
  {image: sandwich2, name: 'Sandwich', id: '2'},
  {image: burger2, name: 'Burger', id: '3'},
  {image: fries2, name: 'Fries', id: '4'},
  {image: shake2, name: 'Shake', id: '5'},
  {image: dosa2, name: 'Dosa', id: '6'},
  {image: pasta2, name: 'Pasta', id: '7'},
  {image: thali2, name: 'Thali', id: '8'},
  {image: cake2, name: 'Cake', id: '9'},
];
const recommended = [
  {image: pizza2, name: "Jimmy's Pizza", id: '1'},
  {image: pizza2, name: 'Uniq Cafe', id: '2'},
  {image: pizza2, name: 'Your Brger', id: '3'},
];
const recentLocation = [
  {
    image: dosa2,
    name: "Jimmy's Pizza",
    cat: 'Pizza',
    location: 'Hello Street, USA',
    id: '1',
  },
  {
    image: dosa2,
    name: 'Your Burger',
    cat: 'Burger',
    location: 'Hello Street, USA',
    id: '2',
  },
  {
    image: dosa2,
    name: "Jimmy's Pizza",
    cat: 'Pizza',
    location: 'Hello Street, USA',
    id: '3',
  },
  {
    image: dosa2,
    name: 'Your Burger',
    cat: 'Burger',
    location: 'Hello Street, USA',
    id: '4',
  },
];

const WIDTH = constants.BaseStyle.DEVICE_WIDTH / 100;

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const restaurantTypesInfo = useSelector(
    state => state.restaurantTypes.restaurantTypesInfo,
  );
  const isLoading = useSelector(state => state.loading.isLoading);
  const nearestNearestItemsInfo = useSelector(
    state => state.nearestNearestItems.nearestNearestItemsInfo,
  );
  const {favouriteItems} = useSelector(state => state.favourite);

  const [isMore, setIsMore] = useState(false);
  const [isVsisbleLocationPermission, setIsVsisbleLocationPermission] =
    useState(false);
  const [restaurantTypesDetails, setRestaurantTypesDetails] = useState([]);
  const [nearestNearestItemsDetails, setNearestNearestItemsDetails] = useState(
    [],
  );
  const [showCount, setShowCount] = useState(8);

  // Top header view
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight />,
      headerLeft: () => (
        <HeaderLeft
          text={''}
          iconName={backIcon}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (restaurantTypesInfo) {
      setRestaurantTypesDetails(restaurantTypesInfo);
    }
  }, [restaurantTypesInfo]);

  useEffect(() => {
    if (nearestNearestItemsInfo) {
      setNearestNearestItemsDetails(nearestNearestItemsInfo);
    }
  }, [nearestNearestItemsInfo]);

  useEffect(() => {
    dispatch(restaurantTypes());
  }, []);

  useEffect(() => {
    askLocationPermission();
  }, []);

  const askLocationPermission = () => {
    requestMultiple(
      isIOS()
        ? [
            PERMISSIONS.IOS.LOCATION_ALWAYS,
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          ]
        : [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
    ).then(statuses => {
      if (isIOS()) {
        if (
          statuses['ios.permission.LOCATION_ALWAYS'] == 'granted' ||
          statuses['ios.permission.LOCATION_WHEN_IN_USE'] == 'granted'
        ) {
          handleNearItems();
        } else {
          setIsVsisbleLocationPermission(true);
        }
      } else {
        if (statuses['android.permission.ACCESS_FINE_LOCATION'] == 'granted') {
          handleNearItems();
        } else {
          setIsVsisbleLocationPermission(true);
        }
      }
    });
  };

  const handleNearItems = async () => {
    const currentLocation = await getCurrentLocation();
    dispatch(saveCurrentLocation(currentLocation));
    dispatch(nearestNearestItems(currentLocation));
  };

  const renderItemCate = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          dispatch(restaurantTag({tag_id: item?.id}));
          navigation.navigate('AllList', {
            title: item?.title,
          });
        }}
        style={CommonStyles.catImageView}>
        <Image style={CommonStyles.catImage} source={{uri: item?.image}} />
        <Text
          numberOfLines={1}
          style={[
            TextStyles.adelleSansregular14black,
            SpaceStyles.top1,
            styles.primaryColor,
          ]}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  // See more category logic
  const seeMore = isMore => {
    setIsMore(isMore);
    if (isMore) {
      setShowCount(restaurantTypesDetails.length);
    } else {
      setShowCount(8);
    }
  };

  const renderItemRec = ({item, index}) => {
    return <RecommendedCard item={item} />;
  };

  const renderTopBrands = ({item, index}) => {
    return <RecommendedCard item={item} />;
  };

  const renderRecentLocation = ({item, index}) => {
    const isFavourite = favouriteItems.find(favouriteItem => {
      return (
        String(item?.general?.name).toLowerCase() ==
        String(favouriteItem?.general?.name).toLowerCase()
      );
    });
    return (
      <NearYouCard
        showUnfavouriteItems
        isFavourite={isFavourite}
        item={item}
        index={index}
      />
    );
  };
  return (
    <>
      <ImageBackground
        source={require('../../Assets/backgroundImage.png')} // Hier geef je het pad naar je afbeelding op
        style={CommonStyles.backgroundImage}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={BUILDRR_BLUE}
        />
        <View style={AuthStyle.containerWithoutBG}>
          <Modal isVisible={isVsisbleLocationPermission && !isLoading}>
            <View
              style={[CommonStyles.modalWrapper, SpaceStyles.paddingBottom5]}>
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
            style={CommonStyles.mainContainerWithoutBG}>
            {/* Top Swiper */}
            <View>
              <View style={{height: 160, marginTop: WIDTH * 5}}>
                <Swiper
                  activeDotColor={WHITE}
                  horizontal={true}
                  autoplay={false}
                  dotStyle={CommonStyles.swiperDotStyle}
                  activeDotStyle={[
                    CommonStyles.swiperDotStyle,
                    {backgroundColor: BUILDRR_BLUE},
                  ]}>
                  {dataSlider1?.map(i => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate('ComponeyProfile')
                        }}
                        style={{width: WIDTH * 90, borderRadius: 15}}
                        activeOpacity={1}
                        key={i}>
                        <Image
                          source={i?.image}
                          style={CommonStyles.homeSwiperImage}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </Swiper>
              </View>
            </View>
            <Text style={TextStyles.boldCalluna16Black}>{'Categorieën'}</Text>
            <View>
              <FlatList
                nestedScrollEnabled
                keyExtractor={(item, index) => item.id.toString()}
                data={restaurantTypesDetails.slice(0, showCount)}
                numColumns={4}
                renderItem={renderItemCate}
              />
              {/* hide see more/ less change slice array to direct array*/}
              <TouchableOpacity
                onPress={() => seeMore(!isMore)}
                style={[CommonStyles.seeMoreTextView, {}]}>
                <Text style={TextStyles.regular14White}>
                  {isMore ? `Zie minder` : `Toon meer categorieën`}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={{height: 160, marginTop: WIDTH * 5}}>
                <Swiper
                  activeDotColor={WHITE}
                  horizontal={true}
                  autoplay={false}
                  dotStyle={CommonStyles.swiperDotStyle}
                  activeDotStyle={[
                    CommonStyles.swiperDotStyle,
                    {backgroundColor: BUILDRR_BLUE},
                  ]}>
                  {dataSlider2?.map(i => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate('ComponeyProfile')
                        }}
                        style={{width: WIDTH * 90, borderRadius: 15}}
                        activeOpacity={1}
                        key={i}>
                        <Image
                          source={i?.image}
                          style={CommonStyles.homeSwiperImage}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </Swiper>
              </View>
            </View>
            <View>
              <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.bottom1]}>
                <Text style={TextStyles.bold20}>{'Dicht bij jou'}</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AllList', {
                      title: 'Dicht bij jou',
                    })
                  }>
                  <Text style={TextStyles.regular14black}>{'Alles zien'}</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                {nearestNearestItemsDetails &&
                nearestNearestItemsDetails.length >= 0 ? (
                  <FlatList
                    keyExtractor={(item, index) => index}
                    data={nearestNearestItemsDetails}
                    scrollEnabled={false}
                    renderItem={renderRecentLocation}
                  />
                ) : (
                  <Text>Even geduld</Text>
                )}
              </ScrollView>
            </View>
            <View></View>
          </ScrollView>
        </View>
      </ImageBackground>
    </>
  );
};
export default Home;
