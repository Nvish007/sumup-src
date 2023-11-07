import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import constants from '../../constants';
import {BUILDRR_BLUE} from '../../constants/Colors';
import {
  burger2,
  cake2,
  dosa2,
  fries2,
  pasta2,
  pizza2,
  // rattingView,
  sandwich2,
  shake2,
  thali2,
} from '../../constants/Images';
import CommonStyles from '../styles/CommonStyles';
import SpaceStyles from '../styles/SpaceStyles';
import TextStyles from '../styles/TextStyles';
import {restaurantTag} from '../../redux/restaurantsDetails';
import styles from '../styles/Home';

const categoryData = [
  {image: pizza2, name: 'Pizza'},
  {image: sandwich2, name: 'Sandwich'},
  {image: burger2, name: 'Burger'},
  {image: fries2, name: 'Fries'},
  {image: shake2, name: 'Shake'},
  {image: dosa2, name: 'Dosa'},
  {image: pasta2, name: 'Pasta'},
  {image: thali2, name: 'Thali'},
  {image: cake2, name: 'Cake'},
];

const WIDTH = constants.BaseStyle.DEVICE_WIDTH / 100;
const HEIGHT = constants.BaseStyle.DEVICE_HEIGHT / 100;

const Category = ({navigation}) => {
  const dispatch = useDispatch();

  const restaurantTypesInfo = useSelector(
    state => state.restaurantTypes.restaurantTypesInfo,
  );

  const keyExtractorCategory = (item, index) => index.toString();
  const renderItemCate = ({item, index}) => {
    return (
      <TouchableOpacity
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

  return (
    <ImageBackground
      source={require('../../Assets/backgroundImage.png')} // Hier geef je het pad naar je afbeelding op
      style={CommonStyles.backgroundImage}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[CommonStyles.mainContainerWithoutBG]}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={BUILDRR_BLUE}
        />
        {/* hide the publicity on top */}
        {/* <Image source={burger2} style={CommonStyles.catTopImage} />
            <View style={CommonStyles.catOfferView}>
                <Text style={[TextStyles.bold30, { color: WHITE }]}>50% Off</Text>
                <Text style={[TextStyles.mulishbold20, { color: WHITE }]}>King's Burger</Text>
                <View style={{}}>
                    <View style={[SpaceStyles.flexRow, { marginTop: HEIGHT * 12 }]}>
                        <Image style={CommonStyles.catRattingImage} source={rattingView} />
                        <Text style={[TextStyles.regular15White, SpaceStyles.left3, { marginTop: 2 }]}>{`(480)`}</Text>
                    </View>
                </View>
            </View> */}
          <FlatList
            keyExtractor={keyExtractorCategory}
            data={restaurantTypesInfo}
            numColumns={4}
            style={SpaceStyles.top3}
            renderItem={renderItemCate}
            scrollEnabled={false}
          />
      </ScrollView>
    </ImageBackground>
  );
};
export default Category;
