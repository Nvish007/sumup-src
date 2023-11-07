import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StatusBar, FlatList, View } from 'react-native';
import {useSelector} from 'react-redux';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import constants from '../../constants';
import { BUILDRR_BLUE } from '../../constants/Colors';
import { backIcon, pizza2 } from '../../constants/Images';
import HeaderLeft from '../../components/HeaderLeft';
import HeaderRight from '../../components/HeaderRight';
import HeaderTitle from '../../components/headerTitle';
import RecommendedCard from '../../components/RecommendedCard';
import CommonStyles from '../styles/CommonStyles';

const HEIGHT = constants.BaseStyle.DEVICE_HEIGHT / 100;
const WIDTH = constants.BaseStyle.DEVICE_WIDTH / 100;

const recommended = [
  { image: pizza2, name: "Jimmy's Cafe" },
  { image: pizza2, name: 'Black Cafe' },
  { image: pizza2, name: 'The Moon' },
];

const ViewMap = ({navigation}) => {
  const nearestNearestItemsInfo = useSelector((state) => state.nearestNearestItems.nearestNearestItemsInfo);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title={"Map"} />,
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

  const renderTopBrands = ({ item, index }) => {
    return <RecommendedCard item={item} isFromMap={true} />;
  };

  return (
    <SafeAreaView
      style={[CommonStyles.safeAreaView2, { backgroundColor: '#F2F2F2' }]}
    >
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={BUILDRR_BLUE}
      />
      <MapView
        zoomEnabled={true}
        // provider={PROVIDER_GOOGLE}  // No need for ios
        style={{ width: WIDTH * 100, height: HEIGHT * 90 }}
        region={{
          latitude: 50.74573970232628,
          longitude: 3.5966476134226397,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{
            latitude: 50.74573970232628,
            longitude: 3.5966476134226397,
          }}
          draggable
          pinColor={BUILDRR_BLUE}
        />
        <Marker
          coordinate={{
            latitude: 50.95969760647624,
            longitude: 3.5693838542030822,
          }}
          draggable
          pinColor={BUILDRR_BLUE}
        />
      </MapView>

      <View style={{ position: 'absolute', bottom: 0 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={nearestNearestItemsInfo}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderTopBrands}
        />
      </View>
    </SafeAreaView>
  );
}

export default ViewMap;
