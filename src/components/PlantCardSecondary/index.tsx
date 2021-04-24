import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View, Animated } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg';
import colors from '../../styles/colors';

import { styles } from './styles';

interface PlantCardSecondaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

export function PlantCardSecondary({ data, handleRemove,...rest }: PlantCardSecondaryProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => {
        return (
          <Animated.View>
            <RectButton  
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather 
                name="trash" 
                size={32} 
                color={colors.white} 
              />
            </RectButton>
          </Animated.View>
        );
      }}
    >
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
    </Swipeable>
  );
}