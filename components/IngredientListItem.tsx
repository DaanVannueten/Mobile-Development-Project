import {Ionicons} from '@expo/vector-icons'
import type {FunctionComponent} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Colors} from '../constants/Colors'
import {FontSizes, IconSizes, Spacing} from '../constants/Layout'
import type {Ingredient} from '../types'

interface IngredientListItemProps {
  ingredient: Ingredient
  onDelete: (id: string) => void
}

const styles = StyleSheet.create({
  ingredientItem: {
    flexDirection: 'row',
    backgroundColor: Colors.inputBackground,
    padding: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ingredientItemText: {
    flex: 1,
  },
  ingredientName: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  ingredientCalories: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  deleteButton: {
    padding: Spacing.xs,
  },
})

export const IngredientListItem: FunctionComponent<IngredientListItemProps> = ({ingredient, onDelete}) => {
  return (
    <View style={styles.ingredientItem}>
      <View style={styles.ingredientItemText}>
        <Text style={styles.ingredientName}>{ingredient.name}</Text>
        <Text style={styles.ingredientCalories}>{ingredient.calories} kcal</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(ingredient.id)}>
        <Ionicons name="trash-outline" size={IconSizes.sm} color={Colors.textSecondary} />
      </TouchableOpacity>
    </View>
  )
}
