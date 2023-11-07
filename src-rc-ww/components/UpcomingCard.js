// import PropTypes from "prop-types";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "src/styles/components/UpcomingCard";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "src/components/ButtonComponent";

export default function UpcomingCard() {
	const dataUpcoming = [
		{ key: "1", name: "Citroen c0", model: "1-ABC-123", location: "Location", date: "start: 03/04 14:05" },
		{ key: "2", name: "Bike", model: "1-ABC-123", location: "Location", date: "start: 04/04 14:05" }
	];
	return (
		<View>
			{dataUpcoming.map((item) => (
				<View style={styles.cardViewUpcoming}>
					<Text style={styles.top}>Image</Text>
					<View style={styles.left}>
						<Text>{item.name}</Text>
						<Text>{item.model}</Text>
						<Text>{item.location}</Text>
						<Text>{item.date}</Text>
					</View>
					<View style={styles.upcomingView}>
						<TouchableOpacity>
							<FontAwesome
								name="search"
								color="black"
								size={30}
							/>
							<Text> Locate </Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<FontAwesome
								name="edit"
								color="black"
								size={30}
							/>
							<Text> Edit </Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<MaterialIcons
								name="cancel"
								color="black"
								size={30}
							/>
							<Text> Cancel </Text>
						</TouchableOpacity>
					</View>
					<Button
						buttonStyle={styles.margin}
						textStyle={styles.buttonTextsStyle}
						buttonText="Details"
					/>
				</View>
			))}

		</View>
	);
}

// UpcomingCard.propTypes = {
// 	type: PropTypes.string,
// };
// UpcomingCard.defaultProps = {
// 	type: ""
// };