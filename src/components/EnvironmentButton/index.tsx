import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnvironmentButton({
  title,
  active=false,
  ...rest
}: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[
        styles.container, 
        active && styles.containerActive
      ]}
      {...rest}
    >
      <Text style={[
        styles.text, 
        active && styles.textActive
      ]}>
        { title }
      </Text>
    </RectButton>
  );
}