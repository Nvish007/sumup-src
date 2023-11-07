import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import {BUILDRR_BLUE} from '../../../constants/Colors';
import CommonStyles from '../../styles/CommonStyles';
import GalleryView from './GalleryView';

const Gallery = ({realisationsImages}) => {
  const [galleryView, setgalleryView] = useState({
    isVisible: false,
    index: 0,
  });

  return (
    <SafeAreaView
      style={[
        CommonStyles.safeAreaView2,
        CommonStyles.marginTop10,
        CommonStyles.backgroundWhite,
      ]}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={BUILDRR_BLUE}
      />
      <ScrollView
        contentContainerStyle={CommonStyles.galleryScrollWrapper}>
        {realisationsImages &&
          realisationsImages?.value.map((res, index) => {
            return (
              <Pressable
                onPress={() =>
                  setgalleryView(state => ({
                    ...state,
                    index,
                    isVisible: true,
                  }))
                }
                style={CommonStyles.imageWrapper}>
                <Image
                  key={index}
                  source={{uri: res}}
                  style={CommonStyles.flatlistImage}
                />
              </Pressable>
            );
          })}
      </ScrollView>
      {realisationsImages?.value && realisationsImages?.value?.length > 0 && (
        <GalleryView
          images={realisationsImages?.value}
          galleryView={galleryView}
          setgalleryView={setgalleryView}
        />
      )}
    </SafeAreaView>
  );
};

export default Gallery;
