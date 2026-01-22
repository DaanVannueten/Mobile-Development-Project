import { Ionicons } from '@expo/vector-icons'
import type { FunctionComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, FontSizes, IconSizes, Spacing } from '../constants'
import type { Ingredient } from '../types'
import { IngredientListItem } from './IngredientListItem'

interface IngredientsListProps {
  ingredients: Ingredient[]
  onDeleteIngredient: (id: string) => void
  onSearchOnline?: () => void
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  headerText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    gap: Spacing.xs,
  },
  searchButtonText: {
    color: 'white',
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  ingredientsList: {
    gap: Spacing.sm,
  },
})

export const IngredientsList: FunctionComponent<IngredientsListProps> = ({
  ingredients, 
  onDeleteIngredient,
  onSearchOnline
}) => {
  if (ingredients.length === 0 && !onSearchOnline) {
    return null
  }

  return (
    <View style={styles.container}>
      {onSearchOnline && (
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Ingredients ({ingredients.length})
          </Text>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={onSearchOnline}
          >
            <Ionicons name="search" size={IconSizes.sm} color="white" />
            <Text style={styles.searchButtonText}>Search Online</Text>
          </TouchableOpacity>
        </View>
      )}

      {ingredients.length > 0 && (
        <View style={styles.ingredientsList}>
          {ingredients.map(ingredient => (
            <IngredientListItem 
              key={ingredient.id} 
              ingredient={ingredient} 
              onDelete={onDeleteIngredient} 
            />
          ))}
        </View>
      )}
    </View>
  )
}
