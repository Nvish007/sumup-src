import React, { useLayoutEffect } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker, MarkerAnimated } from 'react-native-maps';
import constants from "../../constants";
import { BUILDRR_BLUE, WHITE } from "../../constants/Colors";
import { backIcon, email, locationIcon, phone, websiteIcon } from "../../constants/Images";
import HeaderRight from "../../components/HeaderRight";
import HeaderLeft from "../../components/HeaderLeft";
import HeaderTitle from "../../components/headerTitle";
import CommonStyles from "../styles/CommonStyles";
import TextStyles from "../styles/TextStyles";
import SpaceStyles from "../styles/SpaceStyles";

const HEIGHT = (constants.BaseStyle.DEVICE_HEIGHT / 100)
const WIDTH = (constants.BaseStyle.DEVICE_WIDTH / 100)

const ContactUs = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={`Contact Us`} />,
            headerRight: () => <HeaderRight />,
            headerLeft: () => <HeaderLeft text={''} iconName={backIcon} onPress={() => navigation.goBack()} />,
        });
    }, [navigation]);

    return (
        <SafeAreaView style={[CommonStyles.safeAreaView2, { backgroundColor: WHITE }]}>
            <StatusBar barStyle='light-content' hidden={false} backgroundColor={BUILDRR_BLUE} />
            <ScrollView showsVerticalScrollIndicator={false} style={[CommonStyles.mainContainer]}>
                <MapView
                    style={{ width: WIDTH * 90, height: HEIGHT * 30, marginTop: HEIGHT * 2 }}
                    region={{
                        latitude: 23.044628,
                        longitude: 72.667877,
                        latitudeDelta: 0.010,
                        longitudeDelta: 0.010,
                    }}
                >
                    <MapView.Marker.Animated
                        coordinate={{
                            latitude: 23.044628,
                            longitude: 72.667877,
                        }}
                        draggable
                        pinColor={BUILDRR_BLUE}
                    />
                </MapView>
                <Text style={[TextStyles.bold16Black, SpaceStyles.top3]}>{"Name"}</Text>
                <View style={CommonStyles.loginInputView}>
                    <TextInput
                        placeholder="Enter Name"
                        placeholderTextColor={'#7C7C80'}
                        style={[TextStyles.regular14black, { height: 50 }]}
                    />
                </View>
                <Text style={[TextStyles.bold16Black, SpaceStyles.top2]}>{"Email"}</Text>
                <View style={CommonStyles.loginInputView}>
                    <TextInput
                        placeholder="Enter Email"
                        placeholderTextColor={'#7C7C80'}
                        style={[TextStyles.regular14black, { height: 50 }]}
                    />
                </View>
                <Text style={[TextStyles.bold16Black, SpaceStyles.top2]}>{"Review"}</Text>
                <View style={CommonStyles.reviewBox}>
                    <TextInput
                        style={[TextStyles.regular15Black, { alignItems: 'flex-start' }]}
                        placeholder={'Write a review here....'}
                        multiline={true}
                        textAlignVertical={'top'}
                        numberOfLines={7}
                        placeholderTextColor={'#7C7C80'}
                    />
                </View>
                <TouchableOpacity style={[CommonStyles.updateButton, SpaceStyles.top2]}>
                    <Text style={TextStyles.bold16White}>{"SUBMIT"}</Text>
                </TouchableOpacity>
                <View style={[SpaceStyles.flexRow, SpaceStyles.top3]}>
                    <Image source={locationIcon} style={{ height: 15, width: 13, tintColor: 'gray', left: 1 }} />
                    <Text style={[TextStyles.regular15DarkGray, SpaceStyles.left3, { top: 2 }]}>Devine Street, Ontario, Canada</Text>
                </View>
                <View style={[SpaceStyles.flexRow, SpaceStyles.vertical1]}>
                    <Image source={phone} style={{ height: 22, width: 12, tintColor: 'gray', left: 1 }} />
                    <Text style={[TextStyles.regular15DarkGray, SpaceStyles.left3, { top: 2 }]}>+1 88776655</Text>
                </View>
                <View style={SpaceStyles.flexRow}>
                    <Image source={websiteIcon} style={{ height: 15, width: 15, tintColor: 'gray' }} />
                    <Text style={[TextStyles.regular15DarkGray, SpaceStyles.left3, { top: 2 }]}>www.mcd.com</Text>
                </View>
                <View style={[SpaceStyles.flexRow, SpaceStyles.vertical1]}>
                    <Image source={email} style={{ height: 15, width: 15, tintColor: 'gray' }} />
                    <Text style={[TextStyles.regular15DarkGray, SpaceStyles.left3, { top: 2 }]}>mcd1@gmail.com</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ContactUs

