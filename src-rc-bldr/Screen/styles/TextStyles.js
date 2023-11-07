import { StyleSheet } from 'react-native'
import constants from '../../constants'
import { BLACK, DARK_GRAY, BUILDRR_BLUE, WHITE, PRIMARY_COLOR, LIGHT_PRIMARY_COLOR } from '../../constants/Colors'

const TextStyles = StyleSheet.create({

    bold70: {
        color: WHITE,
        ...constants.Fonts.bold70   //70 bold
    },
    bold40: {
        color: BUILDRR_BLUE,
        ...constants.Fonts.bold40   //40 bold
    },
    bold30: {
        color: BLACK + 95,
        ...constants.Fonts.bold30   //30 bold
    },
    mulishbold20: {
        color: BLACK + 95,
        ...constants.Fonts.bold20   //20 bold
    },
    mulishBold40: {
        color: BLACK,
        ...constants.Fonts.mulishBold40   //40 mulish Bold
    },
    bold28Black: {
        color: BLACK,
        ...constants.Fonts.bold28   //28 bold
    },
    bold20: {
        color: BLACK,
        ...constants.Fonts.bold20   //20 bold
    },
    bold18: {
        color: BLACK,
        ...constants.Fonts.bold18   //18 bold
    },
    bold18White: {
        color: WHITE,
        ...constants.Fonts.bold18   //18 bold
    },
    regular18White: {
        color: WHITE,
        ...constants.Fonts.regular18   //18 regular
    },
    regular16Black: {
        color: BLACK,
        ...constants.Fonts.regular16   //16 regular
    },
    regular16DarkGray: {
        color: DARK_GRAY,
        ...constants.Fonts.regular16   //16 regular
    },
    bold16White: {
        color: WHITE,
        ...constants.Fonts.bold16   //16 bold
    },
    bold16Black: {
        color: BLACK,
        ...constants.Fonts.bold16   //16 bold
    },
    semiBold16Black: {
        color: BLACK,
        ...constants.Fonts.semiBold16   //16 semiBold
    },
    semiBold15Black: {
        color: BLACK,
        ...constants.Fonts.semiBold15   //15 semiBold
    },
    semiBold15White: {
        color: WHITE,
        ...constants.Fonts.semiBold15   //15 semiBold
    },
    regular15Black: {
        color: BLACK,
        ...constants.Fonts.regular15   //15 regular
    },
    regular15DarkGray: {
        color: DARK_GRAY,
        ...constants.Fonts.regular15   //15 regular
    },
    regular15White: {
        color: WHITE,
        ...constants.Fonts.regular15   //15 regular
    },
    bold15White: {
        color: WHITE,
        ...constants.Fonts.bold15   //15 bold
    },
    semiBold15: {
        color: BLACK,
        ...constants.Fonts.semiBold15   //15 semiBold
    },
    bold14black: {
        color: BLACK,
        ...constants.Fonts.bold14   //14 bold
    },
    regular14black: {
        color: BLACK,
        ...constants.Fonts.regular14   //14 regular
    },
    regular14DarkGray: {
        color: DARK_GRAY,
        ...constants.Fonts.regular14   //14 regular
    },
    regular14BUILDRR_BLUE: {
        color: BUILDRR_BLUE,
        ...constants.Fonts.regular14   //14 regular
    },
    regular14White: {
        color: WHITE,
        ...constants.Fonts.regular14   //14 regular
    },
    semBold12DarkGray: {
        color: DARK_GRAY,
        ...constants.Fonts.semiBold12   //12 semiBold
    },
    semBold12BUILDRR_BLUE: {
        color: BUILDRR_BLUE,
        ...constants.Fonts.semiBold12   //12 semiBold
    },
    regular12DarkGray: {
        color: DARK_GRAY,
        ...constants.Fonts.regular12   //12 regular
    },
    futuraBold20: {
        color: BLACK,
        ...constants.Fonts.regularFuturaCyrillicHeavy20   //20 bold
    },
    adelleSansregular14black: {
        color: BLACK,
        ...constants.Fonts.regularAdelleSansRegular14   //14 regular
    },
    regularCalluna16Gray: {
        color: DARK_GRAY,
        ...constants.Fonts.regularCallunaRegular16   //16 regular
    },
    boldCalluna16Black: {
        color: BLACK,
        ...constants.Fonts.regularFuturaCyrillicHeavy16   //16 regular
    },
    boldPrimary14: {
        color: PRIMARY_COLOR,
        ...constants.Fonts.semiBold12   //16 bold
    },
    boldDarkPrimary12: {
        color: PRIMARY_COLOR,
        ...constants.Fonts.bold12   //16 bold
    },
    lightPrimary14: {
        color: PRIMARY_COLOR,
        ...constants.Fonts.regular12   //12 regular
    },
    primaryBold14: {
        color: PRIMARY_COLOR,
        ...constants.Fonts.bold14  //semiBold15
    },
    lightPrimary12: {
        color: LIGHT_PRIMARY_COLOR,
        ...constants.Fonts.semiBold12   //16 bold
    },
    regularPrimary12: {
        color: PRIMARY_COLOR,
        ...constants.Fonts.regular12   //10 bold
    },
    
})

export default TextStyles