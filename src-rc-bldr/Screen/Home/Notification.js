import React, { useLayoutEffect } from "react";
import { FlatList, Image, Text, StatusBar, View } from "react-native";
import { backIcon, watch } from "../../constants/Images";
import { BUILDRR_BLUE } from "../../constants/Colors";
import HeaderLeft from "../../components/HeaderLeft";
import HeaderRight from "../../components/HeaderRight";
import HeaderTitle from "../../components/headerTitle";
import AuthStyle from "../styles/AuthStyle";
import CommonStyles from "../styles/CommonStyles";
import SpaceStyles from "../styles/SpaceStyles";
import TextStyles from "../styles/TextStyles";

const data = [{}, {}, {}, {}]

const Notification = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={`Notifications`} />,
            headerRight: () => <HeaderRight />,
            headerLeft: () => <HeaderLeft text={''} iconName={backIcon} onPress={() => navigation.goBack()} />,
        });
    }, [navigation]);

    const renderNotification = ({ item, index }) => {
        return (
            <>
                <View style={SpaceStyles.flexRow}>
                    <View style={[SpaceStyles.vertical2, SpaceStyles.left3]}>
                        <Text numberOfLines={2} ellipsizeMode={'tail'} style={TextStyles.bold16Black}>{`Welcome to our app`}</Text>
                        <Text style={[TextStyles.regular16Black, SpaceStyles.width85, SpaceStyles.top1, { lineHeight: 21 }]}>{`Discover the best way to find incridible experience.`}</Text>
                        <View style={SpaceStyles.flexRow}>
                            <Image source={watch} />
                            <Text style={[TextStyles.regular12DarkGray, SpaceStyles.left2, { marginTop: 4 }]}>{`18 oct 2021, 12:22`}</Text>
                        </View>
                    </View>
                </View>
                <View style={CommonStyles.lineView} />
            </>
        )
    }

    return (
        <>
            <StatusBar barStyle='light-content' hidden={false} backgroundColor={BUILDRR_BLUE} />
            <View style={[AuthStyle.container, SpaceStyles.spaceHorizontal]}>
                <FlatList
                    data={data}
                    keyboardShouldPersistTaps="handled"
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderNotification}
                />
            </View>
        </>
    )
}

export default Notification