import { createSelector } from "reselect";

export const getOnBoardingQuestions = createSelector(
	(state) => state.onBoarding,
	(onBoarding) => onBoarding.onBoardingInfo?.questions
);

export const getOnBoardingSteps = createSelector(
	(state) => state.onBoarding,
	(onBoarding) => onBoarding.onBoardingInfo?.steps
);

export const getStripePublishableKey = createSelector(
	(state) => state.onBoarding,
	(onBoarding) => onBoarding.stripePublishableKey
);

export const getUserDetails = createSelector(
	(state) => state.onBoarding,
	(onBoarding) => onBoarding.userDetails?.["client_detail"]
);