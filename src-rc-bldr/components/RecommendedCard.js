import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { distenceIcon, rattingView } from "../constants/Images";
import { UnFavSvg } from "../constants/SvgImage";
import NavigationService from "../Navigation/NavigationService";
import CommonStyles from "../Screen/styles/CommonStyles";
import SpaceStyles from "../Screen/styles/SpaceStyles";
import TextStyles from "../Screen/styles/TextStyles";

const RecommendedCard = ({ item, isFromMap }) => {
    return (
        <TouchableOpacity
            onPress={() => NavigationService.navigate('ComponeyProfile', {
                itemInfo: item
            })}
            style={CommonStyles.recommendedMainView}>
            <Image style={CommonStyles.recommendedView} source={{uri:item?.general?.tags[0].image}} />
            <View style={SpaceStyles.spaceHorizontal}>
                <View style={SpaceStyles.alignSpaceBlock}>
                    <Text style={[TextStyles.bold14black, SpaceStyles.top1]}>{item?.general?.name}</Text>
                    {
                        (!isFromMap) && <UnFavSvg />
                    }
                </View>
                <Text style={TextStyles.semBold12DarkGray}>{item?.contact?.address}</Text>
                <View style={SpaceStyles.alignSpaceBlock}>
                    <Text style={TextStyles.regular14black}>{`Closing soon..`}</Text>
                </View>
                {
                    (!isFromMap) &&  <View style={SpaceStyles.alignSpaceBlock}>
                    <View style={[SpaceStyles.flexRow, SpaceStyles.bottom1]}>
                        <Image style={CommonStyles.distanceIcon} source={distenceIcon} />
                        <Text style={[TextStyles.regular14black, SpaceStyles.left3, { top: 2 }]}>{`2.3 km`}</Text>
                    </View>
                    <Image style={CommonStyles.rattingStar} source={rattingView} />
                </View>
                }
            </View>
        </TouchableOpacity>
    )
}
export default RecommendedCard
