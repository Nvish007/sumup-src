import React from "react";
import { connect } from "react-redux";
import QuestionField from "src/components/QuestionField";
import { onBoardingShowed, saveOnBoardingInfo, updateUserOnBoardingStatus } from "src/redux/actions";
import { getOnBoardingQuestions, getOnBoardingSteps, getEndUserId } from "src/redux/selectors";

const Questions = ({
	navigation,
	route,
	questions,
	steps,
	endUserId,
	dispatchOnBoardingShowed,
	dispatchSaveOnBoardingInfo,
	dispatchUpdateUserOnBoardingStatus
}) => {
	const getStructureData = (data) => {
		return new Promise((resolve) => {
			const informationObject = { information: {} };
			const keys = Object.keys(data);
			if (keys.length > 0) {
				keys.forEach((question, index) => {
					informationObject.information[question] = data[question]?.value;
					if (index === Object.keys(data).length - 1) {
						resolve(informationObject);
					}
				});
			} else {
				resolve(informationObject);
			}
		});
	};

	const onSavingOnBoardingResponse = () => {
		const screenName = route.name;
		const stepIndex = steps.findIndex((step) => step === screenName);
		if (steps?.[stepIndex + 1]) {
			navigation.navigate(steps?.[stepIndex + 1]);
		} else {
			dispatchUpdateUserOnBoardingStatus();
			dispatchOnBoardingShowed();
		}
	};

	const onNavigate = async(data) => {
		const onBoardingAnswer = await getStructureData(data);
		dispatchSaveOnBoardingInfo(endUserId, onBoardingAnswer, onSavingOnBoardingResponse);
	};

	return (
		<>
			{
				questions
				&& (
					<QuestionField
						questions={questions}
						onComplete={onNavigate}
						navigation={navigation}
					/>
				)
			}
		</>
	);
};

const mapStateToProps = (state) => ({
	questions: getOnBoardingQuestions(state),
	steps: getOnBoardingSteps(state),
	endUserId: getEndUserId(state),
});

const mapDispatchToProps = {
	dispatchOnBoardingShowed: onBoardingShowed,
	dispatchSaveOnBoardingInfo: saveOnBoardingInfo,
	dispatchUpdateUserOnBoardingStatus: updateUserOnBoardingStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
