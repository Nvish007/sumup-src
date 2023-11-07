import {View, Text, FlatList, ImageBackground} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import NearYouCard from '../../components/NearYouCard';
import CommonStyles from '../styles/CommonStyles';

const Favorite = () => {
  const {favouriteItems} = useSelector(state => state.favourite);

  const renderRecentLocation = ({item, index}) => {
    return <NearYouCard isFavourite item={item} index={index} />;
  };
  return (
    <ImageBackground
      source={require('../../Assets/backgroundImage.png')} // Hier geef je het pad naar je afbeelding op
      style={CommonStyles.backgroundImage}>
      <View style={CommonStyles.listContainer}>
        {favouriteItems && favouriteItems.length > 0 ? (
          <FlatList
            keyExtractor={(item, index) => index}
            data={favouriteItems}
            scrollEnabled={false}
            renderItem={renderRecentLocation}
          />
        ) : (
          <Text>Je hebt nog geen favorieten toegekend</Text>
        )}
      </View>
    </ImageBackground>
  );
};

export default Favorite;
