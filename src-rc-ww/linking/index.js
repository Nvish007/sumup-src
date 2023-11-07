import { useEffect } from "react";
import { connect } from "react-redux";
// import { Button, Text, View } from "react-native";
import { handleDeepLinkVerification } from "src/redux/actions";
import { firebase } from "@react-native-firebase/dynamic-links";

function ListenApp({ navigation,
	dispatchDeepLinkVerification }) {
	// const [dataSource, setDataSource] = useState([]);
	const onDeepLinkResponse = (response) => {
		const { success } = response;
		// setDataSource(success);
		navigation.navigate("Registration");
		if (success === false) {
			console.info("Invalid Link");
		}
	};
	function parseURLParams(url) {
		let queryStart = url.indexOf("?") + 1;
		let queryEnd = url.indexOf("#") + 1 || url.length + 1;
		let query = url.slice(queryStart, queryEnd - 1);
		let pairs = query.replace(/\+/g, " ").split("&");
		let parms = {}; let i; let n; let v; let
			nv;

		if (query === url || query === "") return;

		for(i = 0; i < pairs.length; i++) {
			nv = pairs[i].split("=", 2);
			n = decodeURIComponent(nv[0]);
			v = decodeURIComponent(nv[1]);

			if (!parms.hasOwnProperty.call(n)) parms[n] = [];
			parms[n].push(nv.length === 2 ? v : null);
		}
		return parms;
	}
	const onTokenRecieved = (token) => {
		dispatchDeepLinkVerification({ token: token }, onDeepLinkResponse);
	};
	const handleDynamicLink = async(link) => {
		console.info(link);
		console.info("url", link.url);
	};

	useEffect(() => {
		firebase.dynamicLinks()
			.getInitialLink()
			.then((link) => {
				const data = link.url;
				// link.url for deep link
				let object = parseURLParams(data);
				console.info("email", object.token);
				const url = object.token;
				onTokenRecieved(url);
			});
		const unsubscribe = firebase.dynamicLinks().onLink(handleDynamicLink);
		return () => {
			unsubscribe();
		};
	}, []);

	return null;
}

const mapDispatchToProps = {
	dispatchDeepLinkVerification: handleDeepLinkVerification
};

export default connect(null, mapDispatchToProps)(ListenApp);