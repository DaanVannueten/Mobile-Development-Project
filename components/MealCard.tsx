import { Ionicons } from '@expo/vector-icons'
import type { FunctionComponent } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/Colors'
import { FontSizes, IconSizes, Spacing } from '../constants/Layout'
import { MealService } from '../services/MealService'
import type { Meal } from '../types'

interface MealCardProps {
  meal: Meal
  onPress?: (meal: Meal) => void
}

const styles = StyleSheet.create({
  mealItem: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  mealImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.inputBackground,
    marginRight: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  mealName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: 4,
  },
  mealCalories: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
})

export const MealCard: FunctionComponent<MealCardProps> = ({meal, onPress}) => {
  return (
    <Pressable style={styles.mealItem} onPress={() => onPress?.(meal)}>
      <View style={styles.mealImage}>
        <Ionicons name="restaurant-outline" size={IconSizes.md} color={Colors.primary} />
      </View>
      <View style={styles.mealInfo}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
          <Text style={styles.mealName}>{meal.name}</Text>
          <Text style={{marginLeft: Spacing.sm}}>{MealService.getRatingStars(meal.rating)}</Text>
        </View>
        <Text style={styles.mealCalories}>
          {MealService.getCategoryLabel(meal.category)} • {MealService.formatCalories(meal.totalCalories)} •{' '}
          {MealService.formatIngredientCount(meal.ingredients.length)}
        </Text>
        <Text style={{fontSize: FontSizes.xs, color: Colors.textSecondary, marginTop: 2}}>
          {MealService.formatDate(meal.date)} • {meal.time}
        </Text>
      </View>
    </Pressable>
  )
}
