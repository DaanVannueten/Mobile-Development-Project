import {Ionicons} from '@expo/vector-icons'
import type {FunctionComponent} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Colors} from '../constants/Colors'
import {FontSizes, IconSizes, Spacing} from '../constants/Layout'
import {Strings} from '../constants/Strings'

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
})

export const EmptyState: FunctionComponent = () => {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="restaurant-outline" size={IconSizes.xxl} color={Colors.textSecondary} />
      <Text style={styles.emptyText}>{Strings.home.emptyState}</Text>
    </View>
  )
}
