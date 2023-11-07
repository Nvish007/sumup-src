import React, { useLayoutEffect } from "react";
import { Image, StatusBar, ScrollView, Text, View } from "react-native";
import { BUILDRR_BLUE } from "../../constants/Colors";
import { backIcon, thali2 } from "../../constants/Images";
import HeaderLeft from "../../components/HeaderLeft";
import HeaderRight from "../../components/HeaderRight";
import HeaderTitle from "../../components/headerTitle";
import AuthStyle from "../styles/AuthStyle";
import CommonStyles from "../styles/CommonStyles";
import SpaceStyles from "../styles/SpaceStyles";
import TextStyles from "../styles/TextStyles";

const AboutUs = ({navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={`About Us`} />,
            headerRight: () => <HeaderRight />,
            headerLeft: () => <HeaderLeft text={''} iconName={backIcon} onPress={() => navigation.goBack()} />,
        });
    }, [navigation]);

    return (
        <>
            <StatusBar barStyle='light-content' hidden={false} backgroundColor={BUILDRR_BLUE} />
            <ScrollView showsVerticalScrollIndicator={false} style={AuthStyle.container}>
                <Image source={thali2} style={CommonStyles.aboutUsImage} />
                <View style={[SpaceStyles.spaceHorizontal, SpaceStyles.top3]}>
                    <Text style={[TextStyles.regular16Black, { textAlign: 'justify' }]}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}</Text>
                    <Text style={[TextStyles.regular16Black, SpaceStyles.top2, { textAlign: 'justify' }]}>{`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`}</Text>
                </View>
            </ScrollView>
        </>
    )
}

export default AboutUs