import React, { useState, useLayoutEffect } from "react";
import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import HeaderLeft from "../../components/HeaderLeft";
import HeaderRight from "../../components/HeaderRight";
import { BUILDRR_BLUE } from "../../constants/Colors";
import { backIcon, otpIcon } from "../../constants/Images";
import SpaceStyles from "../styles/SpaceStyles";
import TextStyles from "../styles/TextStyles";
import AuthStyle from "../styles/AuthStyle";
import { CodeField, Cursor, useBlurOnFulfill } from 'react-native-confirmation-code-field';
import CommonStyles from "../styles/CommonStyles";

const CELL_COUNT = 4;

function Otp(props) {

    const { mobile } = props.route.params
    const { navigation } = props
    const [value, setValue] = useState('');

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight />,
            headerLeft: () => <HeaderLeft text={''} iconName={backIcon} onPress={() => navigation.goBack()} />,
        });
    }, [navigation]);

    return (
        <>
            <StatusBar barStyle='light-content' hidden={false} backgroundColor={BUILDRR_BLUE} />
            <View style={[CommonStyles.mainContainer]}>
                <Image source={otpIcon} style={[SpaceStyles.top5, CommonStyles.otpIconStyle, { alignSelf: 'center' }]} />
                <Text style={[TextStyles.semiBold16Black, SpaceStyles.top5, { alignSelf: 'center' }]}>{`We have sent a verification code to`}</Text>
                <Text style={[TextStyles.semiBold16Black, { alignSelf: 'center' }]}>{'+91 ' + mobile}</Text>

                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    keyboardType="number-pad"
                    rootStyle={{ justifyContent: 'center' }}
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <View style={[AuthStyle.cell, isFocused && AuthStyle.focusCell]}>
                            <Text key={index} style={TextStyles.bold16Black}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        </View>
                    )}
                />

                <View style={[SpaceStyles.alignSpaceBlock, SpaceStyles.width50, { alignSelf: 'center' }]}>
                    <Text style={[TextStyles.semiBold15Black, { marginTop: 2 }]}>{`00:15`}</Text>
                    <View style={CommonStyles.verticleLineOtp} />
                    <TouchableOpacity>
                        <Text style={[TextStyles.semiBold15Black, { marginTop: 2 }]}>{`Resend OTP`}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.replace('HomeNavigation')}
                    style={[CommonStyles.updateButton, SpaceStyles.top5, SpaceStyles.width90, { alignSelf: 'center' }]}>
                    <Text style={[TextStyles.bold16White]}>{"Countinue"}</Text>
                </TouchableOpacity>

            </View>
        </>
    )
}
export default Otp
