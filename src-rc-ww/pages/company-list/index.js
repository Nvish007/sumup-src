import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "src/styles/pages/companyList";
import { translate } from "src/locales/i18n";
import { handleGetCompanyList, handleLinkUserToCompany } from "src/redux/actions";
import { getUserId, getCompanyList } from "src/redux/selectors";

const CompanyList = ({
	navigation,
	userId,
	companyList,
	dispatchGetCompanyList,
	dispatchLinkUserToCompany
}) => {
	useEffect(() => {
		dispatchGetCompanyList(userId);
	}, []);

	const onSuccessfullLinkUser = () => {
		navigation.navigate("Onboarding");
	};

	const handleCompanySelect = async(company) => {
		const serviceType = "userService";
		const data = { identifier: company?.identifier, userId };
		dispatchLinkUserToCompany(data, serviceType, onSuccessfullLinkUser);
	};
	return (
		<View style={styles.mainContainer}>
			<Text style={styles.selectCompanyTitle}>{translate("companyLogin.selectOperator")}</Text>
			<View style={styles.companyListContainer}>
				{
					companyList.map((company) => (
						<TouchableOpacity
							onPress={() => handleCompanySelect(company)}
							style={styles.companyContainer}
							key={company.id}
						>
							<View style={styles.companyImage}>
								<Image
									source={{ uri: company.image }}
									style={styles.logo}
								/>
							</View>
							<View style={styles.companyDetails}>
								<Text style={styles.companyName}>{company.name}</Text>
							</View>
						</TouchableOpacity>
					))
				}
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({
	userId: getUserId(state),
	companyList: getCompanyList(state)
});

const mapDispatchToProps = {
	dispatchGetCompanyList: handleGetCompanyList,
	dispatchLinkUserToCompany: handleLinkUserToCompany
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList);