/**
 * NutritionApiService
 * 
 * Service for interacting with Open Food Facts API
 * https://world.openfoodfacts.org/
 * 
 * This is a free, open database of food products from around the world.
 * No API key required.
 */

export interface NutritionProduct {
  code: string
  name: string
  calories: number // kcal per 100g
  brand?: string
  imageUrl?: string
}

interface OpenFoodFactsProduct {
  code: string
  product_name: string
  product_name_en?: string
  brands?: string
  nutriments?: {
    'energy-kcal_100g'?: number
    'energy-kcal'?: number
  }
  image_url?: string
}

interface OpenFoodFactsSearchResponse {
  products: OpenFoodFactsProduct[]
  count: number
  page: number
  page_size: number
}

const API_BASE_URL = 'https://world.openfoodfacts.org'
const SEARCH_ENDPOINT = '/cgi/search.pl'

/**
 * Search for food products by name
 */
export async function searchProducts(query: string): Promise<NutritionProduct[]> {
  if (!query || query.trim().length < 2) {
    return []
  }

  try {
    const searchParams = new URLSearchParams({
      search_terms: query.trim(),
      search_simple: '1',
      action: 'process',
      json: '1',
      page_size: '20',
      fields: 'code,product_name,product_name_en,brands,nutriments,image_url'
    })

    const url = `${API_BASE_URL}${SEARCH_ENDPOINT}?${searchParams.toString()}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'CalorieTrackerApp - Educational Project',
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data: OpenFoodFactsSearchResponse = await response.json()

    // Transform API response to our format
    const products: NutritionProduct[] = data.products
      .filter(product => {
        // Only include products with valid calorie data
        const hasCalories = product.nutriments && 
          (product.nutriments['energy-kcal_100g'] !== undefined || 
           product.nutriments['energy-kcal'] !== undefined)
        const hasName = product.product_name || product.product_name_en
        return hasCalories && hasName
      })
      .map(product => ({
        code: product.code,
        name: product.product_name || product.product_name_en || 'Unknown Product',
        calories: Math.round(
          product.nutriments!['energy-kcal_100g'] || 
          product.nutriments!['energy-kcal'] || 
          0
        ),
        brand: product.brands,
        imageUrl: product.image_url
      }))

    return products
  } catch (error) {
    console.error('Error searching products:', error)
    throw new Error('Failed to search products. Please check your internet connection.')
  }
}

/**
 * Get detailed information about a specific product by barcode
 */
export async function getProductByBarcode(barcode: string): Promise<NutritionProduct | null> {
  try {
    const url = `${API_BASE_URL}/api/v0/product/${barcode}.json`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'CalorieTrackerApp - Educational Project',
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()

    if (data.status !== 1 || !data.product) {
      return null
    }

    const product = data.product as OpenFoodFactsProduct

    // Check if we have calorie data
    const hasCalories = product.nutriments && 
      (product.nutriments['energy-kcal_100g'] !== undefined || 
       product.nutriments['energy-kcal'] !== undefined)

    if (!hasCalories) {
      return null
    }

    return {
      code: product.code,
      name: product.product_name || product.product_name_en || 'Unknown Product',
      calories: Math.round(
        product.nutriments!['energy-kcal_100g'] || 
        product.nutriments!['energy-kcal'] || 
        0
      ),
      brand: product.brands,
      imageUrl: product.image_url
    }
  } catch (error) {
    console.error('Error fetching product by barcode:', error)
    return null
  }
}

/**
 * Calculate calories for a given quantity
 * API returns calories per 100g, this converts to actual quantity
 */
export function calculateCaloriesForQuantity(
  caloriesPer100g: number,
  quantity: number,
  unit: string
): number {
  // For simplicity, assume quantity is always in grams
  // In a production app, you'd handle different units (oz, cups, etc.)
  const multiplier = unit.toLowerCase() === 'g' ? quantity / 100 : quantity / 100
  return Math.round(caloriesPer100g * multiplier)
}

export const NutritionApiService = {
  searchProducts,
  getProductByBarcode,
  calculateCaloriesForQuantity
}

export default NutritionApiService
