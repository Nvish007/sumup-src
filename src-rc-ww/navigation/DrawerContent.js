import React from "react";
import { connect } from "react-redux";
import { Image, View, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import { List, ListItem, Left, Right } from "native-base";
import Animated from "react-native-reanimated";
// import { DrawerContentScrollView } from "@react-navigation/drawer";
import { ScrollView } from "react-native-gesture-handler";
import { Images } from "src/assets/images";
import * as companyActions from "src/redux/actions/companyActions";
import * as authActions from "src/redux/actions/authActions";
import styles from "src/styles/components/DrawerContent";
import { getEndUserId, getUser, getUserProfilePicture, getClientGroupImage, getFleetTypeCar } from "src/redux/selectors/index";
import { translate } from "src/locales/i18n";
import Config from "react-native-config";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const DrawerContent = (props) => {
	const environment = "DEV";
	const { navigation, user, dispatchLogout, endUserId, progress, profilePicture, clientGroupImage, fleetTypeCar } = props;

	const translateY = Animated.interpolate(progress, {
		inputRange: [0, 1],
		outputRange: [screenHeight, 0],
	});
	const serviceType = "sharingService";
	const translateX = Animated.interpolate(progress, {
		inputRange: [0, 1],
		outputRange: [screenWidth, 0],
	});

	const navigateTo = (screen) => {
		navigation.navigate(screen);
		navigation.closeDrawer();
	};

	const getProfileImage = () => {
		if (clientGroupImage) {
			return (
				<Image
					source={{ uri: clientGroupImage }}
					style={styles.profileImage}
				/>
			);
		} else if (profilePicture) {
			return (
				<Image
					source={{ uri: profilePicture }}
					style={styles.profileImage}
				/>
			);
		} else {
			return (
				<Image
					source={Images.authScreen.profileImage}
					style={styles.profileImage}
				/>
			);
		}
	};

	return (
		<Animated.View style={[styles.drawerContent, { transform: [{ translateY, translateX }] }]}>
			<View style={styles.userInfoSection}>
				<TouchableOpacity
					onPress={() => navigation.closeDrawer()}
					style={styles.backButton}
				>
					<Image source={Images.common.backArrow} style={styles.backArrowIcon} />
				</TouchableOpacity>
				<View style={styles.profileSection}>
					{
						getProfileImage()
					}
				</View>
				<Text style={styles.title}>
					{`${user.firstname} ${user.lastname}`}
				</Text>
			</View>
			{/* Bottom Menu */}
			<View style={styles.drawerSectionWhite}>
				<TouchableOpacity
					style={styles.customerCareIcon}
					onPress={() => navigateTo("Support")}
				>
					<Image
						source={Images.authScreen.customerCareImage}
						style={styles.customerCareImage}
					/>
				</TouchableOpacity>
				<ScrollView style={styles.listScrollView}>
					<List style={styles.MenuListMain}>
						<ListItem style={styles.menuList} onPress={() => navigateTo("EditProfile")}>
							<Left>
								<Image
									source={Images.authScreen.userIcon}
									style={styles.menuIcon}
								/>
								<Text style={styles.menuText}>{translate("drawerContent.myAccount")}</Text>
							</Left>
							<Right>
								<Image
									source={Images.authScreen.rightArrowIcon}
									style={styles.rightArrowIcon}
								/>
							</Right>
						</ListItem>
						{/* <ListItem style={styles.menuList} onPress={() => navigateTo("Payments")}>
							<Left>
								<Image
									source={Images.authScreen.paymentIcon}
									style={styles.menuIcon}
								/>
								<Text style={styles.menuText}>{translate("drawerContent.payments")}</Text>
							</Left>
							<Right>
								<Image
									source={Images.authScreen.rightArrowIcon}
									style={styles.rightArrowIcon}
								/>
							</Right>
						</ListItem> */}
						<ListItem style={styles.menuList} onPress={() => navigateTo("Rides")}>
							<Left>
								<Image
									source={Images.authScreen.myRides}
									style={styles.menuIcon}
								/>
								<Text style={styles.menuText}>{translate("drawerContent.myRides")}</Text>
							</Left>
							<Right>

								<Image
									source={Images.authScreen.rightArrowIcon}
									style={styles.rightArrowIcon}
								/>
							</Right>
						</ListItem>
						{
							fleetTypeCar
							&& (
								<>
									<ListItem style={styles.menuList} onPress={() => navigateTo("Reservations")}>
										<Left>
											<Image
												source={Images.authScreen.supportIcon}
												style={styles.menuIcon}
											/>
											<Text style={styles.menuText}>{translate("drawerContent.myReservation")}</Text>
										</Left>
										<Right>
											<Image
												source={Images.authScreen.rightArrowIcon}
												style={styles.rightArrowIcon}
											/>
										</Right>
									</ListItem>
									<ListItem style={styles.menuList} onPress={() => navigateTo("NewReservations")}>
										<Left>
											<Image
												source={Images.authScreen.supportIcon}
												style={styles.menuIcon}
											/>
											<Text style={styles.menuText}>{translate("drawerContent.bookVehicle")}</Text>
										</Left>
										<Right>
											<Image
												source={Images.authScreen.rightArrowIcon}
												style={styles.rightArrowIcon}
											/>
										</Right>
									</ListItem>
								</>
							)
						}
						{/* <ListItem style={styles.menuList} onPress={() => navigateTo("Topup")}>
							<Left>
								<Image
									source={Images.authScreen.supportIcon}
									style={styles.menuIcon}
								/>
								<Text style={styles.menuText}>{translate("drawerContent.topUp")}</Text>
							</Left>
							<Right>
								<Image
									source={Images.authScreen.rightArrowIcon}
									style={styles.rightArrowIcon}
								/>
							</Right>
						</ListItem> */}
						{
							<ListItem style={styles.menuList} onPress={() => navigateTo("Wallet")}>
								<Left>
									<Image
										source={Images.authScreen.supportIcon}
										style={styles.menuIcon}
									/>
									<Text style={styles.menuText}>{translate("drawerContent.wallet")}</Text>
								</Left>
								<Right>
									<Image
										source={Images.authScreen.rightArrowIcon}
										style={styles.rightArrowIcon}
									/>
								</Right>
							</ListItem>
						}
						{
							Config.ENVIRONMENT === environment
							&&	(
								<ListItem style={styles.menuList}>
									<Left>
										<Image
											source={Images.authScreen.supportIcon}
											style={styles.menuIcon}
										/>
										<Text style={styles.menuText}>{translate("drawerContent.subscription")}</Text>
									</Left>
									<Right>
										<Image
											source={Images.authScreen.rightArrowIcon}
											style={styles.rightArrowIcon}
										/>
									</Right>
								</ListItem>
							)
						}
						<ListItem
							style={styles.menuList}
							onPress={() => navigateTo("Support")}
						>
							<Left>
								<Image
									source={Images.authScreen.supportIcon}
									style={styles.menuIcon}
								/>
								<Text style={styles.menuText}>{translate("drawerContent.support")}</Text>
							</Left>
							<Right>
								<Image
									source={Images.authScreen.rightArrowIcon}
									style={styles.rightArrowIcon}
								/>
							</Right>
						</ListItem>
						{
							Config.ENVIRONMENT === environment
							&&	(
								<ListItem style={styles.menuList}>
									<Left>
										<Image
											source={Images.authScreen.documentIcon}
											style={styles.menuIcon}
										/>
										<Text style={styles.menuText}>{translate("drawerContent.documents")}</Text>
									</Left>
									<Right>
										<Image
											source={Images.authScreen.rightArrowIcon}
											style={styles.rightArrowIcon}
										/>
									</Right>
								</ListItem>
							)
						}
						{
							Config.ENVIRONMENT === environment
							&&	(
								<ListItem
									style={[styles.menuList]}
									onPress={() => navigateTo("BLE")}
								>
									<Left>
										<Image
											source={Images.authScreen.aboutIcon}
											style={styles.menuIcon}
										/>
										<Text style={styles.menuText}>{translate("drawerContent.ble")}</Text>
									</Left>
									<Right>
										<Image
											source={Images.authScreen.rightArrowIcon}
											style={styles.rightArrowIcon}
										/>
									</Right>
								</ListItem>
							)
						}
						<ListItem
							style={[styles.menuList]}
							onPress={() => navigateTo("ReferralCode")}
						>
							<Left>
								<Image
									source={Images.authScreen.aboutIcon}
									style={styles.menuIcon}
								/>
								<Text style={styles.menuText}>{translate("drawerContent.referral")}</Text>
							</Left>
							<Right>
								<Image
									source={Images.authScreen.rightArrowIcon}
									style={styles.rightArrowIcon}
								/>
							</Right>
						</ListItem>
						<ListItem
							style={[styles.menuList]}
							onPress={() => navigateTo("PaymentMethod")}
						>
							<Left>
								<Image
									source={Images.authScreen.aboutIcon}
									style={styles.menuIcon}
								/>
								<Text style={styles.menuText}>{translate("drawerContent.paymentMethod")}</Text>
							</Left>
							<Right>
								<Image
									source={Images.authScreen.rightArrowIcon}
									style={styles.rightArrowIcon}
								/>
							</Right>
						</ListItem>
						<ListItem
							style={[styles.menuList]}
							onPress={() => navigateTo("ReportProblem")}
						>
							<Left>
								<Image
									source={Images.authScreen.aboutIcon}
									style={styles.menuIcon}
								/>
								<Text style={styles.menuText}>{translate("drawerContent.damage")}</Text>
							</Left>
							<Right>
								<Image
									source={Images.authScreen.rightArrowIcon}
									style={styles.rightArrowIcon}
								/>
							</Right>
						</ListItem>
						{
							Config.ENVIRONMENT === environment
							&&	(
								<ListItem style={[styles.menuList]}>
									<Left>
										<Image
											source={Images.authScreen.aboutIcon}
											style={styles.menuIcon}
										/>
										<Text style={styles.menuText}>{translate("drawerContent.about")}</Text>
									</Left>
									<Right>
										<Image
											source={Images.authScreen.rightArrowIcon}
											style={styles.rightArrowIcon}
										/>
									</Right>
								</ListItem>
							)
						}
						<ListItem
							style={[styles.menuList, styles.menuListLogout]}
							onPress={() => Alert.alert(
								translate("drawerContent.delete"),
								translate("drawerContent.deleteConfirmation"),
								[
									{
										text: "Delete Account",
										onPress: () => Alert.alert("We have sent you an email!")
									},
									{
										text: "Cancel",
										style: "cancel"
									},
								],
								{ cancelable: false }
							)}
						>
							<Left>
								<Image
									source={Images.authScreen.userIcon}
									style={styles.menuIcon}
								/>
								<Text style={styles.menuText}>{translate("drawerContent.AccountDeactivate")}</Text>
							</Left>
							<Right>
								<Image
									source={Images.authScreen.rightArrowIcon}
									style={styles.rightArrowIcon}
								/>
							</Right>
						</ListItem>
						<ListItem
							style={[styles.menuList]}
							onPress={() => Alert.alert(
								translate("drawerContent.logout"),
								translate("drawerContent.confirm"),
								[
									{
										text: "Yes",
										onPress: () => {
											dispatchLogout(endUserId, serviceType);
										}
									},
									{
										text: "Cancel",
										style: "cancel"
									},
								],
								{ cancelable: false }
							)}
						>
							<Left>
								<Image
									source={Images.authScreen.LogoutIcon}
									style={styles.LogoutIcon}
								/>
								<Text style={styles.logoutText}>{translate("drawerContent.logout")}</Text>
							</Left>
							<Right>
								<Image
									source={Images.authScreen.rightArrowIcon}
									style={styles.rightArrowIcon}
								/>
							</Right>
						</ListItem>
					</List>
				</ScrollView>
			</View>
		</Animated.View>
	);
};

const mapStateToProps = (state) => ({
	endUserId: getEndUserId(state),
	user: getUser(state),
	profilePicture: getUserProfilePicture(state),
	clientGroupImage: getClientGroupImage(state),
	fleetTypeCar: getFleetTypeCar(state),
});

const mapDispatchToProps = {
	dispatchExitCompany: () => companyActions.exitCompany(),
	dispatchLogout: (endUserId, serviceType) => authActions.handleLogout(endUserId, serviceType)
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
