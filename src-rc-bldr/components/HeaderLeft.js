import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import CommonStyles from '../Screen/styles/CommonStyles'
import SpaceStyles from '../Screen/styles/SpaceStyles'
import TextStyles from '../Screen/styles/TextStyles'

function HeaderLeft({ text, iconName, onPress, iconStyle = {}, textStyles = {} }) {
    return (
        <View style={[SpaceStyles.spaceHorizontal, SpaceStyles.flexRow]}>
            <TouchableOpacity
                style={CommonStyles.headerLeftView}
                onPress={onPress}>
                <Image
                    source={iconName}
                    style={iconStyle}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <Text style={[TextStyles.bold15White, textStyles]}>{text}</Text>
        </View>
    )
}

export default HeaderLeft
