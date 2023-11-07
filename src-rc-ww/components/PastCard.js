// import PropTypes from "prop-types";
import React from "react";
import { Text, View } from "react-native";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/components/PastCard";

export default function PastCard() {
	const dataPast = [
		{ key: "1", name: "Citroen c0", price: "12.34", startLocation: "Holsbeek", endLocation: "Holsbeek", startDate: "03/04 14:05", endDate: "03/04 14:05" },
		{ key: "2", name: "Bike", price: "12.34", startLocation: "Holsbeek", endLocation: "Holsbeek", startDate: "03/04 14:05", endDate: "03/04 14:05" }
	];
	return (
		<View>
			{dataPast.map((item) => (
				<View style={styles.cardViewPast}>
					<View>
						<View style={styles.row}>
							<Text>Image</Text>
							<Text style={styles.text}>{item.name}</Text>
						</View>
						<View style={styles.view}>
							<View>
								<Text>
start Location
									{"\t"}
									{item.startLocation}
								</Text>
								<Text>
End Location
									{"\t"}
									{item.endLocation}
								</Text>
							</View>
							<View style={styles.margin}>
								<Text>{item.startDate}</Text>
								<Text>{item.endDate}</Text>
							</View>
						</View>
					</View>
					<View style={styles.buttonView}>
						<Button
							buttonStyle={{}}
							textStyle={styles.buttonTextsStyle}
							buttonText="Details"
						/>
						<Button
							buttonStyle={{}}
							textStyle={styles.buttonTextsStyle}
							buttonText="Feedback"
						/>
					</View>
				</View>
			))}
		</View>
	);
}
// PastCard.propTypes = {
// 	onDone: PropTypes.func,
// 	doneButtonText: PropTypes.string,
// 	titleText: PropTypes.string.isRequired,
// 	contentText2: PropTypes.string,
// };
// PastCard.defaultProps = {
// 	onDone: () => {},
// 	contentText2: "",
// 	doneButtonText: "",
// };