import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { type FunctionComponent, useMemo } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../constants/Colors'
import { FontSizes, IconSizes, Spacing } from '../constants/Layout'
import { useMeals } from '../hooks/useMeals'
import { ExportService, MealService } from '../services'

const MealDetail: FunctionComponent = () => {
  const {id} = useLocalSearchParams<{id: string}>()
  const router = useRouter()
  const {meals, deleteMeal} = useMeals()

  const meal = useMemo(() => {
    if (!id) return null
    return meals.find(m => m.id === id) || null
  }, [id, meals])

  const handleEdit = (): void => {
    // TODO: Implement edit functionality
    router.push(`/edit-meal?id=${meal?.id}`)
  }

  const handleShare = async (): void => {
    if (!meal) return

    try {
      await ExportService.exportMeal(meal)
    } catch (error) {
      Alert.alert('Fout', error instanceof Error ? error.message : 'Kan maaltijd niet delen')
    }
  }

  const handleDelete = (): void => {
    Alert.alert('Maaltijd verwijderen', 'Weet je zeker dat je deze maaltijd wilt verwijderen?', [
      {
        text: 'Annuleren',
        style: 'cancel',
      },
      {
        text: 'Verwijderen',
        style: 'destructive',
        onPress: async () => {
          try {
            if (meal) {
              await deleteMeal(meal.id)
              router.back()
            }
          } catch (_error) {
            Alert.alert('Fout', 'Er is een fout opgetreden bij het verwijderen.')
          }
        },
      },
    ])
  }

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!meal) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Maaltijd niet gevonden</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Photo Section */}
      <View style={styles.photoSection}>
        {meal.imageUri ? (
          <Image source={{uri: meal.imageUri}} style={styles.photo} />
        ) : (
          <View style={styles.noPhoto}>
            <Ionicons name="restaurant-outline" size={IconSizes.xxl} color={Colors.textSecondary} />
            <Text style={styles.noPhotoText}>{Strings.mealDetail.noPhoto}</Text>
          </View>
        )}
      </View>

      {/* Meal Name */}
      <View style={styles.nameSection}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <View style={{flex: 1}}>
            <Text style={styles.mealName}>{meal.name}</Text>
            <Text style={styles.categoryText}>{MealService.getCategoryLabel(meal.category)}</Text>
            <Text style={styles.ratingText}>{MealService.getRatingStars(meal.rating)}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="create-outline" size={IconSizes.md} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.dateText}>
          {MealService.formatDate(meal.date)} om {meal.time}
        </Text>
        {meal.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Notities:</Text>
            <Text style={styles.notesText}>{meal.notes}</Text>
          </View>
        )}
      </View>

      {/* Total Calories Card */}
      <View style={styles.caloriesCard}>
        <View style={styles.caloriesIconContainer}>
          <Ionicons name="flame" size={IconSizes.lg} color="white" />
        </View>
        <View style={styles.caloriesContent}>
          <Text style={styles.caloriesLabel}>{Strings.mealDetail.totalCalories}</Text>
          <Text style={styles.caloriesValue}>{MealService.formatCalories(meal.totalCalories)}</Text>
        </View>
      </View>

      {/* Ingredients Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingrediënten</Text>
        <View style={styles.ingredientsList}>
          {meal.ingredients.map(ingredient => (
            <View key={ingredient.id} style={styles.ingredientItem}>
              <View style={styles.ingredientDot} />
              <View style={styles.ingredientInfo}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <Text style={styles.ingredientCalories}>{MealService.formatCalories(ingredient.calories)}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={IconSizes.md} color="white" />
          <Text style={styles.shareButtonText}>Delen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={IconSizes.md} color="white" />
          <Text style={styles.deleteButtonText}>Verwijderen</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: Spacing.xl,
  },
  errorText: {
    textAlign: 'center',
    marginTop: Spacing.xxl,
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  photoSection: {
    width: '100%',
    height: 250,
    backgroundColor: Colors.inputBackground,
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  noPhoto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noPhotoText: {
    marginTop: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  nameSection: {
    padding: Spacing.lg,
  },
  mealName: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  dateText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  caloriesCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.lightBackground,
    borderRadius: 12,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  caloriesIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  caloriesContent: {
    flex: 1,
  },
  caloriesLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  caloriesValue: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.md,
    color: Colors.text,
  },
  ingredientsList: {
    gap: Spacing.sm,
  },
  ingredientItem: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ingredientDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: Spacing.md,
  },
  ingredientInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingredientName: {
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.text,
  },
  ingredientCalories: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  buttonContainer: {
    marginHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  shareButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  shareButtonText: {
    color: 'white',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  editButton: {
    padding: Spacing.sm,
    backgroundColor: Colors.lightBackground,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    marginTop: Spacing.xs,
  },
  ratingText: {
    fontSize: FontSizes.lg,
    marginTop: Spacing.xs,
  },
  notesContainer: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.lightBackground,
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    marginBottom: Spacing.xs,
    color: Colors.text,
  },
  notesText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
})

export default MealDetail
