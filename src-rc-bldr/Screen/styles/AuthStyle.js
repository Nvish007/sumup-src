import { StyleSheet } from 'react-native'
import { BUILDRR_BLUE, WHITE } from '../../constants/Colors'
import constants from '../../constants'

const HEIGHT = (constants.BaseStyle.DEVICE_HEIGHT / 100)
const WIDTH = (constants.BaseStyle.DEVICE_WIDTH / 100)

const AuthStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    containerWithoutBG: {
        flex: 1,
    },
    cell: {
        borderRadius: 5,
        height: WIDTH * 12,
        width: WIDTH * 12,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: HEIGHT * 5,
        marginRight: 20
    },
    focusCell: {
        borderColor: BUILDRR_BLUE,
    },

})

export default AuthStyle