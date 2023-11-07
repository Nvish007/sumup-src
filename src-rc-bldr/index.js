import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import RootNavigator from './Navigation/RootNavigator';
import Loader from './components/loader';

const AppContainer = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  return (
    <View style={styles.container}>
      <RootNavigator />
      {isLoading && <Loader isLoading={isLoading} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
