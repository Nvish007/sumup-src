import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import CommonStyles from '../../styles/CommonStyles';
import {
  backIcon,
  closeIcon,
  rightIcon,
} from '../../../constants/Images';
import SpaceStyles from '../../styles/SpaceStyles';

const GalleryView = ({setgalleryView, images, galleryView}) => {
  const image = images[galleryView.index];
  const isAvailableRightImage = images[galleryView.index + 1] || '';
  const isAvailableLeftImage = images[galleryView.index - 1] || '';
  const changeImage = state => {
    if (state == 'left') {
      setgalleryView(state => ({
        ...state,
        index: galleryView.index - 1,
      }));
    } else {
      setgalleryView(state => ({
        ...state,
        index: galleryView.index + 1,
      }));
    }
  };

  return (
    <Modal
      isVisible={galleryView.isVisible}>
      <View style={CommonStyles.modalWrapper}>
        <TouchableOpacity
          onPress={() =>
            setgalleryView(state => ({
              ...state,
              isVisible: false,
            }))
          }
          style={CommonStyles.closeIcon}>
          <Image source={closeIcon} style={CommonStyles.closeImage} />
        </TouchableOpacity>
        <View
          style={[
            SpaceStyles.itemCenter,
            CommonStyles.imageWrapper,
          ]}>
          <Image style={CommonStyles.galleryImg} source={{uri: image}} />
        </View>
        <View
          style={CommonStyles.nextPrevBtn}>
          {isAvailableLeftImage ? (
            <TouchableOpacity
              style={CommonStyles.iconWrapper}
              onPress={() => changeImage('left')}>
              <Image
                source={backIcon}
                style={CommonStyles.leftIcon}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {isAvailableRightImage && (
            <TouchableOpacity
              style={CommonStyles.iconWrapper}
              onPress={() => changeImage('right')}>
              <Image
                source={rightIcon}
                style={CommonStyles.rightIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default GalleryView;
