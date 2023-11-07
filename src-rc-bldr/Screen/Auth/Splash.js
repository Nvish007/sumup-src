import React, { useEffect } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { BUILDRR_BLUE } from "../../constants/Colors";
import { appLogo } from "../../constants/Images";
import AuthStyle from "../styles/AuthStyle";
import SpaceStyles from "../styles/SpaceStyles";
import TextStyles from "../styles/TextStyles";

function Splash({ navigation }) {

    useEffect(() => {
        checkLogin()
    }, [])

    const checkLogin = async () => {
        setTimeout(() => {
            navigation.replace('Login');
        }, 2000);
    }

    return (
        <>
            <StatusBar barStyle='light-content' hidden={false} backgroundColor={BUILDRR_BLUE} />
            <View style={[AuthStyle.container, { backgroundColor: BUILDRR_BLUE }]}>
                <View style={SpaceStyles.flexCenter}>
                    <Image source={appLogo} style={{ height: 80, width: 80 }} />
                    <Text style={[TextStyles.bold70, { textAlign: 'center' }]}>{"LISTER"}</Text>
                    <Text style={[TextStyles.regular18White, { textAlign: 'center' }]}>{"Search Restaurants Worldwide"}</Text>
                </View>
            </View>
        </>
    )
}
export default Splash
