import { StyleSheet, Dimensions } from 'react-native'
import TextStyles from '../../../styles/TextStyles';
import { BLACK, BUILDRR_BLUE, PRIMARY_COLOR, RED, WHITE, YELLOW } from '../../../../constants/Colors'

const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
    containerMain:{
		flex: 1,
		backgroundColor: PRIMARY_COLOR,
	},
    primaryColor: {
        color: PRIMARY_COLOR,
      },
      headerIconWrapper: {
        alignItems: 'flex-rightr',
    },
    builderLogo: {
        resizeMode: 'contain',
        height: 110,
        width: '100%'
    },
    clapIcon: {
        resizeMode: 'contain',
        height: 60,
        width: '100%',
        marginTop: 30,
        marginBottom: 10
    },
    builderIconWrapper: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },  
    builderIcon: {
        height: height / 3,
        width: width / 2,
    },
    yellowBar: {
        backgroundColor: YELLOW,
        position: 'absolute',
        right: 0,
        top: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        paddingBottom: 5,
        paddingTop: 8,
        paddingLeft: 10,
        paddingRight: 5,
        justifyContent: 'center',
    },
    joinbuildrrText: {
        lineHeight: 15,
        width: 50
    },
    lineHeight: {
        lineHeight: 15,
    },
    loginText: {
        textAlign: 'center',
        color: WHITE,
        paddingBottom: 15
    },
    input: {
        backgroundColor: WHITE,
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    borderedInput: {
        backgroundColor: WHITE,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: BUILDRR_BLUE,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginBottom: 12,
    },
    authWrapper: {
        paddingHorizontal: 30
    },
    loginBtn: {
        backgroundColor: YELLOW,
        paddingVertical: 5,
        width: width / 2,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 20
    },
    verdernBtn: {
        backgroundColor: YELLOW,
        paddingVertical: 8,
        paddingHorizontal: 20,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 20
    },
    loginBtnText: {
        color: PRIMARY_COLOR,
        textAlign: 'center',
        marginTop: 2
    },
    createAccountBtn: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 30,
    },
    textCenter: {
        textAlign: 'center',
        marginTop: 2
    },
    label: {
        ...TextStyles.lightPrimary14,
        color: 'gray',
        paddingHorizontal: 20
    },
    blueRightText: {
        ...TextStyles.bold16Black,
        color: PRIMARY_COLOR,
        textAlign: 'right',
        marginBottom: 20
    },
    container: {
        flex: 1
    },
    successTitle: {
        ...TextStyles.bold16Black,
        color: BLACK,
        textAlign: 'center',
        marginBottom: 20
    },
    successDesc: {
        ...TextStyles.regular16Black,
        color: BLACK,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 21
    },
    descWrapper: {
        paddingHorizontal: 30
    },
    error: {
        ...TextStyles.regular15DarkGray,
        color: RED,
        paddingHorizontal: 8,
        paddingVertical: 2,
    }
})
export default styles