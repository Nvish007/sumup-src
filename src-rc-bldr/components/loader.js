import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { isIOS } from '../utils/helpers';

const Loader = ({ isLoading }) => {
    if (isLoading) {
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={isLoading}
                onRequestClose={() => {
                }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            animating={true}
                            color={'#203269'}
                            size="large"
                        />
                    </View>
                </View>
            </Modal>
        );
    } else {
        return null;
    }
};
export default Loader;


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00000040',
        justifyContent: 'center',
    },
    activityIndicatorWrapper: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: isIOS() ? 0 : 5,
        borderRadius: 25,
        height: 50,
        width: 50,
        paddingLeft: isIOS() ? 3 : 5,
        paddingTop: isIOS() ? 3 : 5,
    }
});
