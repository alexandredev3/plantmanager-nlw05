import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        {
          opacity: rest.disabled ? 0.5 : 1
        }
      ]} 
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}