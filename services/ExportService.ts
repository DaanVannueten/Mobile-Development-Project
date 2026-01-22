import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import type { Meal } from '../types'

export class ExportService {
  /**
   * Export a single meal as JSON and share it
   */
  static async exportMeal(meal: Meal): Promise<void> {
    try {
      // Create a shareable JSON representation
      const mealData = {
        name: meal.name,
        category: meal.category,
        date: meal.date,
        time: meal.time,
        rating: meal.rating,
        notes: meal.notes,
        totalCalories: meal.totalCalories,
        ingredients: meal.ingredients.map(ing => ({
          name: ing.name,
          calories: ing.calories,
          quantity: ing.quantity,
          unit: ing.unit,
        })),
        createdAt: meal.createdAt.toISOString(),
        updatedAt: meal.updatedAt?.toISOString(),
      }

      // Convert to pretty JSON
      const jsonString = JSON.stringify(mealData, null, 2)

      // Create a temporary file
      const fileName = `${meal.name.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.json`
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`

      // Write JSON to file
      await FileSystem.writeAsStringAsync(fileUri, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      })

      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync()
      if (!isAvailable) {
        throw new Error('Delen is niet beschikbaar op dit apparaat')
      }

      // Share the file
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/json',
        dialogTitle: `Deel maaltijd: ${meal.name}`,
        UTI: 'public.json',
      })

      // Cleanup: delete the temporary file after sharing
      await FileSystem.deleteAsync(fileUri, {idempotent: true})
    } catch (error) {
      console.error('Export error:', error)
      throw new Error('Exporteren mislukt: ' + (error instanceof Error ? error.message : 'Onbekende fout'))
    }
  }

  /**
   * Export multiple meals as JSON
   */
  static async exportMeals(meals: Meal[]): Promise<void> {
    try {
      const mealsData = meals.map(meal => ({
        name: meal.name,
        category: meal.category,
        date: meal.date,
        time: meal.time,
        rating: meal.rating,
        notes: meal.notes,
        totalCalories: meal.totalCalories,
        ingredients: meal.ingredients.map(ing => ({
          name: ing.name,
          calories: ing.calories,
          quantity: ing.quantity,
          unit: ing.unit,
        })),
        createdAt: meal.createdAt.toISOString(),
        updatedAt: meal.updatedAt?.toISOString(),
      }))

      const jsonString = JSON.stringify({meals: mealsData, exportDate: new Date().toISOString()}, null, 2)

      const fileName = `calorie_tracker_export_${Date.now()}.json`
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`

      await FileSystem.writeAsStringAsync(fileUri, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      })

      const isAvailable = await Sharing.isAvailableAsync()
      if (!isAvailable) {
        throw new Error('Delen is niet beschikbaar op dit apparaat')
      }

      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/json',
        dialogTitle: `Exporteer ${meals.length} maaltijden`,
        UTI: 'public.json',
      })

      await FileSystem.deleteAsync(fileUri, {idempotent: true})
    } catch (error) {
      console.error('Export error:', error)
      throw new Error('Exporteren mislukt: ' + (error instanceof Error ? error.message : 'Onbekende fout'))
    }
  }

  /**
   * Export meal statistics as a formatted text report
   */
  static async exportStatistics(meals: Meal[]): Promise<void> {
    try {
      const totalMeals = meals.length
      const totalCalories = meals.reduce((sum, meal) => sum + meal.totalCalories, 0)
      const averageCalories = totalMeals > 0 ? Math.round(totalCalories / totalMeals) : 0
      const averageRating = totalMeals > 0 
        ? (meals.reduce((sum, meal) => sum + meal.rating, 0) / totalMeals).toFixed(1)
        : 0

      // Count meals by category
      const categoryCount: Record<string, number> = {}
      meals.forEach(meal => {
        categoryCount[meal.category] = (categoryCount[meal.category] || 0) + 1
      })

      const report = `
📊 CALORIE TRACKER STATISTIEKEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Datum: ${new Date().toLocaleDateString('nl-NL')}

📈 OVERZICHT
• Totaal maaltijden: ${totalMeals}
• Totaal calorieën: ${totalCalories} kcal
• Gemiddeld per maaltijd: ${averageCalories} kcal
• Gemiddelde beoordeling: ${averageRating} ⭐

📁 PER CATEGORIE
${Object.entries(categoryCount)
  .map(([category, count]) => `• ${category}: ${count} maaltijden`)
  .join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gegenereerd door Calorie Tracker
`.trim()

      const fileName = `statistics_${Date.now()}.txt`
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`

      await FileSystem.writeAsStringAsync(fileUri, report, {
        encoding: FileSystem.EncodingType.UTF8,
      })

      const isAvailable = await Sharing.isAvailableAsync()
      if (!isAvailable) {
        throw new Error('Delen is niet beschikbaar op dit apparaat')
      }

      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/plain',
        dialogTitle: 'Deel statistieken',
      })

      await FileSystem.deleteAsync(fileUri, {idempotent: true})
    } catch (error) {
      console.error('Export error:', error)
      throw new Error('Exporteren mislukt: ' + (error instanceof Error ? error.message : 'Onbekende fout'))
    }
  }
}
