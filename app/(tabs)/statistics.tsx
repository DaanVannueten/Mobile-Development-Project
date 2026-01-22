import { Ionicons } from '@expo/vector-icons'
import { type FunctionComponent, useMemo } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { EmptyState } from '../../components/EmptyState'
import { MealCard } from '../../components/MealCard'
import { Colors } from '../../constants/Colors'
import { FontSizes, IconSizes, Spacing } from '../../constants/Layout'
import { Strings } from '../../constants/Strings'
import { useMeals } from '../../hooks/useMeals'
import { ExportService, MealService } from '../../services'

interface StatCardProps {
  icon: string
  label: string
  value: string
  color?: string
}

const StatCard: FunctionComponent<StatCardProps> = ({icon, label, value, color = Colors.primary}) => {
  return (
    <View style={styles.statCard}>
      <View style={[styles.iconContainer, {backgroundColor: color}]}>
        <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={24} color="white" />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </View>
  )
}

const Statistics: FunctionComponent = () => {
  const {meals, isLoading} = useMeals()

  const handleExportAll = async (): Promise<void> => {
    if (meals.length === 0) {
      Alert.alert('Geen data', 'Er zijn geen maaltijden om te exporteren')
      return
    }

    try {
      await ExportService.exportMeals(meals)
    } catch (error) {
      Alert.alert('Fout', error instanceof Error ? error.message : 'Kan maaltijden niet exporteren')
    }
  }

  const handleExportStatistics = async (): Promise<void> => {
    if (meals.length === 0) {
      Alert.alert('Geen data', 'Er zijn geen statistieken om te exporteren')
      return
    }

    try {
      await ExportService.exportStatistics(meals)
    } catch (error) {
      Alert.alert('Fout', error instanceof Error ? error.message : 'Kan statistieken niet exporteren')
    }
  }

  const stats = useMemo(() => {
    if (meals.length === 0) {
      return {
        totalCalories: 0,
        averageCalories: 0,
        topIngredients: [],
      }
    }

    // Calculate total calories
    const total = meals.reduce((sum, meal) => sum + meal.totalCalories, 0)

    // Calculate average calories
    const average = Math.round(total / meals.length)

    // Find most used ingredients
    const ingredientCounts = new Map<string, number>()
    meals.forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        const count = ingredientCounts.get(ingredient.name) || 0
        ingredientCounts.set(ingredient.name, count + 1)
      })
    })

    const sorted = Array.from(ingredientCounts.entries())
      .map(([name, count]) => ({name, count}))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return {
      totalCalories: total,
      averageCalories: average,
      topIngredients: sorted,
    }
  }, [meals])

  const recentMeals = useMemo(() => meals.slice(0, 5), [meals])

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Laden...</Text>
      </View>
    )
  }

  if (meals.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Statistieken</Text>
        <View style={styles.exportButtons}>
          <TouchableOpacity style={styles.exportButton} onPress={handleExportStatistics}>
            <Ionicons name="document-text-outline" size={IconSizes.sm} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButton} onPress={handleExportAll}>
            <Ionicons name="share-outline" size={IconSizes.sm} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard
          icon="restaurant"
          label={Strings.statistics.totalMeals}
          value={meals.length.toString()}
          color={Colors.primary}
        />
        <StatCard
          icon="flame"
          label={Strings.statistics.totalCalories}
          value={MealService.formatCalories(stats.totalCalories)}
          color="#FF6B6B"
        />
        <StatCard
          icon="stats-chart"
          label={Strings.statistics.averageCalories}
          value={MealService.formatCalories(stats.averageCalories)}
          color="#4ECDC4"
        />
      </View>

      {/* Most Used Ingredients */}
      {stats.topIngredients.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{Strings.statistics.mostUsedIngredients}</Text>
          <View style={styles.ingredientsList}>
            {stats.topIngredients.map((ingredient, index) => (
              <View key={ingredient.name} style={styles.ingredientItem}>
                <View style={styles.ingredientRank}>
                  <Text style={styles.rankNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <Text style={styles.ingredientCount}>{ingredient.count}x</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Recent Meals */}
      {recentMeals.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{Strings.statistics.recentMeals}</Text>
          <View style={styles.mealsList}>
            {recentMeals.map(meal => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: Spacing.xxl,
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    marginBottom: Spacing.lg,
    color: Colors.text,
  },
  statsGrid: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 12,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text,
  },
  section: {
    marginBottom: Spacing.xl,
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
  ingredientRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  rankNumber: {
    color: 'white',
    fontWeight: '700',
    fontSize: FontSizes.sm,
  },
  ingredientName: {
    flex: 1,
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.text,
  },
  ingredientCount: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  mealsList: {
    gap: 0,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  exportButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  exportButton: {
    padding: Spacing.sm,
    backgroundColor: Colors.lightBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
})

export default Statistics
