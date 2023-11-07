import React, { useEffect } from "react";
import { connect } from "react-redux";
import Swiper from "react-native-swiper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { translate } from "src/locales/i18n";
import WalktroughComponent from "src/components/WalktroughComponent";
import { KeyValueStore } from "src/utils/KeyValueStore";
import styles from "src/styles/pages/walkthrough";
import { getCompanyLogo } from "src/redux/selectors/company";
import { showWalkthrough } from "src/redux/actions";

const WalktroughScreen = ({
	navigation,
	companyLogo,
	dispatchShowWalkthrough
}) => {
	const insets = useSafeAreaInsets();
	useEffect(() => {
		KeyValueStore.setItem("walkthroughShowed", "true");
	}, []);
	const onNavigate = () => {
		dispatchShowWalkthrough(false);
		navigation.navigate("Home");
	};

	return (
		<Swiper
			prevButton={<FontAwesome name="caret-left" color="white" size={32} />}
			nextButton={<FontAwesome name="caret-right" color="white" size={32} />}
			style={styles.wrapper}
			buttonWrapperStyle={[styles.swiperButtons, { paddingBottom: insets.bottom }]}
			showsButtons={true}
			showsPagination={false}
			autoplayDirection={true}
			autoplay={false}
			loop={false}
		>
			<WalktroughComponent
				image={companyLogo}
				skipPressed={() => onNavigate()}
				skipButtonText={translate("walktrough.skipButtonText")}
				titleText={translate("walktrough.slide1.title")}
				contentText1={translate("walktrough.slide1.content")}
			/>
			<WalktroughComponent
				skipPressed={() => onNavigate()}
				skipButtonText={translate("walktrough.skipButtonText")}
				titleText={translate("walktrough.slide2.title")}
				contentText1={translate("walktrough.slide2.content")}
			/>
			<WalktroughComponent
				skipPressed={() => onNavigate()}
				skipButtonText={translate("walktrough.skipButtonText")}
				titleText={translate("walktrough.slide3.title")}
				contentText1={translate("walktrough.slide3.contentpara1")}
				contentText2={translate("walktrough.slide3.contentpara2")}
				contentText3={translate("walktrough.slide3.contentpara3")}
			/>
			<WalktroughComponent
				skipPressed={() => onNavigate()}
				skipButtonText={translate("walktrough.skipButtonText")}
				titleText={translate("walktrough.slide4.title")}
				contentText1={translate("walktrough.slide4.contentpara1")}
				contentText2={translate("walktrough.slide4.contentpara2")}
			/>
			<WalktroughComponent
				skipPressed={() => onNavigate()}
				skipButtonText={translate("walktrough.skipButtonText")}
				titleText={translate("walktrough.slide5.title")}
				contentText1={translate("walktrough.slide5.contentpara1")}
				contentText2={translate("walktrough.slide5.contentpara2")}
			/>
			<WalktroughComponent
				skipPressed={() => onNavigate()}
				skipButtonText={translate("walktrough.skipButtonText")}
				titleText={translate("walktrough.slide6.title")}
				contentText1={translate("walktrough.slide6.content")}
			/>
			<WalktroughComponent
				doneButtonText={translate("walktrough.doneButtonText")}
				onDone={() => onNavigate()}
				titleText={translate("walktrough.slide7.title")}
				contentText1={translate("walktrough.slide7.contentpara1")}
				contentText2={translate("walktrough.slide7.contentpara2")}
				contentText3={translate("walktrough.slide7.contentpara3")}
			/>
		</Swiper>
	);
};

const mapStateToProps = (state) => ({
	companyLogo: getCompanyLogo(state)
});

const mapDispatchToProps = {
	dispatchShowWalkthrough: showWalkthrough
};

export default connect(mapStateToProps, mapDispatchToProps)(WalktroughScreen);