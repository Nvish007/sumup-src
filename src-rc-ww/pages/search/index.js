import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
// import FocusAwareStatusBar from "src/components/FocusAwareStatusBar";
import {
	// useSafeAreaInsets,
	SafeAreaView
} from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/AntDesign";
import { Form, Item, Input } from "native-base";
import Button from "src/components/ButtonComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Images from "src/assets/images";
import { translate } from "src/locales/i18n";
import styles from "src/styles/pages/search";

const SearchScreen = ({
	navigation
}) => {
	// const insets = useSafeAreaInsets();
	return (
		<SafeAreaView style={styles.safeAreaView}>
			<KeyboardAwareScrollView contentContainerStyle={styles.container}>
				<TouchableOpacity
					onPress={() => navigation.pop()}
					style={styles.backButton}
				>
					<Image source={Images.common.backArrow} style={styles.backArrowIcon} />
				</TouchableOpacity>
				<View style={styles.appLogoContainer}>
					<Image source={Images.authScreen.mobility} style={styles.logo} />
				</View>
				<View style={styles.marginL}>
					<Text style={styles.text}>{translate("searchScreen.titleText")}</Text>
				</View>
				<View style={styles.formView}>
					<Form>
						<Item style={styles.nameItemInput} regular>
							<Input
								style={styles.emailInput}
								placeholder={translate("searchScreen.placeHolderText")}
							/>
							<TouchableOpacity>
								<FontAwesome
									name="close"
									color="#000"
									size={18}
									style={styles.marginR}
								/>
							</TouchableOpacity>
						</Item>
					</Form>
				</View>
			</KeyboardAwareScrollView>
			<View style={styles.buttonContainer}>
				<Button
					// buttonClicked={onConfirm}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonText={translate("searchScreen.continue")}
					// disabled={!termsAndCondition.value}
				/>
				<Image source={Images.common.forwardArrow} style={styles.confirmForwardButton} />
			</View>
		</SafeAreaView>
		// <View style={styles.container}>
		// 	<View style={[styles.subContainer, { marginBottom: insets.bottom, top: insets.top }]}>
		// 		<FocusAwareStatusBar barStyle="light-content" />
		// 		<View style={styles.leftArrowContainer}>
		// 			<FontAwesome
		// 				name="angle-left"
		// 				color="#FFFFFF"
		// 				size={30}
		// 				onPress={() => navigation.goBack()}
		// 			/>
		// 		</View>
		// 		<View style={styles.innerContent}>
		// 			<Text style={styles.text}>
		// 				{translate("searchScreen.textDiscription")}
		// 			</Text>
		// 			<View style={styles.inputContainer}>
		// 				<TextInput
		// 					style={styles.textInput}
		// 					placeholderTextColor="#cccccc"
		// 					placeholder={translate("searchScreen.placeHolderText")}
		// 					keyboardType="number-pad"
		// 					keyboardAppearance="dark"
		// 				/>
		// 				<TouchableOpacity
		// 					style={styles.closeButton}
		// 					onPress={() => {
		// 						// console.log("closed");
		// 					}}
		// 				>
		// 					<FontAwesome
		// 						name="close"
		// 						color="#FFFFFF"
		// 						size={18}
		// 					/>
		// 				</TouchableOpacity>
		// 			</View>
		// 		</View>
		// 		<TouchableOpacity
		// 			style={[styles.rightArrowContainer, { marginBottom: insets.bottom }]}
		// 		>
		// 			<FontAwesome
		// 				name="angle-right"
		// 				color="#2b8001"
		// 				size={35}
		// 			/>
		// 		</TouchableOpacity>
		// 	</View>
		// </View>
	);
};

export default SearchScreen;