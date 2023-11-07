import React from "react";
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import StarRating from "react-native-star-rating";
import constants from "../../../constants";
import { john } from "../../../constants/Images";
import NavigationService from "../../../Navigation/NavigationService";
import CommonStyles from "../../styles/CommonStyles";
import SpaceStyles from "../../styles/SpaceStyles";
import TextStyles from "../../styles/TextStyles";

const HEIGHT = (constants.BaseStyle.DEVICE_HEIGHT / 100)
const WIDTH = (constants.BaseStyle.DEVICE_WIDTH / 100)

const data = [{}, {}, {}]

const Review = ({ navigation }) => {
    const keyExtractorReview = (item, index) => index.toString();

    const renderReview = ({ item, index }) => {
        return (
            <View style={SpaceStyles.width70}>
                <View style={SpaceStyles.flexRow}>
                    <Image source={john} style={{ height: 50, width: 50, borderRadius: 10 }} />
                    <View style={SpaceStyles.left3}>
                        <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.width70]}>
                            <Text style={[TextStyles.semiBold16Black]}>{'John Doe'}</Text>
                            <Text style={[TextStyles.regular12DarkGray]}>{`24 Feb, 2022`}</Text>
                        </View>
                        <View style={SpaceStyles.width25}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={3}
                                fullStarColor={'#F1C40F'}
                                emptyStarColor={'#BDC3C7'}
                                fullStar={'star'}
                                emptyStar={'star-border'}
                                halfStar={'star-half'}
                                iconSet={'MaterialIcons'}
                                starSize={15}
                            />
                        </View>
                    </View>
                </View>
                <Text style={[TextStyles.regular15Black, SpaceStyles.top1]}>{`“Beautiful Place for explore nature”`}</Text>
                <View style={[CommonStyles.lineView, SpaceStyles.vertical2, SpaceStyles.top2, SpaceStyles.width90]} />
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
                keyExtractor={keyExtractorReview}
                data={data}
                scrollEnabled={false}
                style={SpaceStyles.top2}
                renderItem={renderReview}
            />
            <TouchableOpacity
                onPress={() => NavigationService.navigate('WriteReview')}
                style={[CommonStyles.updateButton, SpaceStyles.width90, { alignSelf: 'center', marginVertical: HEIGHT * 1 }]}>
                <Text style={[TextStyles.bold16White]}>{"Write a review"}</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
export default Review
