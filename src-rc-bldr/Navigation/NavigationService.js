import { CommonActions, DrawerActions } from "@react-navigation/native";

let navigator;

const setTopLevelNavigator = (navigatorRef) => {
    navigator = navigatorRef;
};

const navigate = (routeName, params) => {
    navigator.dispatch(
        CommonActions.navigate(routeName, {
            ...params,
        })
    );
};

const reset = (routeName, params = "") => {
    const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: routeName, params: params }],
    });

    navigator.dispatch(resetAction);
};

const openDrawer = () => {
    navigator.dispatch(DrawerActions.openDrawer());
};

const closeDrawer = () => {
    navigator.dispatch(DrawerActions.closeDrawer());
};

const getActiveRoute = () => {
    return navigator.getCurrentRoute();
};

export default {
    setTopLevelNavigator,
    navigate,
    reset,
    openDrawer,
    closeDrawer,
    getActiveRoute,
};
