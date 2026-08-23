import React from 'react';
import {View, Text} from 'react-native';
import {Lightbulb, ChevronRight} from 'lucide-react-native';
import {fonts, fontSizes, spacing} from '../../styles/theme';

export default function ReminderBanner({message}) {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', margin: spacing.md, padding: spacing.md, borderRadius: 16, backgroundColor: '#EAF7EF'}}>
          <Lightbulb size={20} color="#22A559"/>
          <Text style={{flex: 1, marginLeft: spacing.sm, fontSize: fontSizes.small, fontFamily: fonts.regular}}>
              {message}
          </Text>
          <ChevronRight size={18} color="#888"/>
      </View>
    );
}