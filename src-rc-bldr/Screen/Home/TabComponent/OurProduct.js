import React from "react";
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { burger2, rattingView, sandwich2 } from "../../../constants/Images";
import { UnFavSvg } from "../../../constants/SvgImage";
import NavigationService from "../../../Navigation/NavigationService";
import NearYouCard from "../../../components/NearYouCard";
import CommonStyles from "../../styles/CommonStyles";
import SpaceStyles from "../../styles/SpaceStyles";
import TextStyles from "../../styles/TextStyles";

const recentLocation = [
    { image: sandwich2, name: `Jin's Pizza`, cat: 'Pizza', location: 'Hello Street, USA' },
    { image: sandwich2, name: `King's Burger`, cat: 'Burger', location: 'Hello Street, USA' },
    { image: sandwich2, name: `Jin's Pizza`, cat: 'Pizza', location: 'Hello Street, USA' },
    { image: sandwich2, name: `King's Burger`, cat: 'Burger', location: 'Hello Street, USA' },
]

const recommended = [
    { image: burger2, name: 'Tikki Burger' },
    { image: burger2, name: 'Veg Pizza Puff' },
    { image: burger2, name: 'Aloo Naan' },
]

const OurProduct = ({ navigation }) => {

    const renderRecentLocation = ({ item, index }) => {
        return (
            <NearYouCard index={index} item={item} />
        )
    }

    const keyExtractorRec = (item, index) => index.toString();
    const renderItemRec = ({ item, index }) => {
        return (
            <View style={CommonStyles.recommendedMainView}>
                <Image style={CommonStyles.recommendedView} source={item?.image} />
                <View style={SpaceStyles.spaceHorizontal}>
                    <View style={SpaceStyles.alignSpaceBlock}>
                        <Text style={[TextStyles.bold14black, SpaceStyles.top1]}>{item?.name}</Text>
                        <UnFavSvg />
                    </View>
                    <View style={SpaceStyles.alignSpaceBlock}>
                        <View style={[SpaceStyles.flexRow, SpaceStyles.bottom1]}>
                            <Text style={[TextStyles.regular14black, { top: 2 }]}>{`Rs. 60/-`}</Text>
                        </View>
                        <View style={SpaceStyles.flexRow}>
                            <Image style={{ height: 14, width: 80 }} source={rattingView} />
                            <Text style={[TextStyles.regular14DarkGray, SpaceStyles.left2, { top: 2 }]}>{`(435)`}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
            <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.vertical2, SpaceStyles.width90]}>
                <Text style={[TextStyles.bold20]}>{`Starters`}</Text>
                <TouchableOpacity onPress={() => NavigationService.navigate('AllList', {
                    title: 'Starters'
                })}>
                    <Text style={[TextStyles.regular14black]}>{`See all`}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                keyExtractor={keyExtractorRec}
                data={recommended}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItemRec}
                style={SpaceStyles.width90}
            />

            <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.vertical2, SpaceStyles.width90]}>
                <Text style={[TextStyles.bold20]}>{`Main Course`}</Text>
                <TouchableOpacity onPress={() => NavigationService.navigate('AllList', {
                    title: 'Main Course'
                })}>
                    <Text style={[TextStyles.regular14black]}>{`See all`}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                keyExtractor={keyExtractorRec}
                data={recommended}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 0 }}
                renderItem={renderItemRec}
                style={SpaceStyles.width90}
            />

            <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.vertical2, SpaceStyles.width90]}>
                <Text style={[TextStyles.bold20]}>{`Suggested Restaurants`}</Text>
                <TouchableOpacity onPress={() => NavigationService.navigate('AllList', {
                    title: 'Suggested Restaurants'
                })}>
                    <Text style={[TextStyles.regular14black]}>{`See all`}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={recentLocation}
                scrollEnabled={false}
                style={{ marginTop: 0 }}
                renderItem={renderRecentLocation}
                style={SpaceStyles.width90}
            />
        </ScrollView>
    )
}
export default OurProduct
