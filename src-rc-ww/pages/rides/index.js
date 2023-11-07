import React, { useEffect, useLayoutEffect } from "react";
import { View, FlatList, Image } from "react-native";
import { Text, Card } from "native-base";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "src/assets/images";
import Button from "src/components/ButtonComponent";
import FastImage from "src/components/ImageComponent";
import styles from "src/styles/pages/ride";
import { translate } from "src/locales/i18n";
import { handleRentalList, selectRent } from "src/redux/actions";
import { getEndUserId, getRentalList } from "src/redux/selectors";
import dayjs from "dayjs";
import Config from "react-native-config";

const RidesScreen = ({
	navigation,
	endUsedId,
	rentalList,
	dispatchRentalList,
	dispatchSelectRent
}) => {
	const getRentalListData = () => {
		dispatchRentalList(endUsedId);
	};
	useEffect(() => {
		getRentalListData();
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.myRides")
		});
	}, [navigation]);

	const goToDetails = (item) => {
		dispatchSelectRent(item);
		navigation.navigate("RideDetails");
	};

	const renderList = ((item) => {
		const endDate = dayjs.utc(item?.endDate).local().format("DD/MM/YYYY HH:mm");
		return (
			<View style={styles.cardContainer}>
				<Card style={styles.card}>
					<View style={styles.cardContent}>
						{
							(item?.asset?.type === "car")
							&& (
								(item.asset.properties?.photo)
									? (
										<Image
											source={{ uri: `${Config.ASSET_SERVICE}${item.asset.properties.photo[0]}` }}
											style={item?.asset?.name.length < 15 ? styles.cardImage : styles.cardImage1}
										/>
									)
									: (
										<FastImage
											style={styles.cardImage}
											imageUrl={Images.common.car}
											resizeMode="cover"
											type="local"
										/>
									)
							)
						}
						{
							(item?.asset?.type === "bike")
							&& (
								<FastImage
									style={styles.cardImage}
									imageUrl={Images.common.bicycle}
									resizeMode="cover"
									type="local"
								/>
							)
						}
						<View style={styles.cardTextContainer}>
							{
								(item?.asset?.name.length < 15)
									?	(
										<Text style={styles.titleFont}>
											{item?.asset?.name}
										</Text>
									)
									: (
										<Text style={styles.titleText1} numberOfLines={1} ellipsizeMode="tail">
											{item?.asset?.name}
										</Text>
									)
							}
							{
								(item?.asset?.type === "car")
								&& (
									<Text style={styles.locationText}>{item?.asset?.properties?.["license-plate"]}</Text>
								)
							}
							<Text style={styles.locationText}>
								{item.endDate ? endDate : translate("rideDetails.ongoing")}
							</Text>
							<Text style={styles.locationText}>{item.amount === "0" ? "" : item.amount}</Text>
						</View>
						{
							(item.endDate)
							&& (
								(
									<Button
										buttonText={translate("rideDetails.details")}
										// style={styles.cardButtonContainer}
										buttonStyle={item.asset.name.length < 15 ? styles.cardButton : styles.cardButton1}
										textStyle={styles.buttonTextsStyle}
										buttonClicked={() => goToDetails(item)}
									/>
								)
							)
						}
					</View>
				</Card>
			</View>
		);
	});
	return (
		<SafeAreaView style={styles.safeView} edges={["right", "bottom", "left"]}>
			<View style={styles.listViewContainer}>
				<FlatList
					data={rentalList}
					renderItem={({ item }) => {
						return renderList(item);
					}}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
			{
				(rentalList?.length === 0)
					&& (
						<View style={styles.noRidesAvailable}>
							<Text style={[styles.titleText]}>{translate("rideDetails.noRide")}</Text>
						</View>
					)
			}
		</SafeAreaView>
	);
};
const mapStateToProps = (state) => ({
	endUsedId: getEndUserId(state),
	rentalList: getRentalList(state)
});
const mapDispatchToProps = {
	dispatchRentalList: handleRentalList,
	dispatchSelectRent: selectRent
};

export default connect(mapStateToProps, mapDispatchToProps)(RidesScreen);