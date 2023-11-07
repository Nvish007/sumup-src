import React, { useState, useLayoutEffect, useEffect } from "react";
import {
    Image,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { BUILDRR_BLUE, WHITE } from "../../constants/Colors";
import { backIcon, searchGray } from "../../constants/Images";
import HeaderLeft from "../../components/HeaderLeft";
import HeaderRight from "../../components/HeaderRight";
import HeaderTitle from "../../components/headerTitle";
import AuthStyle from "../styles/AuthStyle";
import CommonStyles from "../styles/CommonStyles";
import SpaceStyles from "../styles/SpaceStyles";
import TextStyles from "../styles/TextStyles";

const data = [{
    name: 'Pizza',
    check: false
}, {
    name: 'Burger',
    check: false
}, {
    name: 'Sendwich',
    check: false
}, {
    name: 'Aloo tiki',
    check: false
}, {
    name: 'Shake',
    check: false
}, {
    name: 'Dosa',
    check: false
}, {
    name: 'Punjabi',
    check: false
}]

const countryData = [{
    name: 'India',
    check: false
}, {
    name: 'USA',
    check: false
}, {
    name: 'Canada',
    check: false
}, {
    name: 'Australia',
    check: false
}, {
    name: 'Singapore',
    check: false
}, {
    name: 'Poland',
    check: false
}]

const foodCategory = [{ name: 'South Indian', check: false }, { name: 'Punjabi', check: false }, { name: 'Gujrati', check: false }, { name: 'Chinese', check: false }, { name: 'Maxicun', check: false }, , { name: 'See Food', check: false }]

const SearchScreen = ({navigation}) => {
    const [newSelectedItem, setNewSelectedItem] = useState('');
    const [searchHestory, setSearchHestory] = useState(data);
    const [selectedFood, setSelectedfood] = useState([]);
    const [country, setCountry] = useState(countryData);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [foodCategoryData, setFoodCategoryData] = useState(foodCategory);
    const [selectedFoodCategory, setSelectedFoodCategory] = useState([]);

    // Header View
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title={`Search`} />,
            headerRight: () => <HeaderRight />,
            headerLeft: () => <HeaderLeft text={''} iconName={backIcon} onPress={() => navigation.goBack()} />,
        });
    }, [navigation]);

    useEffect(() => {
        setSearchHestory(data)
    }, [newSelectedItem])

    // Select search category function 

    const checkFunction = (item) => {
        searchHestory?.map((i) => {
            if (i.name == item?.name) {
                i.check = !i.check
            }
        })
        let array = []
        searchHestory?.map((i) => {
            if (i.check == true) {
                array.push(i.name)
            }
        })
        setSelectedfood(array)
    }

    // Select country function 

    const checkFunctionCountry = (item) => {
        country?.map((i) => {
            if (i.name == item?.name) {
                i.check = !i.check
            }
        })
        let array = []
        country?.map((i) => {
            if (i.check == true) {
                array.push(i.name)
            }
        })
        setSelectedCountry(array)
    }

    // Select Food function 

    const checkFunctionFood = (item) => {
        foodCategoryData?.map((i) => {
            if (i.name == item?.name) {
                i.check = !i.check
            }
        })
        let array = []
        foodCategoryData?.map((i) => {
            if (i.check == true) {
                array.push(i.name)
            }
        })
        setSelectedFoodCategory(array)
    }

    return (
        <>
            <StatusBar barStyle='light-content' hidden={false} backgroundColor={BUILDRR_BLUE} />
            <View style={[AuthStyle.container, SpaceStyles.spaceHorizontal]}>
                <View style={[CommonStyles.searchInputViewSearch, SpaceStyles.vertical2]}>
                    <Image source={searchGray} style={{ marginRight: 10 }} />
                    <TextInput
                        style={[SpaceStyles.width62, TextStyles.regular14black, { top: 2 }]}
                        placeholder="Find restaurant near you"
                        placeholderTextColor='#bbb'
                    />
                </View>
                {/* Search history Section*/}
                <View style={SpaceStyles.alignSpaceBlock}>
                    <Text style={TextStyles.semiBold16Black}>Search history</Text>
                    <TouchableOpacity style={CommonStyles.clearButtonView}>
                        <Text style={TextStyles.semBold12BUILDRR_BLUE}>Clear</Text>
                    </TouchableOpacity>
                </View>
                <View style={SpaceStyles.rowWrap}>
                    {searchHestory?.map((i, index) => {
                        const backgroundColor = (i?.check == true || selectedFood?.includes(i?.name)) ? BUILDRR_BLUE : WHITE;
                        const textColor = (i?.check == true || selectedFood?.includes(i?.name)) ? WHITE : BUILDRR_BLUE;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[CommonStyles.foodView, { backgroundColor: backgroundColor }]}
                                onPress={() => checkFunction(i)}
                            >
                                <Text style={[TextStyles.semiBold15Black, { color: textColor }]}>{i?.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                {/* Search by Latest country Section*/}
                <View style={SpaceStyles.top3}>
                    <Text style={TextStyles.semiBold16Black}>Search by Latest country</Text>
                </View>
                <View style={[SpaceStyles.rowWrap, SpaceStyles.top1]}>
                    {country?.map((i, index) => {
                        const backgroundColor = (i?.check == true || selectedCountry?.includes(i?.name)) ? BUILDRR_BLUE : WHITE;
                        const textColor = (i?.check == true || selectedCountry?.includes(i?.name)) ? WHITE : BUILDRR_BLUE;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[CommonStyles.foodView, { backgroundColor: backgroundColor }]}
                                onPress={() => checkFunctionCountry(i)}
                            >
                                <Text style={[TextStyles.semiBold15Black, { color: textColor }]}>{i?.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                {/* Search by Hot categories Section */}
                <View style={SpaceStyles.top3}>
                    <Text style={TextStyles.semiBold16Black}>Search by Hot categories</Text>
                </View>
                <View style={[SpaceStyles.rowWrap, SpaceStyles.top1]}>
                    {foodCategoryData?.map((i, index) => {
                        const backgroundColor = (i?.check == true || selectedFoodCategory?.includes(i?.name)) ? BUILDRR_BLUE : WHITE;
                        const textColor = (i?.check == true || selectedFoodCategory?.includes(i?.name)) ? WHITE : BUILDRR_BLUE;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[CommonStyles.foodView, { backgroundColor: backgroundColor }]}
                                onPress={() => checkFunctionFood(i)}
                            >
                                <Text style={[TextStyles.semiBold15Black, { color: textColor }]}>{i?.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </>
    )
}
export default SearchScreen
