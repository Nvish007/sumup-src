import React, { useLayoutEffect } from "react";
import { SafeAreaView, StatusBar, View, FlatList } from "react-native";
import SpaceStyles from "../styles/SpaceStyles";
import CommonStyles from "../styles/CommonStyles";
import { BUILDRR_BLUE } from "../../constants/Colors";
import { backIcon, dosa2 } from "../../constants/Images";
import HeaderRight from "../../components/HeaderRight";
import HeaderLeft from "../../components/HeaderLeft";
import WishlistCard from "../../components/WishlistCard";

const data = [{
    image: dosa2,
    name: `Jimmy's Dosa`,
    cat: `Fast food, Burger, Dosa`
}, {
    image: dosa2,
    name: `Jimmy's Dosa`,
    cat: `Fast food, Burger, Dosa`
}, {
    image: dosa2,
    name: `Jimmy's Dosa`,
    cat: `Fast food, Burger, Dosa`
}, {
    image: dosa2,
    name: `Jimmy's Dosa`,
    cat: `Fast food, Burger, Dosa`
}]

function Wishlist({ navigation }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight />,
            headerLeft: () => <HeaderLeft text={''} iconName={backIcon} onPress={() => navigation.goBack()} />,
        });
    }, [navigation]);


    const renderWishlist = ({ item, index }) => {
        return (
            <WishlistCard index={index} item={item} />
        )
    }

    return (
        <SafeAreaView style={CommonStyles.safeAreaView}>
            <StatusBar barStyle='light-content' hidden={false} backgroundColor={BUILDRR_BLUE} />
            <View style={SpaceStyles.spaceHorizontal}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 0 }}
                    renderItem={renderWishlist}
                />
            </View>
        </SafeAreaView>
    )
}
export default Wishlist
