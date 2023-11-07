import {Platform, StyleSheet} from 'react-native';
import {PRIMARY_COLOR, WHITE} from '../../constants/Colors';

export default StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    paddingLeft: Platform.OS === 'ios' ? 0 : 30,
    flex: 1.2,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: Platform.OS === 'ios' ? 45 : 12,
  },
  massMsgText: {
    textDecorationLine: 'underline',
    color: '#b2b2b2',
  },
  groupUserIcon: {
    width: 26,
    height: 32,
    marginRight: 6,
    resizeMode: 'contain',
    marginBottom: Platform.OS === 'ios' ? 6 : 0,
  },
  searchInput: {
    borderBottomWidth: 1,
    // borderColor: colors.borderColor,
    padding: 0,
    flex: 1,
    height: 22,
    minWidth: 160,
    maxWidth: 160,
    // fontFamily: fonts.hossRound,
    // color: colors.white
  },
  groupUserBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    marginLeft: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginBottom: Platform.OS === 'ios' ? 6 : 0,
  },
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  innerContainer: {
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    width: '100%',
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  item1: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 50,
  },
  image: {
    alignItems: 'center',
    width: 70,
  },
  linearGradient: {
    padding: 5,
    borderRadius: 100,
    width: 70,
    height: 70,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: WHITE,
  },
  viewButton: {
    marginTop: 8,
  },
  viewButtonText: {
    fontSize: 16,
    // fontFamily: fonts.hossRound,
    // color: colors.black,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    // textDecorationColor: colors.black,
  },
  content: {
    borderBottomWidth: 1,
    // borderColor: colors.black,
    borderStyle: 'solid',
    position: 'relative',
    marginLeft: 15,
    flex: 1,
    paddingBottom: 30,
  },
  title: {
    fontSize: 22,
    // fontFamily: fonts.hossRoundBold,
    // color: colors.black,
    maxWidth: 220,
  },
  desc: {
    fontSize: 18,
    // fontFamily: fonts.hossRound,
    // color: colors.black,
    maxWidth: 255,
    marginTop: 20,
  },
  noUser: {
    fontSize: 18,
    // fontFamily: fonts.hossRound,
    // color: colors.black,
    // maxWidth: 255,
    textAlign: 'center',
    marginTop: 30,
  },
  time: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 16,
    // fontFamily: fonts.hossRound,
    // color: colors.black,
  },
  time1: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 16,
    // fontFamily: fonts.hossRoundBold,
  },
  // color: colors.black,
  readView: {
    position: 'absolute',
    top: 30,
    right: 0,
    borderWidth: 1,
    borderRadius: 15,
    width: 28,
    height: 28,
    // backgroundColor: colors.white
  },
  readCount: {
    left: 8,
    top: 3,
    fontSize: 16,
    // fontFamily: fonts.hossRound,
    // color: colors.black
  },
  readCount1: {
    left: 10,
  },
  listStyle: {
    fontSize: 20,
  },
  loader: {
    flex: 1,
    alignSelf: 'center',
  },
  deleteActionView: {
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  deleteActionView1: {
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  nameButton: {
    width: '100%',
    overflow: 'hidden',
    // marginTop: 30,
    backgroundColor: 'red',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  nameButtonText: {
    fontSize: 18,
    // color: colors.white,
    textAlign: 'center',
    // fontFamily: fonts.hossRound
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
  },
  inputWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: WHITE,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    borderRadius: 8,
  },
  card: {
	flexDirection: 'row',
	borderBottomWidth: 1,
	paddingBottom: 20,
  },
  bottomSpacing: {
    paddingTop: 20,
  },
  descBox: {
	borderWidth: 1,
	borderColor: WHITE,
	borderRadius: 10,
	paddingHorizontal: 6,
	paddingVertical: 0,
	marginTop: 5,
  },
  nameWrapper: {
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
  }
});
