import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import CommonStyles from '../Screen/styles/CommonStyles'
import SpaceStyles from '../Screen/styles/SpaceStyles'

function HeaderRight({ iconName, onPress = () => { }, iconWrapperStyle, imageStye = {} }) {
    return (
        <View style={[SpaceStyles.spaceHorizontal, SpaceStyles.flexRow, iconWrapperStyle]}>
            <TouchableOpacity
                style={CommonStyles.headerLeftView}
                onPress={onPress}>
                <Image
                    source={iconName}
                    resizeMode='contain'
                    style={imageStye}
                />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderRight