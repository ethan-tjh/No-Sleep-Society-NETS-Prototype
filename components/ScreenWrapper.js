import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../styles/theme';

export default function ScreenWrapper({children, style}) {
    return (
      <SafeAreaView edges={['top']} style={[{flex: 1, backgroundColor: colors.background}, style]}>
          {children}
      </SafeAreaView>
    );
}