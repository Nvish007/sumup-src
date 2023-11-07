import React from 'react';
import {Text, View} from 'react-native';
import styles from '../../Screen/styles/pages/OnboardingStyles';

const OverViewScreen2 = () => {
  return (
    <View style={[styles.onboardBody,styles.fillScreen]}>
      <Text style={styles.title}>{'EARLY BIRD KORTING !'}</Text>
      <Text style={styles.goldText}>
        {'€361/jaar!'}
        <Text style={styles.grayText}> (i.p.v.: €726)</Text>
      </Text>
      <View style={styles.topSpacing}>
        <Text style={styles.descTitle}>
          {'Geniet nu van de Early bird korting!'}
        </Text>
      </View>
    </View>
  );
};

export default OverViewScreen2;
