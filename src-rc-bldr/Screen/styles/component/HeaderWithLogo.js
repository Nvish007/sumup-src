import { StyleSheet } from 'react-native'
import { BLACK, BUILDRR_BLUE, LIGHTGRAY, PRIMARY_COLOR, WHITE, YELLOW } from '../../../constants/Colors'
import constants from '../../../constants'
import { isIOS } from '../../../utils/helpers'

const WIDTH = (constants.BaseStyle.DEVICE_WIDTH)

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
        backgroundColor: BUILDRR_BLUE
    },
    headerIcon: {
        objectFit: 'contain',
        width: WIDTH / 1.6,
    },
    headerIconWrapper: {
        alignItems: 'center',
        
    },
    input: {
        paddingLeft: 10,
        padding: 10,
    },
    searchIcon: {
        color: LIGHTGRAY,
        paddingLeft: 10
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: WHITE,
        borderRadius: 4,
        flex: 1,
    },
    instagramIcon: {
        color: BLACK,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    instagramIconContainer: {
        paddingLeft: 10,
    },
    headerStack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 5
    },
    safeareaView: {
        backgroundColor: BUILDRR_BLUE,
    },
    bar: {
        backgroundColor: YELLOW,
        paddingHorizontal: 20,
        paddingTop: isIOS() ? 65 : 20,
        paddingBottom: 10,
        flex: 1.5,
        height: '100%',
        borderBottomRightRadius: 10
    },
    rightBar: {
        backgroundColor: PRIMARY_COLOR,
        paddingHorizontal: 10,
        paddingBottom: 10,
        flex: 1,
        height: '100%',
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start'
    },
    rightSideRadius: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 0
    },
    barTitle: {
        width: WIDTH / 1.9
    },
    topBoxes: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareIcon: {
       resizeMode: 'contain',
       marginRight: 10,
       marginBottom: 5
    }
})

export default styles