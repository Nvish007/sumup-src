import React, { useLayoutEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { BUILDRR_BLUE } from "../../constants/Colors";
import { backIcon, editProfileIcon, john } from "../../constants/Images";
import HeaderRight from "../../components/HeaderRight";
import HeaderLeft from "../../components/HeaderLeft";
import HeaderTitle from "../../components/headerTitle";
import CommonStyles from "../styles/CommonStyles";
import SpaceStyles from "../styles/SpaceStyles";
import TextStyles from "../styles/TextStyles";

const EditProfile = ({ navigation }) => {
    const [file, setFile] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={`Edit Profile`} />,
            headerRight: () => <HeaderRight />,
            headerLeft: () => <HeaderLeft text={''} iconName={backIcon} onPress={() => navigation.goBack()} />,
        });
    }, [navigation]);

    // change profile image function
    const selectPhoto = () => {
        try {
            launchImageLibrary({
                maxHeight: 200,
                maxWidth: 200,
                mediaType: 'photo',
                includeBase64: true,
            }, response => {
                if (response?.didCancel != true) {
                    setFile(response?.assets[0])
                    let array = [];
                    response?.assets?.map((i) => {
                        let file = {
                            uri: i.uri,
                            type: i.type,
                            name: i.fileName != null ? i.fileName : i.uri,
                            size: i.fileSize
                        }
                        array.push(file)
                    })
                }
                if (response?.didCancel) {
                } else if (response?.error) {
                }
            });
        } catch (e) {
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={CommonStyles.safeAreaView2}>
            <StatusBar barStyle='light-content' hidden={false} backgroundColor={BUILDRR_BLUE} />
            <View style={CommonStyles.profileImageView}>
                {file == '' ?
                    <Image
                        style={CommonStyles.profileImage}
                        source={john}
                    />
                    :
                    <Image
                        style={CommonStyles.profileImage}
                        source={{ uri: file.uri }}
                    />
                }
                <TouchableOpacity style={CommonStyles.editProfileIcon} onPress={() => selectPhoto()}>
                    <Image source={editProfileIcon} />
                </TouchableOpacity>
            </View>
            <View style={[SpaceStyles.spaceHorizontal, SpaceStyles.top3]}>
                <Text style={[TextStyles.bold16Black, SpaceStyles.top3]}>{"First Name"}</Text>
                <View style={CommonStyles.loginInputView}>
                    <TextInput
                        placeholder="Enter first name"
                        placeholderTextColor={'#7C7C80'}
                        style={[TextStyles.regular14black, { height: 50 }]}
                    />
                </View>
                <Text style={[TextStyles.bold16Black, SpaceStyles.top2]}>{"Last Name"}</Text>
                <View style={CommonStyles.loginInputView}>
                    <TextInput
                        placeholder="Enter last name"
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
                <Text style={[TextStyles.bold16Black, SpaceStyles.top2]}>{"Phone number"}</Text>
                <View style={CommonStyles.loginInputView}>
                    <TextInput
                        placeholder="Enter Phone number"
                        placeholderTextColor={'#7C7C80'}
                        style={[TextStyles.regular14black, { height: 50 }]}
                    />
                </View>
                <TouchableOpacity style={[CommonStyles.updateButton, SpaceStyles.top3]}>
                    <Text style={TextStyles.bold16White}>{"Update"}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default EditProfile