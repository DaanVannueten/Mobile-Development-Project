import type { Ingredient, Meal, MealCategory } from '../types'
import { IdGenerator } from '../utils/IdGenerator'

export interface CreateMealInput {
  name: string
  category: MealCategory
  date: string
  time: string
  notes: string
  rating: number
  ingredients: Ingredient[]
  imageUri?: string
}

export interface UpdateMealInput {
  name?: string
  category?: MealCategory
  date?: string
  time?: string
  notes?: string
  rating?: number
  ingredients?: Ingredient[]
  imageUri?: string
}

export class MealService {
  // CREATE
  static createMeal(input: CreateMealInput): Meal {
    const totalCalories = this.calculateTotalCalories(input.ingredients)

    return {
      id: IdGenerator.generateMealId(),
      name: input.name.trim(),
      category: input.category,
      date: input.date,
      time: input.time,
      notes: input.notes.trim(),
      rating: input.rating,
      imageUri: input.imageUri,
      ingredients: input.ingredients,
      totalCalories,
      createdAt: new Date(),
    }
  }

  // READ
  static getMealById(meals: Meal[], id: string): Meal | undefined {
    return meals.find(meal => meal.id === id)
  }

  static getMealsByCategory(meals: Meal[], category: MealCategory): Meal[] {
    return meals.filter(meal => meal.category === category)
  }

  static getMealsByDate(meals: Meal[], date: string): Meal[] {
    return meals.filter(meal => meal.date === date)
  }

  static getMealsByDateRange(meals: Meal[], startDate: string, endDate: string): Meal[] {
    return meals.filter(meal => meal.date >= startDate && meal.date <= endDate)
  }

  // UPDATE
  static updateMeal(meal: Meal, updates: UpdateMealInput): Meal {
    const updatedMeal: Meal = {
      ...meal,
      ...updates,
      updatedAt: new Date(),
    }

    // Recalculate total calories if ingredients were updated
    if (updates.ingredients) {
      updatedMeal.totalCalories = this.calculateTotalCalories(updates.ingredients)
    }

    // Trim string fields if provided
    if (updates.name) {
      updatedMeal.name = updates.name.trim()
    }
    if (updates.notes !== undefined) {
      updatedMeal.notes = updates.notes.trim()
    }

    return updatedMeal
  }

  // DELETE is handled by StorageService.deleteMeal

  // Helper methods
  static calculateTotalCalories(ingredients: {calories: number}[]): number {
    return ingredients.reduce((sum, ingredient) => sum + ingredient.calories, 0)
  }

  static formatCalories(calories: number): string {
    return `${calories} kcal`
  }

  static formatIngredientCount(count: number): string {
    return count === 1 ? '1 ingrediënt' : `${count} ingrediënten`
  }

  static getCategoryLabel(category: MealCategory): string {
    const labels: Record<MealCategory, string> = {
      breakfast: 'Ontbijt',
      lunch: 'Lunch',
      dinner: 'Avondeten',
      snack: 'Snack',
      dessert: 'Dessert',
      drink: 'Drank',
    }
    return labels[category]
  }

  static formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  static formatTime(time: string): string {
    return time
  }

  static getRatingStars(rating: number): string {
    return '⭐'.repeat(Math.max(0, Math.min(5, rating)))
  }
}
