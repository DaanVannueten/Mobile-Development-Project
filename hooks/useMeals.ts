import { useCallback, useEffect, useState } from 'react'
import { StorageService } from '../services/StorageService'
import type { Meal } from '../types'

interface UseMealsResult {
  meals: Meal[]
  isLoading: boolean
  error: string | null
  addMeal: (meal: Meal) => Promise<void>
  updateMeal: (meal: Meal) => Promise<void>
  deleteMeal: (mealId: string) => Promise<void>
  refreshMeals: () => Promise<void>
}

export const useMeals = (): UseMealsResult => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadMeals = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const loadedMeals = await StorageService.loadMeals()
      setMeals(loadedMeals)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load meals')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadMeals()
  }, [loadMeals])

  const addMeal = useCallback(async (meal: Meal) => {
    try {
      setError(null)
      const updatedMeals = await StorageService.addMeal(meal)
      setMeals(updatedMeals)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add meal')
      throw err
    }
  }, [])

  const deleteMeal = useCallback(async (mealId: string) => {
    try {
      setError(null)
      const updatedMeals = await StorageService.deleteMeal(mealId)
      setMeals(updatedMeals)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete meal')
      throw err
    }
  }, [])

  const updateMeal = useCallback(async (meal: Meal) => {
    try {
      setError(null)
      const updatedMeals = await StorageService.updateMeal(meal)
      setMeals(updatedMeals)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update meal')
      throw err
    }
  }, [])

  const refreshMeals = useCallback(async () => {
    await loadMeals()
  }, [loadMeals])

  return {
    meals,
    isLoading,
    error,
    addMeal,
    updateMeal,
    deleteMeal,
    refreshMeals,
  }
}
