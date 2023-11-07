import React from 'react';
import {Text, View} from 'react-native';
import styles from '../../Screen/styles/pages/OnboardingStyles';

const OverViewScreen1 = () => {
  return (
    <View style={styles.onboardBody}>
      <Text style={styles.title}>
        {'Cool dat jij ook Buildrr-klant wil worden! '}
      </Text>
      <Text style={styles.titleDesc}>
        {'(Opgepast! Enkel voor zelfstandigen)'}
      </Text>
      <View style={styles.topSpacing}>
        <Text style={styles.descTitle}>{'Pricesetting'}</Text>
        <Text style={styles.normalText}>
          {
            'Bij ons ben jij heel het jaar door zichtbaar en vindbaar via de app voor maar €1,99 per dag. De prijs van 1 kopje koffie per dag dus ! Met andere woorden, je betaalt slechts 726 euro per jaar. Prijs kwaliteit de beste reclame in zowel België als Nederland. Geen extra kosten per klik of contact'
          }
        </Text>
        <View style={styles.topSpacing}>
          <Text style={styles.promotText}>{'PROMOTIE!'}</Text>
          <Text style={styles.promotText}>
            {'EARLY BIRD KORTING! €361/jaar'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OverViewScreen1;
