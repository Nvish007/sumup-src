import {StyleSheet, Dimensions} from 'react-native';
import {
  BGGRAY,
  BLACK,
  BUILDRR_BLUE,
  GOLD,
  PRIMARY_COLOR,
  WHITE,
} from '../../../constants/Colors';
import TextStyles from '../../styles/TextStyles';

const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  nextButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 15,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
  },
  headerIcon: {
    width: 120,
    height: '90%',
    resizeMode: 'contain',
    marginLeft: 20,
  },
  headerContainer: {
    height: height / 5,
    backgroundColor: BUILDRR_BLUE,
    flexDirection: 'row',
  },
  buildrWorden: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  onboardBody: {
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  buildrWordenText: {
    textAlign: 'center',
    color: WHITE,
    marginRight: 30,
    lineHeight: 30,
    maxWidth: 150,
    fontSize: 30
  },
  title: {
    ...TextStyles.regularCalluna16Gray,
    color: BLACK,
  },
  titleDesc: {
    ...TextStyles.boldDarkPrimary12,
    color: BLACK,
    textAlign: 'right',
    marginTop: 8,
  },
  descInfo: {},
  descTitle: {
    ...TextStyles.primaryBold14,
    color: BLACK,
  },
  normalText: {
    ...TextStyles.regular14black,
    color: BLACK,
    lineHeight: 18,
    marginTop: 8,
  },
  promotText: {
    ...TextStyles.bold20,
    lineHeight: 26,
    color: PRIMARY_COLOR,
  },
  topSpacing: {
    marginTop: 40,
  },
  goldText: {
    ...TextStyles.semiBold16Black,
    lineHeight: 26,
    color: GOLD,
  },
  grayText: {
    color: BGGRAY,
  },
  fillScreen: {
    flex: 0.9
  },
});
export default styles;
