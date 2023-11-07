import React, { useState, useLayoutEffect } from "react";
import {
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { BUILDRR_BLUE } from "../../constants/Colors";
import { backIcon } from "../../constants/Images";
import HeaderLeft from "../../components/HeaderLeft";
import HeaderRight from "../../components/HeaderRight";
import HeaderTitle from "../../components/headerTitle"; 
import CommonStyles from "../styles/CommonStyles";
import SpaceStyles from "../styles/SpaceStyles";
import TextStyles from "../styles/TextStyles";

const WriteReview = ({navigation}) => {

    const [rating, setRating] = useState(1);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={`Write Review`} />,
            headerRight: () => <HeaderRight />,
            headerLeft: () => <HeaderLeft text={''} iconName={backIcon} onPress={() => navigation.goBack()} />,
        });
    }, [navigation]);

    return (
        <>
            <StatusBar barStyle='light-content' hidden={false} backgroundColor={BUILDRR_BLUE} />
            <View style={CommonStyles.mainContainer}>
                {/* Ratting Section */}
                <Text style={[TextStyles.bold16Black, SpaceStyles.top2]}>Rating</Text>
                <Text style={[TextStyles.bold16Black, SpaceStyles.top2]}>{"Name"}</Text>
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
                <TouchableOpacity
                    style={[CommonStyles.updateButton, SpaceStyles.top3]}>
                    <Text style={TextStyles.bold16White}>{"SUBMIT"}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
export default WriteReview
