import React from 'react'
import {
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import constants from '../constants'
import { PRIMARY_COLOR, LIGHT_PRIMARY_COLOR, YELLOW, WHITE } from '../constants/Colors'
import { category, home, myAccount, info, favourite, whaatsapp } from '../constants/Images'

const tabBarConfig = [{
    selectedIcon: home,
    icon: home,
    name: "HomeStack",
    tabName: 'Home'
},
{
    selectedIcon: favourite,
    icon: favourite,
    name: "FavouriteStack",
    tabName: 'Favourite'
},   {
    selectedIcon: category,
    icon: category,
    name: "CategoryStack",
    tabName: 'Category'
}, {
    selectedIcon: whaatsapp,
    icon: whaatsapp,
    name: "ChatStack",
    tabName: "Chat"
}, {
    selectedIcon: myAccount,
    icon: info,
    name: "ProfileStack",
    tabName: 'Info'
}]

const TabBar = ({ descriptors, navigation, state }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <>
            <View style={{ height: 1, width: (constants.BaseStyle.DEVICE_WIDTH / 100) * 100 }} />
            <View style={styles.container}>
                {
                    tabBarConfig.map((route, index) => {        
                        const isFocused = state.index === index;
                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };
                        return (
                            <TouchableOpacity
                            key={index}
                                activeOpacity={0.9}
                                onPress={onPress}
                                style={styles.selectedTab}
                            >
                                <Image
                                    source={isFocused ? route.selectedIcon : route.icon}
                                    resizeMode='contain'
                                    style={isFocused ? styles.seletedIcon : styles.icon}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <SafeAreaView style={{ backgroundColor: PRIMARY_COLOR }} />
        </>
    )
}

export default TabBar

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: PRIMARY_COLOR,
        paddingHorizontal: (constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    selectedTab: {
        // paddingVertical: (constants.BaseStyle.DEVICE_HEIGHT / 100) * 1.25,
        paddingTop: (constants.BaseStyle.DEVICE_HEIGHT / 100) * 1.5,
        paddingHorizontal: (constants.BaseStyle.DEVICE_WIDTH / 100) * 2,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        color: WHITE,
        paddingBottom: (constants.BaseStyle.DEVICE_HEIGHT / 100) * 1.5
    },
    seletedIcon: {
        height: 25,
        width: 25,
        tintColor: YELLOW,
        color: YELLOW
        
    },
    icon: {
        height: 25,
        width: 25,
        tintColor: LIGHT_PRIMARY_COLOR
    }
})
