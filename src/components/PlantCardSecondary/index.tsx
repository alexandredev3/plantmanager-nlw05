import React from 'react';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import { styles } from './styles';

interface PlantCardSecondaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  }
}

export function PlantCardSecondary({ data, ...rest }: PlantCardSecondaryProps) {
  return (
    <RectButton 
      style={styles.container}
      {...rest}
    >
      <SvgFromUri 
        uri={data.photo} 
        width={50}
        height={50}
      />
      <Text style={styles.title}>
        { data.name }
      </Text>
      <View style={styles.details}>
        <Text style={styles.timeLabel}>
          Regar às
        </Text>
        <Text style={styles.time}>
          { data.hour }
        </Text>
      </View>
    </RectButton>
  );
}