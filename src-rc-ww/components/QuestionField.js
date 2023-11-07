import PropTypes from "prop-types";
import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
} from "react-native";
import { Picker, CheckBox } from "native-base";
import Button from "src/components/ButtonComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import styles from "src/styles/components/QuestionField";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Images from "src/assets/images";
import { translate } from "src/locales/i18n";
import AppTheme from "src/styles/theme";

function QuestionField({ questions, onComplete, navigation }) {
	const swiper = useRef(null);
	const [fields, setFields] = useState({});

	const initializeQuestions = () => {
		questions.forEach((question) => {
			if (question.type === "checkbox") {
				setFields((prevstate) => {
					return { ...prevstate, [question.key]: { key: question.key, value: false, type: question.type } };
				});
			} else if (question.type === "select") {
				setFields((prevstate) => {
					return { ...prevstate, [question.key]: { key: question.key, value: question?.option?.[0], type: question.type } };
				});
			} else {
				setFields((prevstate) => {
					return { ...prevstate, [question.key]: { key: question.key, value: null, type: question.type } };
				});
			}
		});
	};

	useEffect(() => {
		initializeQuestions();
	}, []);

	const updateValue = (value, question) => {
		setFields({ ...fields, [question.key]: { key: question.key, value, type: question.type } });
	};

	const typeCase = (question) => {
		switch (question.type) {
			case "input":
				return (
					<View style={styles.viewInput}>
						<TextInput
							style={styles.input}
							value={fields?.[question.key]?.value}
							onChangeText={(text) => updateValue(text, question)}
							placeholder="Answer"
						/>
					</View>
				);
			case "checkbox":
				return (
					<View style={styles.checkBoxRow}>
						<CheckBox
							checked={fields?.[question.key]?.value}
							color={AppTheme.colors.primary}
							onPress={() => {
								const value = fields?.[question.key]?.value ? !(fields?.[question.key]?.value) : true;
								updateValue(value, question);
							}}
						/>
						<Text style={styles.checkBoxText}> value </Text>
					</View>
				);
			case "select":
				return (
					<View style={styles.dropdownView}>
						<Picker
							mode="dialog"
							style={styles.picker}
							selectedValue={fields?.[question.key]?.value}
							onValueChange={(value) => updateValue(value, question)}
						>
							{
								question.option.map((value) => (
									<Picker.Item
										key={value}
										label={value.toString()}
										value={value.toString()}
									/>
								))
							}
						</Picker>
					</View>
				);
		}
	};

	const submit = () => {
		onComplete(fields);
	};

	const onNext = (question) => {
		const lastQuestion = questions.slice(-1);
		swiper.current.scrollBy(1);
		if (lastQuestion[0].type === question.type) {
			submit();
		}
	};

	const onPrevious = (question) => {
		if (questions?.[0].type === question.type) {
			navigation.pop();
		} else {
			swiper.current.scrollBy(-1);
		}
	};

	return (
		<SafeAreaView
			style={styles.safeView}
		>
			<Swiper
				ref={swiper}
				showsButtons={false}
				showsPagination={false}
				autoplay={false}
				loop={false}
				scrollEnabled={false}
				index={0}
			>
				{
					questions.map((question) => (
						<View style={styles.safeView} key={question.type}>
							<View style={styles.subView}>
								<TouchableOpacity
									style={styles.backButtonArrow}
									onPress={() => onPrevious(question)}
								>
									<MaterialIcons
										name="arrow-back"
										color={AppTheme.colors.primary}
										size={30}
									/>
								</TouchableOpacity>
								<View style={styles.titleFont}>
									<Text style={styles.titleTextFont}>{translate("onboarding.title")}</Text>
								</View>
								<View style={styles.pageNumber}>
									<Text style={styles.pageNumberStyle}>1/3</Text>
								</View>
							</View>
							<View style={styles.appLogoContainer}>
								<Image
									source={Images.authScreen.mobility}
									style={styles.logo}
								/>
							</View>
							<View style={styles.slide}>
								<Text style={styles.questionText}>{translate("onboarding.question")}</Text>
								<Text style={styles.screenTitle}>{question.label}</Text>
								<View style={styles.screenTypecaseView}>{typeCase(question)}</View>
							</View>
							<View style={styles.verifyButtonContainer}>
								<Button
									buttonText="CONTINUE"
									buttonStyle={styles.confirmButton}
									textStyle={styles.buttonTextsStyle}
									buttonClicked={() => onNext(question)}
								/>
								<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
							</View>
						</View>
					))
				}
			</Swiper>
		</SafeAreaView>
	);
}

QuestionField.propTypes = {
	questions: PropTypes.array.isRequired,
	onComplete: PropTypes.func.isRequired,
	navigation: PropTypes.object.isRequired
};

export default QuestionField;
