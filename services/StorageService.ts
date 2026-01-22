import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Meal } from '../types'

const STORAGE_KEY = '@calorie_tracker:meals'

export class StorageService {
  static async saveMeals(meals: Meal[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(meals)
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    } catch (error) {
      console.error('Error saving meals:', error)
      throw new Error('Failed to save meals')
    }
  }

  static async loadMeals(): Promise<Meal[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      if (jsonValue === null) {
        return []
      }

      const meals = JSON.parse(jsonValue) as Meal[]
      // Convert createdAt and updatedAt strings back to Date objects
      return meals.map(meal => ({
        ...meal,
        createdAt: new Date(meal.createdAt),
        updatedAt: meal.updatedAt ? new Date(meal.updatedAt) : undefined,
      }))
    } catch (error) {
      console.error('Error loading meals:', error)
      throw new Error('Failed to load meals')
    }
  }

  static async addMeal(meal: Meal): Promise<Meal[]> {
    try {
      const meals = await this.loadMeals()
      const updatedMeals = [meal, ...meals]
      await this.saveMeals(updatedMeals)
      return updatedMeals
    } catch (error) {
      console.error('Error adding meal:', error)
      throw new Error('Failed to add meal')
    }
  }

  static async deleteMeal(mealId: string): Promise<Meal[]> {
    try {
      const meals = await this.loadMeals()
      const updatedMeals = meals.filter(meal => meal.id !== mealId)
      await this.saveMeals(updatedMeals)
      return updatedMeals
    } catch (error) {
      console.error('Error deleting meal:', error)
      throw new Error('Failed to delete meal')
    }
  }

  static async updateMeal(updatedMeal: Meal): Promise<Meal[]> {
    try {
      const meals = await this.loadMeals()
      const updatedMeals = meals.map(meal => (meal.id === updatedMeal.id ? updatedMeal : meal))
      await this.saveMeals(updatedMeals)
      return updatedMeals
    } catch (error) {
      console.error('Error updating meal:', error)
      throw new Error('Failed to update meal')
    }
  }

  static async clearAllMeals(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing meals:', error)
      throw new Error('Failed to clear meals')
    }
  }
}
