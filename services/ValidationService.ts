import { MealCategory } from '../types'

export enum ValidationErrorType {
  EmptyMealName = 'EMPTY_MEAL_NAME',
  EmptyIngredientName = 'EMPTY_INGREDIENT_NAME',
  InvalidCalories = 'INVALID_CALORIES',
  NoIngredients = 'NO_INGREDIENTS',
  InvalidCategory = 'INVALID_CATEGORY',
  InvalidDate = 'INVALID_DATE',
  InvalidTime = 'INVALID_TIME',
  InvalidRating = 'INVALID_RATING',
  EmptyQuantity = 'EMPTY_QUANTITY',
}

export interface ValidationResult {
  isValid: boolean
  errorType?: ValidationErrorType
  message?: string
}

export class ValidationService {
  static validateMealName(name: string): ValidationResult {
    if (!name.trim()) {
      return {
        isValid: false,
        errorType: ValidationErrorType.EmptyMealName,
        message: 'Maaltijdnaam mag niet leeg zijn',
      }
    }
    if (name.trim().length < 2) {
      return {
        isValid: false,
        errorType: ValidationErrorType.EmptyMealName,
        message: 'Maaltijdnaam moet minimaal 2 karakters bevatten',
      }
    }
    return {isValid: true}
  }

  static validateIngredientName(name: string): ValidationResult {
    if (!name.trim()) {
      return {
        isValid: false,
        errorType: ValidationErrorType.EmptyIngredientName,
        message: 'Ingrediëntnaam mag niet leeg zijn',
      }
    }
    return {isValid: true}
  }

  static validateCalories(calories: string): ValidationResult {
    if (!calories.trim()) {
      return {
        isValid: false,
        errorType: ValidationErrorType.InvalidCalories,
        message: 'Calorieën mogen niet leeg zijn',
      }
    }
    const calorieValue = Number(calories)
    if (isNaN(calorieValue)) {
      return {
        isValid: false,
        errorType: ValidationErrorType.InvalidCalories,
        message: 'Calorieën moeten een geldig getal zijn',
      }
    }
    if (calorieValue <= 0) {
      return {
        isValid: false,
        errorType: ValidationErrorType.InvalidCalories,
        message: 'Calorieën moeten groter dan 0 zijn',
      }
    }
    if (calorieValue > 10000) {
      return {
        isValid: false,
        errorType: ValidationErrorType.InvalidCalories,
        message: 'Calorieën mogen niet meer dan 10000 zijn',
      }
    }
    return {isValid: true}
  }

  static validateIngredientsList(ingredients: unknown[]): ValidationResult {
    if (ingredients.length === 0) {
      return {
        isValid: false,
        errorType: ValidationErrorType.NoIngredients,
        message: 'Er moet minimaal 1 ingrediënt toegevoegd worden',
      }
    }
    return {isValid: true}
  }

  static validateCategory(category: string): ValidationResult {
    const validCategories = Object.values(MealCategory)
    if (!validCategories.includes(category as MealCategory)) {
      return {
        isValid: false,
        errorType: ValidationErrorType.InvalidCategory,
        message: 'Ongeldige categorie geselecteerd',
      }
    }
    return {isValid: true}
  }

  static validateDate(dateString: string): ValidationResult {
    if (!dateString) {
      return {
        isValid: false,
        errorType: ValidationErrorType.InvalidDate,
        message: 'Datum mag niet leeg zijn',
      }
    }
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return {
        isValid: false,
        errorType: ValidationErrorType.InvalidDate,
        message: 'Ongeldige datum',
      }
    }
    return {isValid: true}
  }

  static validateTime(time: string): ValidationResult {
    if (!time) {
      return {
        isValid: false,
        errorType: ValidationErrorType.InvalidTime,
        message: 'Tijd mag niet leeg zijn',
      }
    }
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!timeRegex.test(time)) {
      return {
        isValid: false,
        errorType: ValidationErrorType.InvalidTime,
        message: 'Ongeldige tijd (gebruik HH:MM formaat)',
      }
    }
    return {isValid: true}
  }

  static validateRating(rating: number): ValidationResult {
    if (rating < 1 || rating > 5) {
      return {
        isValid: false,
        errorType: ValidationErrorType.InvalidRating,
        message: 'Rating moet tussen 1 en 5 sterren zijn',
      }
    }
    return {isValid: true}
  }

  static validateNotes(notes: string): ValidationResult {
    // Notes are optional, so empty is valid
    if (notes.length > 500) {
      return {
        isValid: false,
        errorType: ValidationErrorType.EmptyMealName, // Reuse for now
        message: 'Notities mogen maximaal 500 karakters bevatten',
      }
    }
    return {isValid: true}
  }

  static canSaveMeal(
    mealName: string,
    category: string,
    date: string,
    time: string,
    rating: number,
    ingredients: unknown[],
  ): ValidationResult {
    const nameValidation = this.validateMealName(mealName)
    if (!nameValidation.isValid) return nameValidation

    const categoryValidation = this.validateCategory(category)
    if (!categoryValidation.isValid) return categoryValidation

    const dateValidation = this.validateDate(date)
    if (!dateValidation.isValid) return dateValidation

    const timeValidation = this.validateTime(time)
    if (!timeValidation.isValid) return timeValidation

    const ratingValidation = this.validateRating(rating)
    if (!ratingValidation.isValid) return ratingValidation

    const ingredientsValidation = this.validateIngredientsList(ingredients)
    if (!ingredientsValidation.isValid) return ingredientsValidation

    return {isValid: true}
  }
}
