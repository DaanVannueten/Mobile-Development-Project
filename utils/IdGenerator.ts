export class IdGenerator {
  private static generateRandomString(): string {
    return Math.random().toString(36).substring(2, 9)
  }

  static generateId(): string {
    return `${Date.now()}-${this.generateRandomString()}`
  }

  static generateIngredientId(): string {
    return this.generateId()
  }

  static generateMealId(): string {
    return this.generateId()
  }
}
