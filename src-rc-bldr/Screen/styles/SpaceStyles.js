import { StyleSheet } from 'react-native'
import constants from '../../constants'

const HEIGHT = (constants.BaseStyle.DEVICE_HEIGHT / 100)
const WIDTH = (constants.BaseStyle.DEVICE_WIDTH / 100)

const SpaceStyles = StyleSheet.create({
    flex1: {
        flex: 1
    },
    alignSpaceBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    alignSelf: {
        alignSelf: 'center'
    },
    flexCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center'
    },
    vertical2: {
        marginVertical: HEIGHT * 2
    },
    vertical1: {
        marginVertical: HEIGHT * 1
    },
    left6: {
        marginLeft: WIDTH * 6
    },
    left3: {
        marginLeft: WIDTH * 3
    },
    left2: {
        marginLeft: WIDTH * 2
    },
    left1: {
        marginLeft: WIDTH * 1
    },
    bottom1: {
        marginBottom: HEIGHT * 1
    },
    width90: {
        width: WIDTH * 90
    },
    width85: {
        width: WIDTH * 85
    },
    top1: {
        marginTop: HEIGHT * 1
    },
    top2: {
        marginTop: HEIGHT * 2
    },
    top3: {
        marginTop: HEIGHT * 3
    },
    top5: {
        marginTop: HEIGHT * 5
    },
    top6: {
        marginTop: HEIGHT * 6
    },
    top7: {
        marginTop: HEIGHT * 7
    },
    top8: {
        marginTop: HEIGHT * 8
    },
    horizontal5: {
        marginHorizontal: WIDTH * 5
    },
    spaceHorizontal: {
        paddingHorizontal: WIDTH * 4
    },
    width25: {
        width: WIDTH * 25
    },
    width62: {
        width: WIDTH * 63
    },
    width70: {
        width: WIDTH * 70
    },
    width50: {
        width: WIDTH * 50
    },
    padding2: {
        paddingVertical: HEIGHT * 2
    },
    padding5: {
        paddingHorizontal: WIDTH * 5
    },
    paddingBottom1: {
        paddingBottom: HEIGHT * 1
    },
    paddingBottom2: {
        paddingBottom: HEIGHT * 2
    },
    paddingBottom3: {
        paddingBottom: HEIGHT * 3
    },
    paddingBottom4: {
        paddingBottom: HEIGHT * 4
    },
    paddingBottom5: {
        paddingBottom: HEIGHT * 5
    },
    
})

export default SpaceStyles
