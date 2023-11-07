import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Platform } from 'react-native';
import { BUILDRR_BLUE, WHITE } from './Colors';

const isIos = Platform.OS === "ios"

const Loader = (props) => {
    const { loading } = props;
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {
                console.log('close modal');
            }}>
            <View style={styles.modalBackground}>
                <View style={isIos ? styles.activityIndicatorWrapperIos : styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={true}
                        color={BUILDRR_BLUE}
                        size="large"
                    />
                </View>
            </View>
        </Modal>
    );
};
export default Loader;


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00000040',
        justifyContent: 'center',
    },
    activityIndicatorWrapperIos: {
        alignItems: 'center',
        backgroundColor: WHITE,
        justifyContent: 'center',
        padding: 5,
        borderRadius: 90,
        paddingRight: 2,
        paddingBottom: 2
    },
    activityIndicatorWrapper: {
        alignItems: 'center',
        backgroundColor: WHITE,
        justifyContent: 'center',
        padding: 5,
        borderRadius: 90
    },
});
