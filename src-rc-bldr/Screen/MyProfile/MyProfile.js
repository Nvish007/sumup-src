import React, { useState, useLayoutEffect, useEffect } from "react";
import {
    BackHandler,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Share,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Modal from 'react-native-modal';
import { BUILDRR_BLUE, WHITE } from "../../constants/Colors";
import { addImage, backIcon, builderImage, editIcon, john, myAccount } from "../../constants/Images";
import {
    AboutUsIconSvg,
    ContactUsSvg,
    // LogoutIconSvg,
    // MapSvg,
    // NotificationSvg,
    // RateAppSvg,
    ShareSvg,
    TermsUseSvg
} from "../../constants/SvgImage";
import HeaderLeft from "../../components/HeaderLeft";
import HeaderRight from "../../components/HeaderRight";
import HeaderTitle from "../../components/headerTitle";
import SpaceStyles from "../styles/SpaceStyles";
import TextStyles from "../styles/TextStyles";
import CommonStyles from "../styles/CommonStyles";
import styles from "../styles/pages/OnboardingStyles";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthLogout } from "../../redux/auth";
import AuthStyle from "../styles/AuthStyle";

const MyProfile = ({ navigation }) => {
    const [logOutModal, setLogOutModal] = useState(false);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={`My Profile`} />,
            headerRight: () => <HeaderRight  />,
        });
    }, [navigation]);

    const shareFun = async () => {
        try {
            const result = await Share.share({
                message: `Welcome to Buildrr App`
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const logoutCall = () => {
        navigation.replace('Login')
    }

    const handleLogout = () => {
        dispatch(handleAuthLogout());
        navigation.navigate('Login');
    }
    useEffect(() => {
        const backAction = () => {
          return true;
        };
      
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      
        return () => {
          backHandler.remove();
        };
      }, []);

    return ( 
        <SafeAreaView style={[CommonStyles.safeAreaView2, { backgroundColor: '#F2F2F2' }]}>
            <StatusBar barStyle='light-content' hidden={true} backgroundColor={BUILDRR_BLUE} />
            <View style={{ flex: 1, backgroundColor: WHITE }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            backgroundColor: WHITE,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View style={CommonStyles.coverImageBG} />
                        {
                        <Image
                            source={john}
                            resizeMode={'cover'}
                            style={[CommonStyles.coverImage, {borderRadius: 20}]}
                        />
                        }
                    </View>
                    {/* <View style={{flex: 0.4, backgroundColor: BUILDRR_BLUE }}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
                            <View style={{top: 20}}>
                                <Image style={CommonStyles.johnImage} source={john} />
                            </View>
                        </View>
                    </View> */}
                    <ImageBackground
                        source={require('../../Assets/backgroundImage.png')}
                        style={CommonStyles.backgroundImage}>
                    <View style={[AuthStyle.containerWithoutBG, SpaceStyles.spaceHorizontal]}>
                        <View style={[SpaceStyles.flexRow, SpaceStyles.top1]}>
                            <View>
                            <View style={CommonStyles.compneyProfileImageContainer}>
                                <Image
                                source={john}
                                style={CommonStyles.compneyProfileImage}
                                />
                            </View>
                            </View>
                        </View>
                        <View style={[SpaceStyles.top1, {alignItems: 'center'}]}>
                            <Text style={[TextStyles.bold30, SpaceStyles.top3, { textAlign: 'center' }]}>{user?.username}</Text>
                            <View style={[SpaceStyles.flexRow, { marginTop: 2 }]}>
                                <Text style={[TextStyles.regular14DarkGray, { top: 2 }]}>+1 88776655</Text>
                            </View>
                            <View style={[SpaceStyles.flexRow, { marginTop: 2 }]}>
                                <Text style={TextStyles.regular14DarkGray}>{user?.email}</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                    <TouchableOpacity
                        onPress={() => console.log('was here')}
                        style={[CommonStyles.updateButton, SpaceStyles.top2, SpaceStyles.width85, { alignSelf: 'center', backgroundColor: '#2A7CAF', borderRadius: 20 }]}>
                        <Text style={[TextStyles.bold16White]}>{"MIJN CHATS"}</Text>
                    </TouchableOpacity>
                        <Text style={{alignSelf: 'center', margin: 10}}>{"Info"}</Text>
                    </View>

                    <View style={{borderColor: BUILDRR_BLUE, width: 400, borderWidth: 1, alignSelf: 'center', margin: 20}} />
                    <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={myAccount} style={{ height: 20, width: 20}} />
                            <Text style={[TextStyles.semiBold16Black, SpaceStyles.left2, { marginRight: 25 }]}>{"Dimitri Detremmerie"}</Text>
                            <Image source={myAccount} style={{ height: 20, width: 20}} />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={myAccount} style={{ height: 20, width: 20}} />
                            <Text style={[TextStyles.semiBold16Black, SpaceStyles.left2, { marginRight: 25 }]}>{"*******"}</Text>
                            <Image source={myAccount} style={{ height: 20, width: 20}} />
                        </View>
                    </View>
                    <View style={SpaceStyles.horizontal5}>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={[SpaceStyles.flexRow, SpaceStyles.bottom1, SpaceStyles.top3]}>
                            <NotificationSvg />
                            <Text style={[TextStyles.semiBold16Black, SpaceStyles.left6, { top: 2 }]}>{"Notifications"}</Text>
                        </TouchableOpacity> */}
{/* 
                        <TouchableOpacity onPress={() => navigation.navigate('ViewMap')} style={[SpaceStyles.flexRow, SpaceStyles.vertical1, SpaceStyles.top2]}>
                            <MapSvg />
                            <Text style={[TextStyles.semiBold16Black, SpaceStyles.left6, { top: 2 }]}>{"View Map"}</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => navigation.navigate('AboutUs')} style={[SpaceStyles.flexRow, SpaceStyles.vertical1, SpaceStyles.top2]}>
                            <AboutUsIconSvg />
                            <Text style={[TextStyles.semiBold16Black, SpaceStyles.left6, { top: 2 }]}>{"About Us"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('TermsofUse')} style={[SpaceStyles.flexRow, SpaceStyles.vertical1, SpaceStyles.top2]}>
                            <TermsUseSvg />
                            <Text style={[TextStyles.semiBold16Black, SpaceStyles.left6, { top: 2 }]}>{"Terms of Use"}</Text>
                        </TouchableOpacity>
                        {/* <View style={[SpaceStyles.flexRow, SpaceStyles.vertical1, SpaceStyles.top2]}>
                            <RateAppSvg />
                            <Text style={[TextStyles.semiBold16Black, SpaceStyles.left6, { top: 2 }]}>{"Rate the app"}</Text>
                        </View> */}
                        <TouchableOpacity onPress={() => navigation.navigate('ContactUs')} style={[SpaceStyles.flexRow, SpaceStyles.vertical1, SpaceStyles.top2]}>
                            <ContactUsSvg />
                            <Text style={[TextStyles.semiBold16Black, SpaceStyles.left6, { top: 2 }]}>{"Contact us"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => shareFun()} style={[SpaceStyles.flexRow, SpaceStyles.vertical1, SpaceStyles.top2]}>
                            <ShareSvg />
                            <Text style={[TextStyles.semiBold16Black, SpaceStyles.left6, { top: 2 }]}>{"Share the app"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout} style={[SpaceStyles.flexRow, SpaceStyles.vertical1, SpaceStyles.top2]}>
                            <ShareSvg />
                            <Text style={[TextStyles.semiBold16Black, SpaceStyles.left6, { top: 2 }]}>{"Logout"}</Text>
                        </TouchableOpacity>
{/* 
                        <TouchableOpacity
                            onPress={() => setLogOutModal(true)}
                            style={[SpaceStyles.flexRow, SpaceStyles.vertical1, SpaceStyles.top2]}>
                            <LogoutIconSvg />
                            <Text style={[TextStyles.semiBold16Black, SpaceStyles.left6, { top: 2 }]}>{"Logout"}</Text>
                        </TouchableOpacity>
                        <Image source={addImage} style={CommonStyles.addImageView} /> */}
                    </View>
                    </ImageBackground>
                </ScrollView>
            </View>
            <Modal
                animationIn={'slideInUp'}
                animationOut='slideOutDown'
                backdropTransitionOutTiming={0}
                backdropTransitionInTiming={0}
                onBackdropPress={() => setLogOutModal(false)}
                onBackButtonPress={() => setLogOutModal(false)}
                isVisible={logOutModal}>
                <View style={CommonStyles.whitHomeView}>
                    <View style={CommonStyles.logoutHeader}>
                        <Text style={[TextStyles.bold18White, SpaceStyles.alignSelf]}>Logout</Text>
                    </View>
                    <Text style={[TextStyles.semiBold15, SpaceStyles.alignSelf, SpaceStyles.vertical2, { textAlign: 'center' }]}>Are you sure? You want to Logout.</Text>
                    <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.width62, { alignSelf: 'center' }]}>
                        <TouchableOpacity
                            style={[CommonStyles.addToPlanButton, { paddingHorizontal: 20 }]}
                            onPress={() => setLogOutModal(false)}
                        >
                            <Text style={TextStyles.semiBold15}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[CommonStyles.addToPlanButton, { backgroundColor: BUILDRR_BLUE, paddingHorizontal: 30 }]}
                            onPress={() => logoutCall()}
                        >
                            <Text style={TextStyles.semiBold15White}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
export default MyProfile;
