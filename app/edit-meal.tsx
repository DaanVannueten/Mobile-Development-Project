import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { type FunctionComponent, useEffect, useState } from 'react'
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { IngredientSearch } from '../components'
import { IngredientsList } from '../components/IngredientsList'
import { PhotoPicker } from '../components/PhotoPicker'
import { Colors } from '../constants/Colors'
import { FontSizes, IconSizes, Spacing } from '../constants/Layout'
import { useMeals } from '../hooks/useMeals'
import { MealService } from '../services'
import type { NutritionProduct } from '../services/NutritionApiService'
import { ValidationService } from '../services/ValidationService'
import type { Ingredient } from '../types'
import { MealCategory } from '../types'
import { IdGenerator } from '../utils/IdGenerator'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  label: {
    fontSize: FontSizes.sm,
    color: Colors.text,
    marginBottom: Spacing.sm,
    fontWeight: '500',
  },
  input: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ingredientRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  ingredientInput: {
    flex: 1,
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  calorieInput: {
    width: 100,
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: Spacing.md,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  addButtonText: {
    color: 'white',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  totalSection: {
    backgroundColor: Colors.lightBackground,
    padding: Spacing.lg,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: FontSizes.md,
    fontWeight: '500',
  },
  totalCalories: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
  },
  saveButton: {
    backgroundColor: Colors.disabled,
    borderRadius: 8,
    padding: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  saveButtonActive: {
    backgroundColor: Colors.primary,
  },
  saveButtonText: {
    color: 'white',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  categoryButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  categoryButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  categoryButtonTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  starButton: {
    padding: Spacing.sm,
  },
  multilineInput: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  flex1: {
    flex: 1,
  },
})

const EditMeal: FunctionComponent = () => {
  const {id} = useLocalSearchParams<{id: string}>()
  const router = useRouter()
  const {meals, updateMeal} = useMeals()

  // Find the meal to edit
  const mealToEdit = meals.find(m => m.id === id)

  // Meal fields
  const [mealName, setMealName] = useState<string>('')
  const [category, setCategory] = useState<MealCategory>(MealCategory.Lunch)
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [rating, setRating] = useState<number>(3)
  const [imageUri, setImageUri] = useState<string | undefined>()

  // Ingredient fields
  const [ingredientName, setIngredientName] = useState<string>('')
  const [ingredientCalories, setIngredientCalories] = useState<string>('')
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [showIngredientSearch, setShowIngredientSearch] = useState<boolean>(false)

  // Load meal data on mount
  useEffect(() => {
    if (mealToEdit) {
      setMealName(mealToEdit.name)
      setCategory(mealToEdit.category)
      setDate(mealToEdit.date)
      setTime(mealToEdit.time)
      setNotes(mealToEdit.notes)
      setRating(mealToEdit.rating)
      setImageUri(mealToEdit.imageUri)
      setIngredients(mealToEdit.ingredients)
    }
  }, [mealToEdit])

  const totalCalories = MealService.calculateTotalCalories(ingredients)

  const canSave = (): boolean => {
    const validation = ValidationService.canSaveMeal(mealName, category, date, time, rating, ingredients)
    return validation.isValid
  }

  const handleAddIngredient = (): void => {
    const nameValidation = ValidationService.validateIngredientName(ingredientName)
    if (!nameValidation.isValid) {
      Alert.alert('Validatiefout', nameValidation.message || 'Ongeldige ingrediëntnaam')
      return
    }

    const caloriesValidation = ValidationService.validateCalories(ingredientCalories)
    if (!caloriesValidation.isValid) {
      Alert.alert('Validatiefout', caloriesValidation.message || 'Ongeldige calorieën')
      return
    }

    const newIngredient: Ingredient = {
      id: IdGenerator.generateIngredientId(),
      name: ingredientName.trim(),
      calories: Number(ingredientCalories),
    }

    setIngredients([...ingredients, newIngredient])
    setIngredientName('')
    setIngredientCalories('')
  }

  const handleDeleteIngredient = (ingredientId: string): void => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== ingredientId))
  }

  const handleSelectFromApi = (product: NutritionProduct): void => {
    // Auto-populate fields with API data
    setIngredientName(product.name)
    setIngredientCalories(product.calories.toString())
    
    Alert.alert(
      'Ingrediënt geselecteerd',
      `${product.name} - ${product.calories} kcal/100g\n\nPas de hoeveelheid aan indien nodig en klik op "Ingrediënt toevoegen".`,
      [{text: 'OK'}]
    )
  }

  const handleUpdateMeal = async (): Promise<void> => {
    if (!mealToEdit) {
      Alert.alert('Fout', 'Maaltijd niet gevonden')
      return
    }

    const validation = ValidationService.canSaveMeal(mealName, category, date, time, rating, ingredients)

    if (!validation.isValid) {
      Alert.alert('Validatiefout', validation.message || 'Controleer alle velden')
      return
    }

    try {
      const updatedMeal = MealService.updateMeal(mealToEdit, {
        name: mealName,
        category,
        date,
        time,
        notes,
        rating,
        ingredients,
        imageUri,
      })

      await updateMeal(updatedMeal)

      Alert.alert('Succes', 'Maaltijd succesvol bijgewerkt', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ])
    } catch (_error) {
      Alert.alert('Fout', 'Er is een fout opgetreden bij het bijwerken.')
    }
  }

  if (!mealToEdit) {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', marginTop: Spacing.xl}}>Maaltijd niet gevonden</Text>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        {/* Meal Name */}
        <View style={styles.section}>
          <Text style={styles.label}>Maaltijdnaam *</Text>
          <TextInput style={styles.input} placeholder="Bijv. Spaghetti Bolognese" value={mealName} onChangeText={setMealName} />
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.label}>Categorie *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flexDirection: 'row', gap: Spacing.sm}}>
            {Object.values(MealCategory).map(cat => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryButton, category === cat && styles.categoryButtonSelected]}
                onPress={() => setCategory(cat)}>
                <Text style={[styles.categoryButtonText, category === cat && styles.categoryButtonTextSelected]}>
                  {MealService.getCategoryLabel(cat)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Date and Time */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.flex1}>
              <Text style={styles.label}>Datum *</Text>
              <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} />
            </View>
            <View style={styles.flex1}>
              <Text style={styles.label}>Tijd *</Text>
              <TextInput style={styles.input} placeholder="HH:MM" value={time} onChangeText={setTime} />
            </View>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.section}>
          <Text style={styles.label}>Beoordeling *</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setRating(star)} style={styles.starButton}>
                <Text style={{fontSize: 32}}>{star <= rating ? '⭐' : '☆'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.label}>Notities</Text>
          <TextInput
            style={styles.multilineInput}
            placeholder="Optionele opmerkingen..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Photo Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Foto</Text>
          <PhotoPicker onPhotoSelect={setImageUri} currentPhotoUri={imageUri} />
        </View>

        {/* Ingredients Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Ingrediënten *</Text>
          <View style={styles.ingredientRow}>
            <TextInput
              style={styles.ingredientInput}
              placeholder="Ingrediënt naam"
              value={ingredientName}
              onChangeText={setIngredientName}
            />
            <TextInput
              style={styles.calorieInput}
              placeholder="kcal"
              value={ingredientCalories}
              onChangeText={setIngredientCalories}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
            <Ionicons name="add" size={IconSizes.sm} color="white" />
            <Text style={styles.addButtonText}>Ingrediënt toevoegen</Text>
          </TouchableOpacity>

          <IngredientsList 
            ingredients={ingredients} 
            onDeleteIngredient={handleDeleteIngredient}
            onSearchOnline={() => setShowIngredientSearch(true)}
          />
        </View>

        {/* Total Calories */}
        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Totaal calorieën</Text>
          <Text style={styles.totalCalories}>{MealService.formatCalories(totalCalories)}</Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, canSave() && styles.saveButtonActive]}
          onPress={handleUpdateMeal}
          disabled={!canSave()}>
          <Text style={styles.saveButtonText}>Wijzigingen opslaan</Text>
        </TouchableOpacity>
      </ScrollView>

      <IngredientSearch
        visible={showIngredientSearch}
        onClose={() => setShowIngredientSearch(false)}
        onSelectIngredient={handleSelectFromApi}
      />
    </KeyboardAvoidingView>
  )
}

export default EditMeal
