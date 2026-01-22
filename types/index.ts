export interface Ingredient {
  id: string
  name: string
  calories: number
  quantity?: string
  unit?: string
}

export enum MealCategory {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
  Snack = 'snack',
  Dessert = 'dessert',
  Drink = 'drink',
}

export interface Meal {
  id: string
  name: string
  category: MealCategory
  date: string // ISO date string
  time: string // HH:mm format
  notes: string
  rating: number // 1-5 stars
  imageUri?: string
  ingredients: Ingredient[]
  totalCalories: number
  createdAt: Date
  updatedAt?: Date
}
