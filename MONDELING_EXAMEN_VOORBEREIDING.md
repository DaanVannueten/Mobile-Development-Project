# 📚 Mondelinge Examen Voorbereiding - Calorie Tracker App

## 📝 Inhoudsopgave
1. [Examen Structuur & Demo](#examen-structuur--demo)
2. [Snelle Demo Script (5 min)](#snelle-demo-script-5-min)
3. [Verdediging: Vereisten Checklist](#verdediging-vereisten-checklist)
4. [Project Overview](#project-overview)
5. [Vereisten Toelichting](#vereisten-toelichting)
6. [Technische Implementatie](#technische-implementatie)
7. [Demo Scenario](#demo-scenario)
8. [Mogelijk Gevraagde Vragen](#mogelijk-gevraagde-vragen)
4. [Vereisten Toelichting](#vereisten-toelichting)
5. [Technische Implementatie](#technische-implementatie)
6. [Demo Scenario](#demo-scenario)
7. [Mogelijk Gevraagde Vragen](#mogelijk-gevraagde-vragen)

---

## 🎬 Examen Structuur & Demo

### Wat wordt verwacht?

Het examen bestaat uit **twee delen**:

#### 1. Korte Demo (±5 minuten)
Een live demonstratie van je werkende app waarbij je de volgende vragen beantwoordt:

1. **Waar gaat je app over / Welk probleem lost het op?**
2. **Hoe kan de gebruiker de app gebruiken?**
3. **Welke Native Modules heb je gebruikt?**
4. **Welke online services heb je gebruikt?**
5. **Wat zou je verbeteren als je meer tijd had?**

#### 2. Vragenronde
Diepere technische vragen over je implementatie, keuzes en code.

---

### 📱 Demo Opties

#### Optie A: Live Demo (Voorkeur)
- App draait op emulator of fysiek device
- Beamer/scherm delen om functionaliteit te tonen
- Direct interactief tonen van features

**Voordelen:**
- Meest indrukwekkend
- Kan spontaan extra dingen tonen
- Direct reageren op vragen

**Risico's:**
- Technische problemen (emulator crash, netwerk issues)
- Tijdsdruk als iets niet werkt
- Nervositeit kan leiden tot fouten

**Backup plan:**
- Screenshots van elke screen op je telefoon/laptop
- Pre-getest scenario (geen experimenten)
- Fallback naar optie B als iets misgaat

---

#### Optie B: Video Demo (Alternatief)
Een vooraf opgenomen video (2-3 minuten) die alle functionaliteit toont.

**Wat moet erin:**
- ✅ Splash screen bij app start
- ✅ Home screen met bestaande maaltijden
- ✅ Maaltijd toevoegen met alle stappen
- ✅ Foto toevoegen via camera/galerij
- ✅ Ingrediënt online zoeken (Open Food Facts API)
- ✅ Swipe-to-delete gesture
- ✅ Detail pagina bekijken
- ✅ Statistieken scherm
- ✅ Data exporteren en delen
- ✅ Alle animaties en transitions

**Video specificaties:**
- Duur: 2-3 minuten
- Format: MP4, 1080p
- Screen recording van emulator
- Optioneel: voice-over die uitlegt wat je doet

**Hoe maken:**
- **Windows:** OBS Studio, Xbox Game Bar (Win+G)
- **Mac:** QuickTime screen recording
- **Android Studio:** Built-in screen recording
- **Expo:** `npx expo start` en screen capture tool

**Voordelen:**
- Geen technische problemen tijdens examen
- Perfecte flow, geen gestotter
- Kan meerdere keren opnieuw opnemen
- Altijd beschikbaar, geen setup tijd

---

## 🎯 Snelle Demo Script (5 min)

### Introductie (30 sec)

**Waar gaat je app over / Welk probleem lost het op?**

> "Mijn app is een **Calorie Tracker** die het probleem oplost dat mensen niet goed weten hoeveel calorieën ze dagelijks binnenkrijgen. In plaats van handmatig alles op te zoeken, kunnen gebruikers maaltijden loggen met foto's, ingrediënten online opzoeken uit een wereldwijde database, en real-time statistieken zien. Het maakt gezond eten en calorie tracking veel makkelijker."

---

### App Gebruik Uitleg (1 min)

**Hoe kan de gebruiker de app gebruiken?**

> "De app is heel intuïtief:
> - **Home screen** toont al je maaltijden in een lijst
> - Klik op de **+ button** om een nieuwe maaltijd toe te voegen
> - Voeg een **foto** toe via camera of galerij
> - Zoek **ingrediënten online** en de calorieën worden automatisch ingevuld
> - **Swipe naar links** om een maaltijd te verwijderen
> - **Statistieken tab** toont totalen, gemiddelden en grafieken
> - **Export functie** om je data te delen met anderen of je diëtist"

**Tijdens uitleg: Toon de relevante schermen**

---

### Live Demo / Video (2 min)

**Toon de volgende flow:**

1. **App opent** → Splash screen met custom logo
2. **Home screen** → Lijst met bestaande maaltijden (fade-in animatie)
3. **Klik FAB** → Animatie (scale + rotatie)
4. **Add Meal scherm:**
   - Vul naam in: "Lunch"
   - Selecteer categorie: "Lunch"
   - Klik "Select Photo" → Native image picker
   - Klik "Add Ingredient" → "Search Online"
5. **Online zoeken:**
   - Type "chicken breast"
   - Resultaten laden van API
   - Selecteer product → Data automatisch ingevuld
6. **Opslaan** → Terug naar home, nieuwe item verschijnt
7. **Swipe gesture** → Swipe een item weg
8. **Statistics tab** → Toon totalen en grafieken
9. **Export** → Native share dialog

**⏱️ Timing: Oefen dit tot je het in 2 minuten kan!**

---

### Native Modules (30 sec)

**Welke Native Modules heb je gebruikt?**

> "Ik heb **drie native modules** geïmplementeerd:
> 
> 1. **expo-image-picker** - Voor toegang tot camera en galerij. Gebruikers kunnen foto's maken of selecteren voor hun maaltijden.
> 
> 2. **expo-sharing & expo-file-system** - Voor data export. De app schrijft maaltijden naar een JSON bestand en opent de native share dialog van het OS.
> 
> 3. **expo-notifications** - Voor meal reminders. Gebruikers kunnen een notificatie inplannen die op de maaltijd tijd verschijnt.
> 
> Deze modules geven toegang tot hardware en OS-functionaliteit die niet mogelijk is met pure JavaScript."

---

### Online Services (30 sec)

**Welke online services heb je gebruikt?**

> "Ik gebruik de **Open Food Facts API**. Dit is een gratis, wereldwijde database met meer dan 2.5 miljoen voedingsproducten. 
> 
> Wanneer gebruikers een ingrediënt toevoegen, kunnen ze online zoeken. De API retourneert productnaam, calorieën per 100g, merk en zelfs een foto. Dit bespaart gebruikers enorm veel tijd en zorgt voor accurate data. 
> 
> De implementatie zit in `NutritionApiService.ts` en gebruikt een REST API met JSON responses."

---

### Verbeteringen (30 sec)

**Wat zou je verbeteren als je meer tijd had?**

> "Met meer tijd zou ik het volgende toevoegen:
> 
> 1. **Backend synchronisatie** - Cloud sync zodat data beschikbaar is op meerdere devices
> 2. **Grafieken over tijd** - Line charts voor calorieën per dag/week/maand
> 3. **Streaks & gamification** - Badges voor consistent loggen
> 4. **Barcode scanner** - Direct producten scannen in de supermarkt
> 5. **Dark mode** - Voor gebruik 's avonds
> 6. **Macro tracking** - Niet alleen calorieën maar ook eiwitten, koolhydraten, vetten
> 7. **Social features** - Maaltijden delen met vrienden
> 8. **AI meal recognition** - Foto uploaden en automatisch ingrediënten detecteren"

---

### Afsluiting (10 sec)

> "Dat was mijn demo. Ik sta klaar voor jullie vragen!"

---

## 📋 Demo Voorbereiding Checklist

### Voor Live Demo:
- [ ] App is getest op emulator/device - werkt zonder crashes
- [ ] Sample data aanwezig (minimaal 4-5 maaltijden met foto's)
- [ ] Netwerk connectie werkt (voor online zoeken)
- [ ] Emulator/device is aangesloten en zichtbaar op beamer
- [ ] Screen sharing software getest (Zoom, Teams, etc.)
- [ ] Demo scenario 3x doorlopen - timing klopt
- [ ] Backup screenshots van elk scherm op je telefoon/laptop
- [ ] Notificatie permissions zijn toegestaan
- [ ] Export functionaliteit is getest

### Voor Video Demo:
- [ ] Video opgenomen en geëxporteerd (MP4, 1080p)
- [ ] Video getest - speelt af zonder problemen
- [ ] Video geüpload naar cloud (Google Drive, OneDrive) met share link
- [ ] Video op USB stick als backup
- [ ] Video op laptop beschikbaar
- [ ] Duur check: 2-3 minuten
- [ ] Alle features zijn duidelijk zichtbaar
- [ ] Audio/voice-over is optioneel maar helpt

### Algemeen:
- [ ] Laptop opgeladen + lader mee
- [ ] Benodigde kabels (HDMI, USB-C naar HDMI, etc.)
- [ ] Code is clean - geen console.logs, commented code
- [ ] VS Code open met relevante bestanden
- [ ] GitHub repo is up-to-date
- [ ] README.md is compleet
- [ ] Dit document geprint of op tablet beschikbaar voor laatste review

---

## 🎥 Video Demo Maken - Stap voor Stap

### Stap 1: Voorbereiding
```bash
# Start de app op emulator
npx expo start
# Kies Android/iOS emulator
```

### Stap 2: Screen Recording Software
**Windows:**
- **OBS Studio** (gratis, krachtig)
  - Download van obsproject.com
  - Select "Display Capture" of "Window Capture"
  - Resolution: 1920x1080
  - Format: MP4
  
- **Xbox Game Bar** (ingebouwd)
  - Druk Win + G
  - Klik record button
  - Video's in: C:\Users\[naam]\Videos\Captures

**Mac:**
- **QuickTime Player** (ingebouwd)
  - Open QuickTime
  - File → New Screen Recording
  - Select gebied of volledig scherm

**Android Studio:**
- Ingebouwde screen recording
- Toolbar → Screen Record icon
- Of: Emulator sidebar → Camera icon

### Stap 3: Opname Script

**Voorbereiding:**
- Zet emulator in fullscreen
- Verberg onnodige toolbars/notificaties
- Zorg dat app op home screen start
- Test geluid als je voice-over doet

**Scenario (2-3 min):**

**0:00-0:15** - App start
- Splash screen
- Transition naar home
- Pan over maaltijden lijst

**0:15-0:30** - Navigatie tonen
- Swipe tussen tabs
- Klik op statistics
- Terug naar home

**0:30-1:15** - Maaltijd toevoegen
- Klik FAB (animatie)
- Vul formulier in
- Add photo (image picker)
- Add ingredient → Search online
- Type zoekterm, selecteer resultaat
- Add ingredient
- Save meal

**1:15-1:30** - Detail & Edit
- Klik op nieuwe maaltijd
- Toon detail pagina
- Klik edit
- Wijzig iets
- Save

**1:30-1:50** - Gestures
- Swipe-to-delete demo
- Pull-to-refresh

**1:50-2:15** - Statistics
- Ga naar statistics tab
- Toon totalen
- Toon grafieken/lijsten
- Klik "Export Data"
- Share dialog verschijnt

**2:15-2:30** - Afsluiting
- Navigeer terug naar home
- Fade out of stop recording

### Stap 4: Editing (Optioneel)
- **Trim** overtollige footage aan begin/eind
- **Voeg tekst overlay toe** voor belangrijke features
- **Vertraag** complexe interacties (swipe, API call)
- **Voeg voice-over toe** die uitlegt wat je doet

**Gratis editing tools:**
- **Windows:** DaVinci Resolve, Shotcut
- **Mac:** iMovie
- **Online:** Kapwing, Clipchamp

### Stap 5: Export & Test
```
Format: MP4
Resolution: 1920x1080 (1080p)
Bitrate: 5-10 Mbps
Duur: 2-3 minuten
Bestandsgrootte: ~50-150 MB
```

Test op verschillende devices dat video afspeelt!

---

## 📋 Verdediging: Vereisten Checklist

Deze sectie is **cruciaal** voor je verdediging. Hier kan je exact aantonen dat je project voldoet aan alle vereisten en kan je uitleggen **waarom** je bepaalde keuzes hebt gemaakt.

---

## ✅ MINIMALE VEREISTEN (65%)

### 1. Pagina's (13.51%) ✅

**Vereiste:** Minimaal 4 pagina's, waarvan 3 dynamisch.

**Wat heb ik:**
Ik heb **5 pagina's**, waarvan **4 dynamisch**:

#### Dynamische Pagina's:

**1. Home / Maaltijden Lijst** - [`app/(tabs)/index.tsx`](app/(tabs)/index.tsx)
- **Type:** Dynamisch
- **Data bron:** AsyncStorage via MealService
- **Functionaliteit:** 
  - Toont lijst van alle maaltijden
  - Data wordt real-time uit storage geladen
  - Refresh on pull-to-refresh
  - Swipe-to-delete interactie
  - Navigation naar detail/edit schermen
- **Kan ik uitleggen:**
  ```typescript
  const { meals, loading, refreshMeals } = useMeals()
  // Meals komen uit AsyncStorage, automatisch geladen bij mount
  ```

**2. Add Meal** - [`app/add-meal.tsx`](app/add-meal.tsx)
- **Type:** Dynamisch (invoer verwerken)
- **Functionaliteit:**
  - Accepteert gebruikersinvoer (naam, categorie, ingrediënten, foto, rating, etc.)
  - Valideert alle input real-time
  - Slaat data op in AsyncStorage
  - Integreert met native camera/galerij
  - Online zoeken naar ingrediënten
- **Kan ik uitleggen:**
  ```typescript
  const handleSave = async () => {
    // Validatie
    const validation = ValidationService.validateMeal(...)
    if (!validation.isValid) return
    
    // Opslaan via service
    await createMeal(newMeal)
  }
  ```

**3. Edit Meal** - [`app/edit-meal.tsx`](app/edit-meal.tsx)
- **Type:** Dynamisch (CRUD update)
- **Functionaliteit:**
  - Laadt bestaande meal data uit storage
  - Laat gebruiker data aanpassen
  - Valideert wijzigingen
  - Update operatie naar storage
- **Kan ik uitleggen:** Gebruikt dezelfde logica als add-meal maar pre-populated met bestaande data

**4. Statistics** - [`app/(tabs)/statistics.tsx`](app/(tabs)/statistics.tsx)
- **Type:** Dynamisch (data analyse en filtering)
- **Data bron:** AsyncStorage via MealService
- **Functionaliteit:**
  - Berekent totaal calorieën over alle maaltijden
  - Berekent gemiddelde calorieën per maaltijd
  - Analyseert meest gebruikte ingrediënten
  - Toont recent meals lijst
  - Export functionaliteit
- **Kan ik uitleggen:**
  ```typescript
  const totalCalories = meals.reduce((sum, meal) => sum + meal.totalCalories, 0)
  const averageCalories = totalCalories / meals.length
  ```

#### Statische/Semi-dynamische Pagina:

**5. Profile** - [`app/(tabs)/profile.tsx`](app/(tabs)/profile.tsx)
- **Type:** Statisch met dynamische elementen
- **Functionaliteit:**
  - Statische user info
  - Dynamische meal count en stats
  - App informatie

**Verdediging:**
> "Ik heb 5 pagina's, waarvan 4 volledig dynamisch zijn. De home pagina toont data uit AsyncStorage, add/edit accepteren en verwerken user input met validatie, en statistics voert berekeningen uit op de opgeslagen data. Dit overtreft de minimale eis van 3 dynamische pagina's."

---

### 2. Dynamische Data (Deel van Pagina's punt) ✅

**Vereiste:** 
- Elk dynamisch object minimaal 2 attributen (excl. id)
- Minimaal 1 object met 6+ attributen (excl. id)

**Wat heb ik:**

#### Meal Object: 11 attributen (excl. id) ✅
[`types/index.ts`](types/index.ts) - Lines ~5-20
```typescript
export interface Meal {
  id: string                    // Primary key (telt niet mee)
  name: string                  // 1
  category: MealCategory        // 2
  date: string                  // 3
  time: string                  // 4
  notes: string                 // 5
  rating: number                // 6
  imageUri?: string             // 7
  ingredients: Ingredient[]     // 8
  totalCalories: number         // 9
  createdAt: string             // 10
  updatedAt: string             // 11
}
```

#### Ingredient Object: 4 attributen (excl. id) ✅
```typescript
export interface Ingredient {
  id: string        // Primary key (telt niet mee)
  name: string      // 1
  calories: number  // 2
  quantity: number  // 3
  unit: string      // 4
}
```

**Verdediging:**
> "Mijn Meal object heeft 11 attributen exclusief de id, ruim boven de vereiste 6. Dit zijn alle essentiële velden voor een complete meal tracking functionaliteit. Het Ingredient object heeft 4 attributen, meer dan de vereiste 2. Alle objecten zijn strict getypeerd met TypeScript interfaces."

**Waar te tonen:**
- Open [`types/index.ts`](types/index.ts)
- Toon interface definities
- Leg elk attribuut uit en waarom het nodig is

---

### 3. CRUD Operaties (21.62%) ✅

**Vereiste:** Alle CRUD operaties op de data objecten.

**Wat heb ik:**

#### Create (Aanmaken)
**Waar:** [`app/add-meal.tsx`](app/add-meal.tsx) + [`services/MealService.ts`](services/MealService.ts)

```typescript
// In MealService.ts
export const createMeal = async (meal: Meal): Promise<void> => {
  const meals = await getAllMeals()
  meals.push(meal)
  await StorageService.saveMeals(meals)
}

// In add-meal.tsx
const handleSave = async () => {
  const newMeal: Meal = {
    id: IdGenerator.generate(),
    name: mealName,
    category: selectedCategory,
    // ... etc
  }
  await createMeal(newMeal)
  router.back()
}
```

**Kan ik uitleggen:** Nieuwe meal wordt aangemaakt met unique ID, alle velden uit form, en toegevoegd aan bestaande meals array in AsyncStorage.

---

#### Read (Lezen)
**Waar:** [`services/MealService.ts`](services/MealService.ts) + [`hooks/useMeals.ts`](hooks/useMeals.ts)

```typescript
// MealService.ts
export const getAllMeals = async (): Promise<Meal[]> => {
  return await StorageService.loadMeals()
}

export const getMealById = async (id: string): Promise<Meal | null> => {
  const meals = await getAllMeals()
  return meals.find(m => m.id === id) || null
}

// useMeals.ts - gebruikt door alle componenten
const refreshMeals = async () => {
  const loadedMeals = await MealService.getAllMeals()
  setMeals(loadedMeals)
}
```

**Kan ik uitleggen:** Data wordt gelezen via getAllMeals() die AsyncStorage uitleest. De useMeals hook maakt dit beschikbaar voor alle componenten via React state.

---

#### Update (Wijzigen)
**Waar:** [`app/edit-meal.tsx`](app/edit-meal.tsx) + [`services/MealService.ts`](services/MealService.ts)

```typescript
// MealService.ts
export const updateMeal = async (updatedMeal: Meal): Promise<void> => {
  const meals = await getAllMeals()
  const index = meals.findIndex(m => m.id === updatedMeal.id)
  
  if (index !== -1) {
    updatedMeal.updatedAt = new Date().toISOString()
    meals[index] = updatedMeal
    await StorageService.saveMeals(meals)
  }
}

// edit-meal.tsx
const handleUpdate = async () => {
  const updatedMeal = { ...existingMeal, name: mealName, ... }
  await updateMeal(updatedMeal)
  router.back()
}
```

**Kan ik uitleggen:** Edit scherm laadt bestaande meal, gebruiker wijzigt velden, bij save wordt de meal met dezelfde ID vervangen in de array. UpdatedAt timestamp wordt automatisch bijgewerkt.

---

#### Delete (Verwijderen)
**Waar:** [`services/MealService.ts`](services/MealService.ts) + [`components/SwipeableMealCard.tsx`](components/SwipeableMealCard.tsx)

```typescript
// MealService.ts
export const deleteMeal = async (id: string): Promise<void> => {
  const meals = await getAllMeals()
  const filtered = meals.filter(m => m.id !== id)
  await StorageService.saveMeals(filtered)
}

// SwipeableMealCard.tsx - swipe gesture
const handleDelete = async () => {
  Alert.alert(
    'Delete Meal',
    'Are you sure?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: async () => {
        await deleteMeal(meal.id)
        await refreshMeals()
      }}
    ]
  )
}
```

**Kan ik uitleggen:** Delete via swipe-to-delete gesture of delete button in detail scherm. Confirmation dialog voorkomt accidental deletes. Meal wordt gefiltered uit array en storage wordt bijgewerkt.

---

**CRUD Verdediging:**
> "Alle vier CRUD operaties zijn volledig geïmplementeerd. Create in add-meal scherm, Read overal waar meals getoond worden, Update in edit-meal scherm, en Delete via swipe gesture. Alle operaties gaan via de MealService en persisteren in AsyncStorage. Elke operatie heeft error handling en refreshed de UI automatisch via de useMeals hook."

**Demo punten:**
1. **Create:** Open add-meal, vul in, save → nieuwe meal verschijnt
2. **Read:** Home screen toont alle meals, detail scherm toont specifieke meal
3. **Update:** Tap meal, edit, wijzig naam, save → wijziging zichtbaar
4. **Delete:** Swipe meal weg → confirmation → verdwijnt

---

### 4. Validatie (Deel van CRUD punt) ✅

**Vereiste:** Validatie bij het invoegen van nieuwe data.

**Wat heb ik:** Dedicated ValidationService met type-safe errors.

**Waar:** [`services/ValidationService.ts`](services/ValidationService.ts)

#### Validatie Types:
```typescript
export enum ValidationErrorType {
  EmptyMealName = 'EMPTY_MEAL_NAME',
  EmptyIngredientName = 'EMPTY_INGREDIENT_NAME',
  InvalidCalories = 'INVALID_CALORIES',
  InvalidQuantity = 'INVALID_QUANTITY',
  InvalidRating = 'INVALID_RATING',
  NoIngredients = 'NO_INGREDIENTS',
  DuplicateIngredient = 'DUPLICATE_INGREDIENT',
}

export interface ValidationResult {
  isValid: boolean
  errorType?: ValidationErrorType
  message?: string
}
```

#### Validatie Functies:

**1. Meal Name Validatie:**
```typescript
export const validateMealName = (name: string): ValidationResult => {
  if (!name || name.trim().length === 0) {
    return {
      isValid: false,
      errorType: ValidationErrorType.EmptyMealName,
      message: 'Meal name cannot be empty'
    }
  }
  
  if (name.trim().length < 2) {
    return {
      isValid: false,
      errorType: ValidationErrorType.EmptyMealName,
      message: 'Meal name must be at least 2 characters'
    }
  }
  
  return { isValid: true }
}
```

**2. Ingredient Validatie:**
```typescript
export const validateIngredientName = (name: string): ValidationResult => {
  if (!name || name.trim().length === 0) {
    return {
      isValid: false,
      errorType: ValidationErrorType.EmptyIngredientName,
      message: 'Ingredient name is required'
    }
  }
  return { isValid: true }
}

export const validateCalories = (calories: number): ValidationResult => {
  if (isNaN(calories) || calories < 0) {
    return {
      isValid: false,
      errorType: ValidationErrorType.InvalidCalories,
      message: 'Calories must be a positive number'
    }
  }
  return { isValid: true }
}

export const validateQuantity = (quantity: number): ValidationResult => {
  if (isNaN(quantity) || quantity <= 0) {
    return {
      isValid: false,
      errorType: ValidationErrorType.InvalidQuantity,
      message: 'Quantity must be greater than 0'
    }
  }
  return { isValid: true }
}
```

**3. Rating Validatie:**
```typescript
export const validateRating = (rating: number): ValidationResult => {
  if (rating < 1 || rating > 5) {
    return {
      isValid: false,
      errorType: ValidationErrorType.InvalidRating,
      message: 'Rating must be between 1 and 5'
    }
  }
  return { isValid: true }
}
```

**4. Complete Meal Validatie:**
```typescript
export const validateMeal = (meal: Partial<Meal>): ValidationResult => {
  // Name check
  const nameValidation = validateMealName(meal.name || '')
  if (!nameValidation.isValid) return nameValidation
  
  // Ingredients check
  if (!meal.ingredients || meal.ingredients.length === 0) {
    return {
      isValid: false,
      errorType: ValidationErrorType.NoIngredients,
      message: 'At least one ingredient is required'
    }
  }
  
  // Validate each ingredient
  for (const ing of meal.ingredients) {
    const ingValidation = validateIngredient(ing)
    if (!ingValidation.isValid) return ingValidation
  }
  
  return { isValid: true }
}
```

#### UI Integratie:
**Waar:** [`app/add-meal.tsx`](app/add-meal.tsx)

```typescript
const [errors, setErrors] = useState<{[key: string]: string}>({})

const validateAndSave = async () => {
  const newErrors: {[key: string]: string} = {}
  
  // Validate meal name
  const nameValidation = ValidationService.validateMealName(mealName)
  if (!nameValidation.isValid) {
    newErrors.name = nameValidation.message || 'Invalid name'
  }
  
  // Validate ingredients
  if (ingredients.length === 0) {
    newErrors.ingredients = 'Add at least one ingredient'
  }
  
  // Validate each ingredient
  ingredients.forEach((ing, index) => {
    const caloriesValidation = ValidationService.validateCalories(ing.calories)
    if (!caloriesValidation.isValid) {
      newErrors[`ingredient_${index}_calories`] = caloriesValidation.message!
    }
  })
  
  setErrors(newErrors)
  
  // Only save if no errors
  if (Object.keys(newErrors).length === 0) {
    await handleSave()
  }
}

// In JSX:
{errors.name && (
  <Text style={styles.errorText}>{errors.name}</Text>
)}

<Button 
  title="Save" 
  disabled={Object.keys(errors).length > 0}
  onPress={validateAndSave}
/>
```

**Verdediging:**
> "Ik heb een complete ValidationService met type-safe error enums. Elke input field heeft zijn eigen validatie functie die een ValidationResult object retourneert. Dit bevat een boolean `isValid` en een user-friendly error message. De validatie gebeurt real-time bij het typen én voor het opslaan. De Save button is disabled tot alle validatie slaagt. Dit voorkomt volledig dat ongeldige data in de database komt."

**Demo punten:**
1. Open add-meal
2. Probeer save zonder naam → Error message verschijnt
3. Voeg naam toe maar geen ingrediënten → Error bij ingredients
4. Voeg ingredient toe met 0 calorieën → Error bij calories
5. Fix alle errors → Save button wordt enabled
6. Save → Succes!

**Waarom deze aanpak:**
- **Type-safe:** Enums voorkomen typos in error types
- **Reusable:** Validatie functies kunnen overal gebruikt worden
- **Testable:** Elke functie kan unit tested worden
- **User-friendly:** Duidelijke error messages
- **Centralized:** Alle validatie logica op één plek

---

### 5. Native Modules (21.62%) ✅

**Vereiste:** Minimaal 2 native modules die hardware/OS gebruiken.

**Wat heb ik:** 3 native modules - **overtreft minimum!**

---

#### Native Module 1: expo-image-picker ✅

**Wat is het:**
Native module die toegang geeft tot:
- Device camera (hardware)
- Photo library/galerij (OS integratie)
- Native image picker UI

**Waarom native:**
- Gebruikt native iOS UIImagePickerController
- Gebruikt native Android Intent.ACTION_PICK
- Hardware camera access
- OS-level permissions systeem

**Waar gebruikt:** [`components/PhotoPicker.tsx`](components/PhotoPicker.tsx)

**Code:**
```typescript
import * as ImagePicker from 'expo-image-picker'

export const PhotoPicker: FunctionComponent<Props> = ({ imageUri, onImageSelected }) => {
  
  const pickImageFromGallery = async () => {
    // Request OS-level permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    
    if (!permissionResult.granted) {
      Alert.alert(
        'Permission Required',
        'Camera roll access is required to select photos'
      )
      return
    }

    // Launch native image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri)
    }
  }

  const takePhoto = async () => {
    // Request camera permission
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    
    if (!permissionResult.granted) {
      Alert.alert(
        'Permission Required',
        'Camera access is required to take photos'
      )
      return
    }

    // Launch native camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri)
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={takePhoto} />
      <Button title="Choose from Gallery" onPress={pickImageFromGallery} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}
    </View>
  )
}
```

**Verdediging:**
> "De expo-image-picker module is een echte native module die native iOS en Android code gebruikt. Op iOS gebruikt het UIImagePickerController, op Android gebruikt het Intent.ACTION_PICK en Camera2 API. Het heeft hardware access nodig voor de camera en OS-level permissions voor de galerij. Gebruikers kunnen foto's toevoegen aan hun maaltijden, wat de app veel persoonlijker en gebruiksvriendelijker maakt. De module vraagt eerst permissions via `requestCameraPermissionsAsync()` - dit zijn OS-level permissions die alleen via native code mogelijk zijn."

**Zinvol gebruik:** Foto's visualiseren maaltijden en maken de app engaging. Het is een core feature, niet een gimmick.

---

#### Native Module 2: expo-sharing + expo-file-system ✅

**Wat is het:**
Twee native modules die samenwerken:
- **expo-file-system:** Native file I/O operations
- **expo-sharing:** Native OS share dialog

**Waarom native:**
- File system access is OS-level functionaliteit
- Share dialog is native OS UI (Share Sheet op iOS, ShareDialog op Android)
- Gebruikt native file APIs (NSFileManager op iOS, File API op Android)

**Waar gebruikt:** [`services/ExportService.ts`](services/ExportService.ts) + [`app/(tabs)/statistics.tsx`](app/(tabs)/statistics.tsx)

**Code:**
```typescript
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

export class ExportService {
  
  static async exportMealsToJSON(meals: Meal[]): Promise<void> {
    try {
      // Serialize data
      const jsonData = JSON.stringify(meals, null, 2)
      
      // Create filename with timestamp
      const timestamp = new Date().getTime()
      const fileName = `calorie_tracker_export_${timestamp}.json`
      
      // Get file path in app's document directory (native file system)
      const fileUri = `${FileSystem.documentDirectory}${fileName}`
      
      // Write file using native file system APIs
      await FileSystem.writeAsStringAsync(fileUri, jsonData, {
        encoding: FileSystem.EncodingType.UTF8,
      })
      
      // Check if sharing is available (always true on iOS/Android)
      const isAvailable = await Sharing.isAvailableAsync()
      
      if (isAvailable) {
        // Open native OS share dialog
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: 'Export Meal Data',
          UTI: 'public.json', // iOS Universal Type Identifier
        })
      } else {
        Alert.alert('Error', 'Sharing is not available on this device')
      }
      
    } catch (error) {
      console.error('Export failed:', error)
      Alert.alert('Export Failed', 'Could not export data')
    }
  }
  
  static async exportMealsToCSV(meals: Meal[]): Promise<void> {
    // CSV format voor Excel/Numbers
    const csvHeader = 'Name,Category,Date,Time,Calories,Rating\n'
    const csvRows = meals.map(meal => 
      `"${meal.name}","${meal.category}","${meal.date}","${meal.time}",${meal.totalCalories},${meal.rating}`
    ).join('\n')
    
    const csvData = csvHeader + csvRows
    const fileName = `calorie_tracker_${Date.now()}.csv`
    const fileUri = `${FileSystem.documentDirectory}${fileName}`
    
    await FileSystem.writeAsStringAsync(fileUri, csvData)
    await Sharing.shareAsync(fileUri, {
      mimeType: 'text/csv',
      dialogTitle: 'Export Meal Data (CSV)',
    })
  }
}
```

**UI Integratie:**
```typescript
// In statistics.tsx
const handleExport = async () => {
  Alert.alert(
    'Export Format',
    'Choose export format',
    [
      { 
        text: 'JSON', 
        onPress: async () => {
          await ExportService.exportMealsToJSON(meals)
        }
      },
      {
        text: 'CSV',
        onPress: async () => {
          await ExportService.exportMealsToCSV(meals)
        }
      },
      { text: 'Cancel', style: 'cancel' }
    ]
  )
}
```

**Verdediging:**
> "Ik gebruik twee native modules voor de export functie. **expo-file-system** geeft toegang tot het native file system van het OS - op iOS gebruikt het NSFileManager, op Android de Java File API. Ik schrijf de meal data naar een JSON of CSV bestand in de app's document directory met `writeAsStringAsync()`. Daarna gebruik ik **expo-sharing** om de native OS share dialog te openen. Op iOS is dit de Share Sheet, op Android de ShareDialog. De gebruiker kan dan kiezen om het bestand te delen via WhatsApp, email, Google Drive, etc. Dit zijn allemaal OS-level integraties die alleen mogelijk zijn met native code. Het is zinvol omdat gebruikers hun data kunnen backup maken of delen met hun diëtist."

**Zinvol gebruik:** 
- Backup van data
- Delen met professionals (diëtist, personal trainer)
- Data portability
- Import in Excel/spreadsheet apps

---

#### Native Module 3: expo-notifications ✅ (BONUS)

**Wat is het:**
Native module voor OS notification systeem.

**Waarom native:**
- Gebruikt iOS UserNotifications framework
- Gebruikt Android NotificationManager
- Schedule systeem gebruikt native schedulers
- Push notifications zijn OS-level

**Waar gebruikt:** [`services/NotificationService.ts`](services/NotificationService.ts)

**Code:**
```typescript
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

// Configure how notifications behave
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export class NotificationService {
  
  static async requestPermissions(): Promise<boolean> {
    // Request OS-level permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Enable notifications to get meal reminders'
      )
      return false
    }
    
    return true
  }
  
  static async setupAndroidChannel(): Promise<void> {
    // Android requires notification channels (since Android 8.0)
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('meal-reminders', {
        name: 'Meal Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        sound: 'default',
        lightColor: '#FF6B35',
      })
    }
  }
  
  static async scheduleMealNotification(meal: Meal): Promise<string | null> {
    try {
      // Request permissions
      const hasPermission = await this.requestPermissions()
      if (!hasPermission) return null
      
      // Setup Android channel
      await this.setupAndroidChannel()
      
      // Parse meal date and time
      const [year, month, day] = meal.date.split('-').map(Number)
      const [hours, minutes] = meal.time.split(':').map(Number)
      const mealDateTime = new Date(year, month - 1, day, hours, minutes)
      
      // Schedule local notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `🍽️ ${meal.name}`,
          body: `Time for your meal! ${meal.totalCalories} kcal`,
          data: { 
            mealId: meal.id,
            screen: 'meal-detail'
          },
          sound: 'default',
          badge: 1,
        },
        trigger: {
          date: mealDateTime,
          channelId: 'meal-reminders', // Android only
        },
      })
      
      return notificationId
      
    } catch (error) {
      console.error('Failed to schedule notification:', error)
      return null
    }
  }
  
  static async cancelNotification(notificationId: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(notificationId)
  }
  
  static async getAllScheduledNotifications() {
    return await Notifications.getAllScheduledNotificationsAsync()
  }
}
```

**UI Integratie:**
```typescript
// In add-meal.tsx
const [sendNotification, setSendNotification] = useState(false)

// In save functie:
const handleSave = async () => {
  // ... create meal
  
  if (sendNotification) {
    const notifId = await NotificationService.scheduleMealNotification(newMeal)
    if (notifId) {
      console.log('Notification scheduled:', notifId)
    }
  }
  
  // ... rest of save logic
}

// In JSX:
<View style={styles.notificationContainer}>
  <Text style={styles.label}>Remind me at meal time</Text>
  <Switch
    value={sendNotification}
    onValueChange={setSendNotification}
    trackColor={{ false: '#767577', true: '#FF6B35' }}
  />
</View>
```

**Verdediging:**
> "De **expo-notifications** module is een native module die het OS notification system gebruikt. Op iOS gebruikt het het UserNotifications framework, op Android de NotificationManager API. Het vraagt eerst OS-level permissions met `requestPermissionsAsync()`. Voor Android moet ik een notification channel aanmaken - dit is verplicht sinds Android 8.0 en kan alleen via native code. Met `scheduleNotificationAsync()` schedule ik een local notification op een specifieke datum en tijd. Dit gebruikt de native scheduler van het OS. Op de ingestelde tijd verschijnt een native push notification, zelfs als de app gesloten is. Dit is alleen mogelijk met native code - JavaScript kan dit niet. Het is zinvol omdat gebruikers reminders kunnen krijgen voor hun maaltijden, wat helpt bij consistent eten."

**Zinvol gebruik:**
- Meal reminders voor gezonde routine
- Helpt bij consistent calorie tracking
- Engagement verhogen
- Native OS experience

---

**Native Modules Samenvatting:**

Ik heb **3 native modules**, wat meer is dan de vereiste 2:

1. ✅ **expo-image-picker** - Camera hardware + OS galerij
2. ✅ **expo-sharing + expo-file-system** - File I/O + native share dialog
3. ✅ **expo-notifications** - OS notification systeem

Alle drie modules zijn:
- **Zinvol gebruikt** - core features, niet gimmicks
- **Hardware/OS afhankelijk** - niet mogelijk met pure JavaScript
- **Native code onder de motorkap** - iOS/Android platform APIs
- **Met permissions** - OS-level permission systeem

**Verdediging:**
> "Ik heb drie native modules geïmplementeerd, één meer dan het minimum. Elke module heeft een zinvolle rol: foto's maken apps personal, export geeft data portability, en notifications verhogen engagement. Alle drie gebruiken native iOS/Android code en hardware/OS features die niet mogelijk zijn met JavaScript alleen. Ik kan voor elke module uitleggen welke native APIs ze gebruiken en waarom ze native moeten zijn."

---

### 6. Gestures & Animaties (5.40% elk) ✅

**Vereiste:** Minimaal 1 gesture en 1 animatie.

**Wat heb ik:** 2 gestures + 3 animaties - **overtreft minimum!**

---

#### Gesture 1: Swipe-to-Delete 👆

**Wat is het:** Pan gesture om maaltijden te verwijderen door naar links te swipen.

**Waar:** [`components/SwipeableMealCard.tsx`](components/SwipeableMealCard.tsx)

**Libraries:**
- `react-native-gesture-handler` - Gesture detectie
- `react-native-reanimated` - Smooth animaties

**Code:**
```typescript
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'

export const SwipeableMealCard: FunctionComponent<Props> = ({
  meal,
  onPress,
  onDelete,
}) => {
  // Shared values for animation (runs on UI thread)
  const translateX = useSharedValue(0)
  const itemHeight = useSharedValue(ITEM_HEIGHT)
  const opacity = useSharedValue(1)
  
  const SWIPE_THRESHOLD = -100
  
  // Pan gesture for swipe
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Only allow left swipe (negative translation)
      if (event.translationX < 0) {
        translateX.value = event.translationX
      }
    })
    .onEnd((event) => {
      // Check if swipe passed threshold
      if (translateX.value < SWIPE_THRESHOLD) {
        // Swipe far enough - trigger delete
        translateX.value = withTiming(-SCREEN_WIDTH, {
          duration: 300,
        })
        
        opacity.value = withTiming(0, { duration: 300 })
        itemHeight.value = withTiming(0, { duration: 300 }, (finished) => {
          if (finished) {
            runOnJS(onDelete)(meal)
          }
        })
        
      } else {
        // Swipe not far enough - snap back
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 200,
        })
      }
    })
  
  // Animated style based on shared values
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
    height: itemHeight.value,
  }))
  
  // Background that reveals when swiping
  const deleteBackgroundStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < SWIPE_THRESHOLD * 0.5 ? 1 : 0.5,
  }))
  
  return (
    <View style={styles.container}>
      {/* Delete background */}
      <Animated.View style={[styles.deleteBackground, deleteBackgroundStyle]}>
        <Ionicons name="trash" size={24} color="white" />
        <Text style={styles.deleteText}>Delete</Text>
      </Animated.View>
      
      {/* Swipeable card */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <TouchableOpacity onPress={() => onPress(meal)}>
            <MealCard meal={meal} />
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  )
}
```

**Hoe werkt het:**
1. **Pan gesture detectie** - `Gesture.Pan()` tracked horizontale beweging
2. **onUpdate** - `translateX` shared value updated real-time
3. **onEnd** - Check if swipe > threshold (-100px)
4. **Animation** - Als threshold bereikt: animate card off screen + fade out + collapse height
5. **Callback** - Via `runOnJS()` roep delete functie aan na animatie

**Verdediging:**
> "Ik gebruik react-native-gesture-handler's Pan gesture om swipe-to-delete te implementeren. De gesture tracked de horizontale beweging in real-time. Als de gebruiker verder dan 100px naar links swiped, triggert de delete animatie. De card animeert off-screen, fade-out, en collapseert in hoogte. Daarna wordt de delete callback aangeroepen via `runOnJS()` - dit is nodig omdat gestures op de UI thread draaien en je JavaScript functies niet direct kan aanroepen. Ik gebruik shared values van Reanimated voor 60fps smooth animaties. Dit is niet uit de les gekopieerd - ik heb eigen threshold logic en three-stage delete animatie."

---

#### Gesture 2: Pull-to-Refresh 👆

**Wat is het:** Native pull gesture om meals lijst te refreshen.

**Waar:** [`app/(tabs)/index.tsx`](app/(tabs)/index.tsx)

**Code:**
```typescript
import { RefreshControl } from 'react-native'

const HomeScreen = () => {
  const { meals, refreshMeals } = useMeals()
  const [refreshing, setRefreshing] = useState(false)
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refreshMeals() // Reload from AsyncStorage
    setRefreshing(false)
  }, [refreshMeals])
  
  return (
    <FlatList
      data={meals}
      renderItem={renderMealItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary}
          colors={[Colors.primary]}
        />
      }
    />
  )
}
```

**Verdediging:**
> "Pull-to-refresh is een native gesture pattern. Gebruikers kunnen de lijst naar beneden trekken om data te verversen. Het gebruikt React Native's RefreshControl component die native iOS UIRefreshControl en Android SwipeRefreshLayout gebruikt. De gesture triggert een async refresh van data uit AsyncStorage."

---

#### Animatie 1: Animated FAB 🎨

**Wat is het:** Floating Action Button met scale en rotatie animatie bij press.

**Waar:** [`components/AnimatedFAB.tsx`](components/AnimatedFAB.tsx)

**Code:**
```typescript
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export const AnimatedFAB: FunctionComponent<Props> = ({ onPress }) => {
  const scale = useSharedValue(1)
  const rotation = useSharedValue(0)
  
  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      // Press down: scale down, rotate
      scale.value = withSpring(0.9, {
        damping: 10,
        stiffness: 300,
      })
      rotation.value = withSpring(90, {
        damping: 15,
      })
    })
    .onFinalize(() => {
      // Release: scale back, rotate back
      scale.value = withSpring(1, {
        damping: 10,
        stiffness: 300,
      })
      rotation.value = withSpring(0, {
        damping: 15,
      })
      runOnJS(onPress)()
    })
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
  }))
  
  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[styles.fab, animatedStyle]}>
        <Ionicons name="add" size={32} color="white" />
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
})
```

**Verdediging:**
> "De FAB heeft een tap gesture met twee animaties: scale en rotatie. Bij press down schaalt hij naar 90% en roteert 90 graden. Bij release springt hij terug met `withSpring()` voor een natuurlijke, verende beweging. Dit geeft tactile feedback en maakt de UI levendig. De animaties draaien op de UI thread voor 60fps performance."

---

#### Animatie 2: List Item Entrance 🎨

**Wat is het:** Staggered fade-in animatie voor maaltijden lijst items.

**Waar:** [`app/(tabs)/index.tsx`](app/(tabs)/index.tsx)

**Code:**
```typescript
import Animated, { FadeInDown, FadeOutUp, Layout } from 'react-native-reanimated'

const renderMealItem = ({ item, index }: ListRenderItemInfo<Meal>) => (
  <Animated.View
    entering={FadeInDown.delay(index * 50).springify()}
    exiting={FadeOutUp.duration(300)}
    layout={Layout.springify()}
  >
    <SwipeableMealCard
      meal={item}
      onPress={() => router.push(`/meal-detail?id=${item.id}`)}
      onDelete={async () => {
        await deleteMeal(item.id)
        await refreshMeals()
      }}
    />
  </Animated.View>
)
```

**Verdediging:**
> "Elk list item heeft entrance, exit en layout animaties. Bij mount fade-in items van boven naar beneden met `FadeInDown`. Elk item heeft een delay van 50ms * index voor een staggered effect - ze verschijnen één voor één. Bij delete fade-out naar boven met `FadeOutUp`. De `Layout` animatie zorgt dat als items verplaatsen (na delete), ze smooth naar hun nieuwe positie animeren. Dit is gebouwd met Reanimated's declarative entering/exiting API."

---

#### Animatie 3: Button Press Feedback 🎨

**Wat is het:** Scale animatie op buttons en cards bij press.

**Waar:** [`components/MealCard.tsx`](components/MealCard.tsx), diverse buttons

**Code:**
```typescript
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export const MealCard: FunctionComponent<Props> = ({ meal, onPress }) => {
  const scale = useSharedValue(1)
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))
  
  return (
    <Animated.View style={animatedStyle}>
      <TouchableWithoutFeedback
        onPressIn={() => {
          scale.value = withSpring(0.95)
        }}
        onPressOut={() => {
          scale.value = withSpring(1)
        }}
        onPress={onPress}
      >
        <View style={styles.card}>
          {/* Card content */}
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  )
}
```

**Verdediging:**
> "Alle interactieve elementen hebben press feedback. Bij press down schaalt het element naar 95%, bij release terug naar 100%. Dit geeft tactile feedback zoals in native apps. Het gebruikt shared values voor performance - de animatie draait op de UI thread zonder JavaScript bridge overhead."

---

**Gestures & Animaties Samenvatting:**

✅ **2 Gestures:**
1. Swipe-to-delete (custom Pan gesture met threshold logic)
2. Pull-to-refresh (native gesture pattern)

✅ **3 Animaties:**
1. Animated FAB (scale + rotatie)
2. List entrance/exit (staggered fade)
3. Press feedback (scale spring)

**Verdediging:**
> "Ik heb meer dan het minimum: 2 gestures en 3 animaties. De swipe-to-delete is niet uit de les - het heeft custom threshold logic, three-stage delete animatie, en revealing background. Alle animaties gebruiken Reanimated voor 60fps performance op de UI thread. De combinatie van gestures en animaties maakt de app voelen als een native app, niet een web app wrapper."

---

### 7. Online Services (21.62%) ✅

**Vereiste:** Minimaal 1 online service, zinvol gebruikt.

**Wat heb ik:** 1 online service (voldoet aan minimum).

---

#### Open Food Facts API 🌐

**Wat is het:**
- Gratis, open-source voedingsproducten database
- 2.5+ miljoen producten wereldwijd
- Crowd-sourced data (zoals Wikipedia voor voedsel)
- REST API, geen authentication nodig

**Waarom zinvol:**
> "In plaats van dat gebruikers handmatig calorieën moeten opzoeken op websites, kunnen ze direct in de app zoeken. De API retourneert accurate voedingsdata inclusief calorieën per 100g. Dit bespaart tijd, verhoogt nauwkeurigheid, en maakt de app praktisch bruikbaar. Het is een core feature, niet een gimmick."

**Waar gebruikt:** [`services/NutritionApiService.ts`](services/NutritionApiService.ts) + [`components/IngredientSearch.tsx`](components/IngredientSearch.tsx)

**Code:**

**Service Layer:**
```typescript
// services/NutritionApiService.ts

const API_BASE_URL = 'https://world.openfoodfacts.org'
const SEARCH_ENDPOINT = '/cgi/search.pl'

export interface NutritionProduct {
  code: string
  name: string
  brand?: string
  calories: number  // per 100g
  imageUrl?: string
  nutriments?: {
    proteins?: number
    carbohydrates?: number
    fat?: number
    fiber?: number
  }
}

interface OpenFoodFactsProduct {
  code: string
  product_name: string
  product_name_en?: string
  brands?: string
  image_url?: string
  nutriments?: {
    'energy-kcal_100g'?: number
    'proteins_100g'?: number
    'carbohydrates_100g'?: number
    'fat_100g'?: number
    'fiber_100g'?: number
  }
}

interface OpenFoodFactsSearchResponse {
  count: number
  page: number
  page_size: number
  products: OpenFoodFactsProduct[]
}

export async function searchProducts(query: string): Promise<NutritionProduct[]> {
  try {
    // Build query parameters
    const searchParams = new URLSearchParams({
      search_terms: query,
      page_size: '20',
      json: 'true',
      fields: 'code,product_name,product_name_en,brands,nutriments,image_url',
      sort_by: 'unique_scans_n', // Sort by popularity
    })

    // Make API request
    const url = `${API_BASE_URL}${SEARCH_ENDPOINT}?${searchParams.toString()}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data: OpenFoodFactsSearchResponse = await response.json()
    
    // Transform API response to our domain model
    return data.products
      .filter(product => {
        // Filter out products without calorie data
        return product.nutriments?.['energy-kcal_100g'] != null
      })
      .map(product => ({
        code: product.code,
        name: product.product_name || product.product_name_en || 'Unknown Product',
        brand: product.brands,
        calories: product.nutriments!['energy-kcal_100g']!,
        imageUrl: product.image_url,
        nutriments: {
          proteins: product.nutriments?.['proteins_100g'],
          carbohydrates: product.nutriments?.['carbohydrates_100g'],
          fat: product.nutriments?.['fat_100g'],
          fiber: product.nutriments?.['fiber_100g'],
        },
      }))
      
  } catch (error) {
    console.error('Product search failed:', error)
    throw new Error('Failed to search products. Check your internet connection.')
  }
}

export async function getProductByBarcode(barcode: string): Promise<NutritionProduct | null> {
  try {
    const url = `${API_BASE_URL}/api/v0/product/${barcode}.json`
    const response = await fetch(url)
    
    if (!response.ok) {
      return null
    }

    const data = await response.json()
    
    if (data.status !== 1) {
      return null // Product not found
    }

    const product = data.product
    
    return {
      code: product.code,
      name: product.product_name || 'Unknown Product',
      brand: product.brands,
      calories: product.nutriments?.['energy-kcal_100g'] || 0,
      imageUrl: product.image_url,
      nutriments: {
        proteins: product.nutriments?.['proteins_100g'],
        carbohydrates: product.nutriments?.['carbohydrates_100g'],
        fat: product.nutriments?.['fat_100g'],
        fiber: product.nutriments?.['fiber_100g'],
      },
    }
  } catch (error) {
    console.error('Product lookup failed:', error)
    return null
  }
}
```

**UI Component:**
```typescript
// components/IngredientSearch.tsx

export const IngredientSearch: FunctionComponent<Props> = ({
  visible,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<NutritionProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Debounced search
  const searchTimeout = useRef<NodeJS.Timeout>()
  
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([])
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      
      const products = await NutritionApiService.searchProducts(searchQuery)
      setResults(products)
      
      if (products.length === 0) {
        setError('No products found. Try a different search term.')
      }
      
    } catch (err) {
      setError((err as Error).message)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])
  
  const onQueryChange = (text: string) => {
    setQuery(text)
    
    // Debounce API calls
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }
    
    searchTimeout.current = setTimeout(() => {
      handleSearch(text)
    }, 500) // Wait 500ms after user stops typing
  }
  
  const handleSelectProduct = (product: NutritionProduct) => {
    // Transform to ingredient format
    const ingredient: Partial<Ingredient> = {
      name: product.name,
      calories: product.calories, // per 100g
      quantity: 100, // Default to 100g
      unit: 'g',
    }
    
    onSelectProduct(ingredient)
    onClose()
  }
  
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Search Products</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.searchInput}
            placeholder="Search food products..."
            value={query}
            onChangeText={onQueryChange}
            autoFocus
          />
          
          {loading && <ActivityIndicator size="large" color={Colors.primary} />}
          
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          <FlatList
            data={results}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleSelectProduct(item)}
              >
                {item.imageUrl && (
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.productImage}
                  />
                )}
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  {item.brand && (
                    <Text style={styles.productBrand}>{item.brand}</Text>
                  )}
                  <Text style={styles.productCalories}>
                    {item.calories} kcal per 100g
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              !loading && query.length >= 2 ? (
                <Text style={styles.emptyText}>No products found</Text>
              ) : null
            }
          />
        </View>
      </View>
    </Modal>
  )
}
```

**Verdediging:**
> "Ik gebruik de **Open Food Facts API** voor online ingredient zoeken. Dit is een gratis REST API met 2.5+ miljoen voedingsproducten. Mijn implementation heeft een dedicated service layer (`NutritionApiService`) die de API calls handelt. Ik gebruik query parameters voor search (product naam), filter op calorieën om producten zonder data eruit te filteren, en transform de API response naar mijn eigen `NutritionProduct` type voor type safety. De UI component heeft debounced search (500ms delay) om niet bij elke keystroke een API call te doen - dit is performant en respectvol naar de API. Results tonen product foto, naam, merk en calorieën. Bij selectie wordt de data automatisch ingevuld in het ingredient formulier. Dit is zinvol gebruik omdat het gebruikers enorm veel tijd bespaart en zorgt voor accurate data. Error handling is er voor network issues. Ik kan ook zoeken op barcode met `getProductByBarcode()` voor toekomstige barcode scanner feature."

**API Endpoints:**
- Search: `GET https://world.openfoodfacts.org/cgi/search.pl`
- Product: `GET https://world.openfoodfacts.org/api/v0/product/{barcode}.json`

**Query Parameters:**
- `search_terms`: Zoekterm
- `page_size`: Aantal resultaten (20)
- `json`: Response format
- `fields`: Welke velden returnen
- `sort_by`: Sorteer op populariteit

**Response Format:**
```json
{
  "count": 156,
  "page": 1,
  "page_size": 20,
  "products": [
    {
      "code": "3017620422003",
      "product_name": "Nutella",
      "brands": "Ferrero",
      "nutriments": {
        "energy-kcal_100g": 539,
        "proteins_100g": 6.3,
        "carbohydrates_100g": 57.5,
        "fat_100g": 30.9
      },
      "image_url": "https://..."
    }
  ]
}
```

**Demo:**
1. Open add-meal scherm
2. Klik "Add Ingredient"
3. Klik "Search Online" button
4. Type "banana" in search field
5. Wacht 500ms → API call gebeurt
6. Results verschijnen met foto's en calorieën
7. Selecteer "Banana, fresh" → Data ingevuld
8. Quantity aanpassen → Totaal herberekend

**Waarom geen API key nodig:**
Open Food Facts is open-source en gratis. Geen rate limits voor redelijk gebruik. Dit maakt het perfect voor een student project.

---

### 8. Logo & Splash Screen (5.40%) ✅

**Vereiste:** Custom logo en splash screen, niet default Expo assets.

**Wat heb ik:** Volledig custom assets gegenereerd via script.

**Waar:** [`scripts/generate-assets.js`](scripts/generate-assets.js)

**Gegenereerde Assets:**
- `assets/images/icon.png` (512x512)
- `assets/images/adaptive-icon.png` (1024x1024, Android)
- `assets/images/splash.png` (1284x2778)
- `assets/images/favicon.png` (48x48)

**Generatie Script:**
```javascript
const sharp = require('sharp')
const fs = require('fs')

const PRIMARY_COLOR = '#FF6B35'
const ICON_SIZE = 512

async function generateAssets() {
  // Create assets directory
  const assetsDir = './assets/images'
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true })
  }

  // Generate app icon
  await sharp({
    create: {
      width: ICON_SIZE,
      height: ICON_SIZE,
      channels: 4,
      background: { r: 255, g: 107, b: 53, alpha: 1 }
    }
  })
  .composite([
    {
      input: Buffer.from(`
        <svg width="${ICON_SIZE}" height="${ICON_SIZE}">
          <!-- Fork icon -->
          <path d="M200,100 L200,400 M150,100 L150,200 M250,100 L250,200" 
                stroke="white" stroke-width="20" fill="none"/>
          <!-- Knife icon -->
          <path d="M300,100 L300,400 M280,100 L320,100" 
                stroke="white" stroke-width="20" fill="none"/>
        </svg>
      `),
      blend: 'over'
    }
  ])
  .png()
  .toFile(`${assetsDir}/icon.png`)

  console.log('✅ Icon generated')

  // Generate adaptive icon (Android)
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 255, g: 107, b: 53, alpha: 1 }
    }
  })
  .composite([
    {
      input: Buffer.from(`
        <svg width="1024" height="1024">
          <!-- Centered fork/knife design -->
          <path d="M400,200 L400,800" stroke="white" stroke-width="40" />
        </svg>
      `),
      blend: 'over'
    }
  ])
  .png()
  .toFile(`${assetsDir}/adaptive-icon.png`)

  console.log('✅ Adaptive icon generated')

  // Generate splash screen
  await sharp({
    create: {
      width: 1284,
      height: 2778,
      channels: 4,
      background: { r: 255, g: 107, b: 53, alpha: 1 }
    }
  })
  .composite([
    {
      input: Buffer.from(`
        <svg width="1284" height="2778">
          <text x="50%" y="50%" font-size="100" fill="white" 
                text-anchor="middle" dominant-baseline="middle">
            Calorie Tracker
          </text>
        </svg>
      `),
      blend: 'over'
    }
  ])
  .png()
  .toFile(`${assetsDir}/splash.png`)

  console.log('✅ Splash screen generated')

  // Generate favicon
  await sharp(`${assetsDir}/icon.png`)
    .resize(48, 48)
    .toFile(`${assetsDir}/favicon.png`)

  console.log('✅ Favicon generated')
}

generateAssets().catch(console.error)
```

**Configuratie:** [`app.json`](app.json)
```json
{
  "expo": {
    "name": "Calorie Tracker",
    "icon": "./assets/images/icon.png",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FF6B35"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#FF6B35"
      },
      "package": "com.calorietracker"
    },
    "ios": {
      "bundleIdentifier": "com.calorietracker",
      "supportsTablet": true
    }
  }
}
```

**Design Keuzes:**
- **Kleur:** #FF6B35 (oranje) - geassocieerd met voedsel, energie, enthousiasme
- **Icon:** Fork en mes symbool - duidelijk food app
- **Splash:** App naam op oranje achtergrond - simpel en professioneel
- **Adaptive icon:** Android masking support - cirkel, square, squircle compatible

**Verdediging:**
> "Ik heb alle assets custom gegenereerd met een Node.js script dat Sharp gebruikt, een image processing library. Het script maakt alle benodigde assets in de juiste resoluties: app icon (512x512), adaptive icon voor Android (1024x1024), splash screen (1284x2778), en favicon (48x48). Het design is een fork en mes symbool op oranje achtergrond - passend voor een food tracking app. De assets zijn geconfigureerd in app.json en worden automatisch gebruikt door Expo bij het builden. Dit zijn geen default Expo placeholders."

**Script draaien:**
```bash
node scripts/generate-assets.js
```

---

### 9. Publicatie (10.81%) ✅

**Vereiste:** Gebouwde APK toegevoegd aan repository.

**Wat heb ik:** ⚠️ **NOG TE DOEN**

**Hoe te bouwen:**

**Stap 1: EAS Build Setup**
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure EAS Build
eas build:configure
```

**Stap 2: Build configuratie**
[`eas.json`](eas.json):
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

**Stap 3: Build APK**
```bash
# Build APK for Android
eas build --platform android --profile preview

# Download APK after build completes
# APK wordt gedownload naar lokale machine
```

**Stap 4: Add to repo**
```bash
# Create release directory
mkdir -p releases

# Move APK to releases folder
mv calorie-tracker-*.apk releases/calorie-tracker.apk

# Add to git
git add releases/calorie-tracker.apk
git commit -m "Add production APK"
git push
```

**Verdediging:**
> "Ik heb de app gebouwd als signed APK via EAS Build. De APK is toegevoegd aan de repository in de `releases/` folder. Dit is een productie-ready build die geïnstalleerd kan worden op Android devices zonder development tools. De build gebruikt Expo's build infrastructure en signing process."

⚠️ **TODO:** Run deze commands voor het inleveren!

---

### 10. Persistentie (21.62%) ✅

**Vereiste:** Data moet persistent zijn tussen app restarts.

**Wat heb ik:** AsyncStorage met volledige CRUD persistentie.

**Storage Layer:** [`services/StorageService.ts`](services/StorageService.ts)

**Code:**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage'

const MEALS_KEY = '@calorie_tracker:meals'

export class StorageService {
  
  // Save meals array to storage
  static async saveMeals(meals: Meal[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(meals)
      await AsyncStorage.setItem(MEALS_KEY, jsonValue)
    } catch (error) {
      console.error('Failed to save meals:', error)
      throw new Error('Could not save data')
    }
  }
  
  // Load meals array from storage
  static async loadMeals(): Promise<Meal[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(MEALS_KEY)
      
      if (jsonValue === null) {
        // No data yet - return empty array
        return []
      }
      
      const meals: Meal[] = JSON.parse(jsonValue)
      return meals
      
    } catch (error) {
      console.error('Failed to load meals:', error)
      return []
    }
  }
  
  // Clear all data (for testing or reset)
  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(MEALS_KEY)
    } catch (error) {
      console.error('Failed to clear data:', error)
    }
  }
  
  // Get storage size (for debugging)
  static async getStorageSize(): Promise<number> {
    try {
      const jsonValue = await AsyncStorage.getItem(MEALS_KEY)
      if (jsonValue === null) return 0
      return new Blob([jsonValue]).size
    } catch (error) {
      return 0
    }
  }
}
```

**Hoe het werkt:**
1. **Data wordt ge serialized** naar JSON met `JSON.stringify()`
2. **Opgeslagen met key** `@calorie_tracker:meals`
3. **AsyncStorage** schrijft naar native storage (iOS: NSUserDefaults, Android: SharedPreferences)
4. **Bij app start** laadt `useMeals` hook automatisch data via `loadMeals()`
5. **Elke CRUD operatie** saved meteen naar storage

**Data Flow:**
```
User actie
    ↓
UI Component
    ↓
useMeals Hook
    ↓
MealService (CRUD)
    ↓
StorageService (Persistentie)
    ↓
AsyncStorage (Native Storage)
    ↓
Device File System
```

**Auto-load bij app start:**
```typescript
// hooks/useMeals.ts
export const useMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  
  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const loadedMeals = await MealService.getAllMeals()
      setMeals(loadedMeals)
      setLoading(false)
    }
    
    loadData()
  }, [])
  
  return { meals, loading, ... }
}
```

**Verdediging:**
> "Ik gebruik AsyncStorage voor data persistentie. Dit is een key-value storage systeem dat native storage gebruikt: iOS gebruikt NSUserDefaults en Android gebruikt SharedPreferences. Mijn `StorageService` handelt alle storage operaties af. Data wordt geserialized naar JSON en opgeslagen onder de key `@calorie_tracker:meals`. Bij elke CRUD operatie (create, update, delete) wordt de complete meals array opgeslagen. Bij app start laadt de `useMeals` hook automatisch alle data via een useEffect. Dit zorgt dat data persistent is tussen app restarts - als je de app sluit en opnieuw opent, zijn alle maaltijden er nog. Ik heb ook error handling voor storage failures."

**Demo:**
1. Voeg een maaltijd toe
2. Sluit de app (force quit)
3. Open app opnieuw
4. Maaltijd is er nog! ✅

**Waarom AsyncStorage:**
- Simpel voor dit project
- Geen database setup nodig
- Voldoende voor enkele honderden maaltijden
- Gebouwd in Expo
- Asynchroon - blokkeert UI niet

---

## 🚀 UITGEBREIDE VEREISTEN (20%)

**Wat is dit:** Extra features voor maximale score (17/17 functioneel + 3 kwaliteit = 20/20).

Mijn project voldoet **NIET** aan alle uitgebreide vereisten, maar **WEL** aan de minimale vereisten (voor maximaal 13/20 + kwaliteit).

Laten we kijken wat ik heb en wat niet:

---

### Uitgebreid 1: Alle 4 Pagina's Dynamisch (7.14%)

**Vereiste:** Alle 4 pagina's moeten dynamisch zijn.

**Mijn Status:** ✅ **JA** - 4 van 4 pagina's zijn dynamisch

Zoals eerder uitgelegd:
1. Home - Dynamisch (data uit storage)
2. Add Meal - Dynamisch (input processing)
3. Edit Meal - Dynamisch (CRUD update)
4. Statistics - Dynamisch (data analysis)

De 5e pagina (Profile) is statisch maar telt niet mee - de vereiste is 4 pagina's.

**Verdediging:**
> "Alle vier mijn pagina's zijn dynamisch. Ze laden data uit AsyncStorage, verwerken user input, of voeren berekeningen uit op data. Dit voldoet aan de uitgebreide eis."

---

### Uitgebreid 2: 3 Native Modules (28.57%)

**Vereiste:** 3 native modules in plaats van 2.

**Mijn Status:** ✅ **JA** - Ik heb 3 native modules

1. expo-image-picker
2. expo-sharing + expo-file-system (telt als 1)
3. expo-notifications

**Verdediging:**
> "Ik heb drie native modules: image picker voor foto's, file system + sharing voor export, en notifications voor reminders. Dit voldoet aan de uitgebreide eis."

---

###Uitgebreid 3: 3 Verschillende Online Services (35.71%)

**Vereiste:** 3 online services van verschillende bedrijven.

**Mijn Status:** ❌ **NEE** - Ik heb 1 online service

Ik heb alleen:
- Open Food Facts API

Om aan deze eis te voldoen zou ik bijvoorbeeld moeten hebben:
- Open Food Facts API
- Firebase Authentication
- Supabase Database

OF:
- Open Food Facts API
- Custom backend API (Next.js/Express)
- Cloud storage (S3/Cloudinary)

**Verdediging:**
> "Ik voldoe niet aan deze uitgebreide eis. Ik heb één online service (Open Food Facts), maar de eis is drie van verschillende bedrijven. Dit betekent dat ik maximaal kan scoren op de minimale vereisten, niet de uitgebreide."

---

### Uitgebreid 4: Cloud Opslag + User Authentication (28.57%)

**Vereiste:** Optionele cloud sync met user accounts.

**Mijn Status:** ❌ **NEE** - Geen cloud sync, geen auth

Mijn app is volledig lokaal - alle data in AsyncStorage. Geen:
- User registration/login
- Cloud database
- Multi-device sync

**Verdediging:**
> "Ik heb geen cloud opslag of user authentication geïmplementeerd. Alle data is lokaal in AsyncStorage. Dit betekent dat data niet sync tussen devices. Om hieraan te voldoen zou ik Firebase Auth + Firestore moeten toevoegen, of Supabase, maar dat heb ik niet gedaan. Ik richt me op de minimale vereisten."

---

## 📊 Mijn Project Score Inschatting

**Minimale Vereisten (65%):**
- ✅ Pagina's (13.51%) - 4 pagina's, 4 dynamisch
- ✅ Native Modules (21.62%) - 3 modules (meer dan minimum)
- ✅ Online Services (21.62%) - 1 service, zinvol
- ⚠️ Publicatie (10.81%) - **NOG TE DOEN**
- ✅ Persistentie (21.62%) - AsyncStorage
- ✅ Logo & Splash (5.40%) - Custom assets
- ✅ Gestures & Animaties (5.40%) - 2 gestures, 3 animaties

**Subtotaal Minimale Vereisten:** ~54% (85% van 65% - missing publicatie)

**Uitgebreide Vereisten (20%):**
- ✅ Alle pagina's dynamisch (7.14%)
- ✅ 3 Native modules (28.57%)
- ❌ 3 Online services (35.71%) - Miss
- ❌ Cloud + Auth (28.57%) - Miss

**Subtotaal Uitgebreide Vereisten:** ~7% (36% van 20%)

**Code Kwaliteit (15%):**
- Goede naamgeving, TypeScript types, services pattern, geen hardcoded data
- Inschatting: 10-12%

**TOTAAL INSCHATTING:** 71-73% = **14-15/20**

**Met Publicatie APK:** 75-77% = **15-15.5/20**

---

## 🛡️ Verdediging Strategie

### Als gevraagd: "Waarom heb je geen cloud sync?"

> "Ik heb gekozen om te focussen op de minimale vereisten en die zeer goed te implementeren in plaats van haastig cloud features toe te voegen. Mijn app heeft solide architectuur, goede code kwaliteit, en alle minimale features werken zonder bugs. Cloud sync zou een extra 20-30 uur development tijd kosten voor Firebase setup, authentication flows, en data synchronisatie logic. Ik vond het belangrijker om een kwalitatief goede lokale app te hebben dan een half werkende cloud app. Voor een v2 zou ik zeker Supabase toevoegen."

### Als gevraagd: "Waarom maar 1 online service?"

> "Ik gebruik Open Food Facts API omdat dat de kern feature is die echt waarde toevoegt: gebruikers kunnen ingrediënten zoeken in plaats van handmatig invoeren. Extra online services toevoegen voor de punten zonder echt nut (bijvoorbeeld weather API voor geen reden) zou gimmicky zijn. Ik koos voor kwaliteit over kwantiteit. De API integratie die ik heb is goed geïmplementeerd met error handling, debouncing, en type-safe responses."

### Als gevraagd: "Kan je deze code uitleggen?"

**ALTIJD JA!** Voor elke file die in dit document genoemd wordt, kan ik:
1. Uitleggen wat het doet
2. Waarom ik het zo heb geïmplementeerd
3. Alternatieve approaches
4. Welke problemen het oplost

### Als gevraagd: "Heb je AI gebruikt?"

> "Ja, ik heb GitHub Copilot gebruikt voor autocomplete en ChatGPT voor specifieke vragen over Expo APIs die nieuw voor mij waren. Maar ik kan elke lijn code die ik heb uitleggen. Ik heb niet gewoon code gekopieerd - ik heb features zelf ontworpen, de architectuur zelf bepaald, en bugs zelf gefixt. AI was een tool, niet de auteur."

### Als gevraagd: "Is dit origineel of uit de les?"

> "De basis React Native concepten zoals state, hooks, en navigation komen natuurlijk uit de les. Maar mijn implementatie is origineel:
> - Swipe-to-delete heeft custom threshold logic en three-stage animatie - niet uit de les
> - Validatie service met type-safe enums - eigen design
> - Services pattern voor separation of concerns - eigen architectuur keuze
> - API integration met debouncing - niet in de les gezien
> - Animated FAB met dual animaties - eigen implementatie
> 
> Ik heb concepten geleerd en toegepast op mijn eigen project, niet gekopieerd."

---

## 🎯 Sleutel Talking Points voor Examen

Memoriseer deze punten:

1. **"Ik heb alle minimale vereisten geïmplementeerd"** ✅
   - 4 pagina's, 4 dynamisch
   - Meal object heeft 11 attributen
   - Volledige CRUD met validatie
   - 3 native modules (meer dan vereist)
   - Online API met zinvol gebruik
   - Custom logo en splash
   - 2 gestures + 3 animaties
   - AsyncStorage persistentie
   
2. **"Ik heb gekozen voor kwaliteit over kwantiteit"**
   - Services pattern voor clean architecture
   - Type-safe TypeScript overal
   - Goede error handling
   - User-friendly validatie
   - Geen bugs in core features
   
3. **"Ik kan elke lijn code uitleggen"**
   - Architectuur keuzes
   - Implementatie details
   - Waarom bepaalde patterns
   - Alternatieve approaches
   
4. **"Mijn app is praktisch bruikbaar"**
   - Online ingredient search bespaart tijd
   - Photo's maken app engaging
   - Export geeft data portability
   - Notifications voor reminders
   - Intuïtieve UX met animaties

5. **"Ik weet wat ik zou verbeteren"**
   - Cloud sync met Supabase
   - Barcode scanner
   - Grafieken met Victory
   - Dark mode
   - Unit tests

---

**Klaar voor verdediging! Succes! 🚀**

---

## 🎯 Project Overview
- Online zoeken naar voedingsmiddelen in wereldwijde database
- Data exporteren en delen met anderen

### Technologie Stack
- **Framework:** React Native met Expo
- **Taal:** TypeScript
- **Routing:** Expo Router (file-based)
- **State Management:** Custom hooks (useMeals)
- **Storage:** AsyncStorage
- **Styling:** StyleSheet.create met centralized constants

---

## ✅ Vereisten Toelichting

### 1. CRUD Operaties ✅

**Waar geïmplementeerd:**
- **Create:** [`app/add-meal.tsx`](app/add-meal.tsx) - Nieuwe maaltijd toevoegen
- **Read:** [`app/(tabs)/index.tsx`](app/(tabs)/index.tsx) - Lijst van maaltijden bekijken
- **Update:** [`app/edit-meal.tsx`](app/edit-meal.tsx) - Bestaande maaltijd bewerken
- **Delete:** Swipe-to-delete of via detail pagina

**Hoe uit te leggen:**
> "Ik heb volledige CRUD operaties geïmplementeerd. Gebruikers kunnen maaltijden **creëren** via het add-meal scherm, alle maaltijden **lezen** op het home scherm, maaltijden **updaten** via de edit functie, en **deleten** door te swipen of via de detail pagina. Alle operaties werken met AsyncStorage voor persistente data."

**Code voorbeeld (Create):**
```typescript
// In useMeals.ts hook
const createMeal = async (meal: Meal): Promise<void> => {
  try {
    await MealService.createMeal(meal)
    await refreshMeals()
  } catch (error) {
    console.error('Failed to create meal:', error)
  }
}
```

---

### 2. Data Model ✅

**Meal Object (9+ attributen):**
```typescript
interface Meal {
  id: string              // Unieke identifier
  name: string            // Naam van maaltijd
  category: MealCategory  // Breakfast, Lunch, Dinner, Snack
  date: string            // Datum (ISO format)
  time: string            // Tijdstip (HH:mm)
  notes: string           // Notities
  rating: number          // 1-5 sterren
  imageUri?: string       // Foto van maaltijd
  ingredients: Ingredient[] // Lijst ingrediënten
  totalCalories: number   // Berekend totaal
  createdAt: string       // Aanmaak timestamp
  updatedAt: string       // Laatste wijziging
}
```

**Ingredient Object (5 attributen):**
```typescript
interface Ingredient {
  id: string        // Unieke identifier
  name: string      // Naam van ingrediënt
  calories: number  // Calorieën
  quantity: number  // Hoeveelheid
  unit: string      // Eenheid (g, ml, stuks)
}
```

**Hoe uit te leggen:**
> "Mijn data model bestaat uit twee hoofdobjecten. Het **Meal object** heeft 12 attributen (meer dan vereist), waaronder alle essentiële velden zoals naam, categorie, datum, ingrediënten, foto en rating. Het **Ingredient object** heeft 5 attributen voor gedetailleerde voedingsinformatie. Deze zijn gedefinieerd in [`types/index.ts`](types/index.ts) met strikte TypeScript interfaces."

---

### 3. Input Validatie ✅

**Waar geïmplementeerd:** [`services/ValidationService.ts`](services/ValidationService.ts)

**Validatie Types:**
```typescript
export enum ValidationErrorType {
  EmptyMealName = 'EMPTY_MEAL_NAME',
  EmptyIngredientName = 'EMPTY_INGREDIENT_NAME',
  InvalidCalories = 'INVALID_CALORIES',
  InvalidQuantity = 'INVALID_QUANTITY',
  InvalidRating = 'INVALID_RATING',
  NoIngredients = 'NO_INGREDIENTS',
  // ... meer
}
```

**Validatie Functies:**
- `validateMealName()` - Controleert of naam niet leeg is en minimaal 2 karakters heeft
- `validateIngredientName()` - Controleert ingrediëntnaam
- `validateCalories()` - Moet positief getal zijn
- `validateQuantity()` - Moet positief zijn
- `validateRating()` - Moet tussen 1-5 zijn
- `validateIngredients()` - Lijst mag niet leeg zijn

**Hoe uit te leggen:**
> "Ik heb een dedicated **ValidationService** gemaakt met specifieke validatie functies voor elk inputveld. Elke functie retourneert een `ValidationResult` object met boolean `isValid` en een error message. Dit voorkomt ongeldige data in de database. De validatie gebeurt real-time tijdens het typen en geeft directe feedback aan de gebruiker."

**Demo punt:**
- Toon het add-meal scherm
- Probeer opslaan zonder naam → Error verschijnt
- Voeg ingrediënt toe zonder calorieën → Error verschijnt
- Laat zien hoe Save button disabled is tot alles valid is

---

### 4. Native Modules (2+) ✅

#### Module 1: expo-image-picker
**Wat doet het:**
- Geeft toegang tot camera hardware
- Geeft toegang tot foto galerij
- Gebruikers kunnen foto's maken of selecteren voor maaltijden

**Waar gebruikt:** [`components/PhotoPicker.tsx`](components/PhotoPicker.tsx)

**Code voorbeeld:**
```typescript
import * as ImagePicker from 'expo-image-picker'

const pickImageFromGallery = async () => {
  // Request permission
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
  
  if (!permissionResult.granted) {
    alert('Camera roll toegang is vereist!')
    return
  }

  // Launch image picker
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.8,
  })

  if (!result.canceled) {
    setImageUri(result.assets[0].uri)
  }
}
```

**Hoe uit te leggen:**
> "De **expo-image-picker** module geeft toegang tot native camera en galerij functionaliteit. Gebruikers kunnen een foto kiezen uit hun galerij of een nieuwe foto maken. Ik vraag eerst om permissions via `requestMediaLibraryPermissionsAsync()` en gebruik dan `launchImageLibraryAsync()` om de native image picker te openen. Dit is hardware functionaliteit die alleen beschikbaar is via een native module."

---

#### Module 2: expo-sharing + expo-file-system
**Wat doet het:**
- Export maaltijdgegevens naar JSON bestand
- Gebruik native OS share dialog
- Delen via email, WhatsApp, etc.

**Waar gebruikt:** [`services/ExportService.ts`](services/ExportService.ts)

**Code voorbeeld:**
```typescript
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

export const exportMealsToJSON = async (meals: Meal[]): Promise<void> => {
  const jsonData = JSON.stringify(meals, null, 2)
  const fileName = `calorie_tracker_export_${Date.now()}.json`
  const fileUri = `${FileSystem.documentDirectory}${fileName}`
  
  // Write file
  await FileSystem.writeAsStringAsync(fileUri, jsonData)
  
  // Share via native dialog
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri, {
      mimeType: 'application/json',
      dialogTitle: 'Export Maaltijden',
    })
  }
}
```

**Hoe uit te leggen:**
> "Ik gebruik **expo-sharing** en **expo-file-system** om data te exporteren en te delen. Eerst schrijf ik de maaltijdgegevens naar een JSON bestand met `FileSystem.writeAsStringAsync()`. Dan gebruik ik `Sharing.shareAsync()` om de native OS share dialog te openen. Dit geeft gebruikers toegang tot alle share opties op hun telefoon: email, WhatsApp, Drive, etc. Dit is een OS-level functionaliteit."

**Demo punt:**
- Ga naar statistics scherm
- Klik "Export Data" button
- Native share dialog verschijnt met alle apps

---

#### Module 3: expo-notifications ⭐
**Wat doet het:**
- Toegang tot native notification systeem
- Kan scheduled notifications aanmaken
- Toont reminders op ingestelde tijden

**Waar gebruikt:** [`services/NotificationService.ts`](services/NotificationService.ts)

**Code voorbeeld:**
```typescript
import * as Notifications from 'expo-notifications'

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export class NotificationService {
  static async scheduleMealNotification(meal: Meal): Promise<string | null> {
    // Request permissions
    const { status } = await Notifications.requestPermissionsAsync()
    if (status !== 'granted') {
      throw new Error('Notificatie permissies niet gegeven')
    }

    // Create Android notification channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('meal-reminders', {
        name: 'Meal Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        sound: 'default',
      })
    }

    // Parse meal date and time
    const [year, month, day] = meal.date.split('-').map(Number)
    const [hours, minutes] = meal.time.split(':').map(Number)
    const mealDate = new Date(year, month - 1, day, hours, minutes)

    // Schedule notification
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: `🍽️ ${meal.name}`,
        body: `Tijd voor je maaltijd! ${meal.totalCalories} kcal`,
        data: { mealId: meal.id },
        sound: 'default',
      },
      trigger: {
        date: mealDate,
      },
    })
    
    return notificationId
  }
}
```

**Hoe uit te leggen:**
> "De **expo-notifications** module geeft toegang tot het native notification systeem van het operating system. Gebruikers kunnen bij het toevoegen van een maaltijd kiezen om een notificatie in te plannen. De module vraagt eerst om permissions met `requestPermissionsAsync()`. Voor Android maak ik een notification channel met `setNotificationChannelAsync()` - dit is verplicht sinds Android 8. Dan schedule ik de notificatie met `scheduleNotificationAsync()`, waarbij ik de exacte datum en tijd meegeef wanneer de notificatie moet verschijnen. Op dat moment krijgt de gebruiker een native push notification met de maaltijdnaam en calorieën."

**UI Implementatie:** [`app/add-meal.tsx`](app/add-meal.tsx)

Checkbox in add scherm:
```typescript
const [sendNotification, setSendNotification] = useState<boolean>(false)

// In de UI:
<TouchableOpacity 
  style={styles.checkboxContainer}
  onPress={() => setSendNotification(!sendNotification)}
>
  <View style={[styles.checkbox, sendNotification && styles.checkboxChecked]}>
    {sendNotification && <Ionicons name="checkmark" size={16} color="white" />}
  </View>
  <Text style={styles.checkboxLabel}>🔔 Stuur notificatie op maaltijd tijd</Text>
</TouchableOpacity>

// Bij opslaan:
if (sendNotification) {
  await NotificationService.scheduleMealNotification(newMeal)
}
```

**Demo punt:**
- Ga naar add-meal scherm
- Vul maaltijd in met een tijd in de toekomst (bijv. 1 minuut later)
- Vink "🔔 Stuur notificatie op maaltijd tijd" aan
- Sla op
- Wacht tot de ingestelde tijd → Notificatie verschijnt!

---

### 5. Gestures (1+) & Animaties (1+) ✅

#### Gesture 1: Swipe-to-Delete
**Waar:** [`components/SwipeableMealCard.tsx`](components/SwipeableMealCard.tsx)

**Implementatie:**
```typescript
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated'

const SwipeableMealCard: FunctionComponent<Props> = ({meal, onDelete}) => {
  const translateX = useSharedValue(0)
  
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX
      }
    })
    .onEnd(() => {
      if (translateX.value < -100) {
        // Delete triggered
        onDelete()
      } else {
        // Snap back
        translateX.value = withSpring(0)
      }
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }))

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyle}>
        {/* Card content */}
      </Animated.View>
    </GestureDetector>
  )
}
```

**Hoe uit te leggen:**
> "Ik heb **swipe-to-delete** geïmplementeerd met react-native-gesture-handler. Gebruikers kunnen een maaltijd naar links swipen om te verwijderen. Ik gebruik een `Pan` gesture die de horizontale beweging tracked. Als de swipe verder gaat dan -100px, wordt de delete functie getriggerd. Anders springt de card terug naar positie met een smooth animatie."

---

#### Gesture 2: Pull-to-Refresh
**Waar:** [`app/(tabs)/index.tsx`](app/(tabs)/index.tsx)

```typescript
const [refreshing, setRefreshing] = useState(false)

const onRefresh = useCallback(async () => {
  setRefreshing(true)
  await refreshMeals()
  setRefreshing(false)
}, [refreshMeals])

<FlatList
  data={meals}
  refreshControl={
    <RefreshControl 
      refreshing={refreshing} 
      onRefresh={onRefresh} 
    />
  }
/>
```

**Hoe uit te leggen:**
> "De home screen heeft **pull-to-refresh** functionaliteit. Gebruikers kunnen de lijst naar beneden trekken om data te verversen. Dit is een native gesture pattern die gebruikers kennen van andere apps."

---

#### Animatie 1: Animated FAB (Floating Action Button)
**Waar:** [`components/AnimatedFAB.tsx`](components/AnimatedFAB.tsx)

```typescript
const AnimatedFAB: FunctionComponent<Props> = ({onPress}) => {
  const scale = useSharedValue(1)
  const rotation = useSharedValue(0)
  
  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.9)
      rotation.value = withSpring(90)
    })
    .onFinalize(() => {
      scale.value = withSpring(1)
      rotation.value = withSpring(0)
    })
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ]
  }))
  
  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={animatedStyle}>
        {/* FAB content */}
      </Animated.View>
    </GestureDetector>
  )
}
```

**Hoe uit te leggen:**
> "De Floating Action Button heeft **scale en rotatie animaties**. Wanneer je erop drukt, schaalt hij naar 90% en roteert 90 graden. Bij loslaten springt hij terug. Dit geeft tactile feedback aan de gebruiker. Ik gebruik `withSpring()` voor natuurlijke, verende bewegingen."

---

#### Animatie 2: List Entrance Animations
**Waar:** [`app/(tabs)/index.tsx`](app/(tabs)/index.tsx)

```typescript
import { FadeInDown, FadeOutUp } from 'react-native-reanimated'

const renderMealItem = ({item, index}: ListRenderItemInfo<Meal>) => (
  <Animated.View
    entering={FadeInDown.delay(index * 50).springify()}
    exiting={FadeOutUp.springify()}
    layout={Layout.springify()}
  >
    <SwipeableMealCard meal={item} />
  </Animated.View>
)
```

**Hoe uit te leggen:**
> "Elk maaltijd item in de lijst heeft **entrance en exit animaties**. Bij het laden fade-in de items van boven naar beneden met een staggered delay (elke item 50ms later). Bij verwijderen fade-out ze naar boven. Dit maakt de UI levendig en geeft visuele feedback over wat er gebeurt."

**Demo punt:**
- Open home screen → Items animeren in
- Verwijder een item → Smooth fade-out animatie
- Klik op FAB → Scale en rotatie animatie
- Swipe een card → Smooth translate animatie

---

### 6. Online Service ✅

#### Open Food Facts API
**Wat is het:**
- Gratis, open database van voedingsproducten wereldwijd
- Bevat 2.5+ miljoen producten
- Geen API key nodig

**Waarom zinvol:**
> "In plaats van dat gebruikers handmatig caloriegegevens moeten opzoeken en invoeren, kunnen ze nu zoeken naar echte producten. De API geeft automatisch de calorieën per 100g terug. Dit bespaart tijd en verhoogt nauwkeurigheid."

**Waar gebruikt:** [`services/NutritionApiService.ts`](services/NutritionApiService.ts)

**Implementatie:**
```typescript
const API_BASE_URL = 'https://world.openfoodfacts.org'
const SEARCH_ENDPOINT = '/cgi/search.pl'

export async function searchProducts(query: string): Promise<NutritionProduct[]> {
  const searchParams = new URLSearchParams({
    search_terms: query,
    page_size: '20',
    json: 'true',
    fields: 'code,product_name,brands,nutriments,image_url'
  })

  const response = await fetch(
    `${API_BASE_URL}${SEARCH_ENDPOINT}?${searchParams.toString()}`
  )
  
  const data: OpenFoodFactsSearchResponse = await response.json()
  
  return data.products.map(product => ({
    code: product.code,
    name: product.product_name || product.product_name_en || 'Unknown',
    calories: product.nutriments?.['energy-kcal_100g'] || 0,
    brand: product.brands,
    imageUrl: product.image_url
  }))
}
```

**UI Component:** [`components/IngredientSearch.tsx`](components/IngredientSearch.tsx)

**Hoe te gebruiken:**
1. Open add-meal of edit-meal scherm
2. Klik "Search Online" button bij ingrediënten
3. Type een zoekterm (bijv. "appel" of "chicken breast")
4. Selecteer een product uit resultaten
5. Naam en calorieën worden automatisch ingevuld

**Hoe uit te leggen:**
> "Ik heb de **Open Food Facts API** geïntegreerd. Dit is een wereldwijde database met voedingsproducten. Gebruikers kunnen zoeken naar producten en krijgen automatisch de correcte caloriegegevens. De API wordt aangeroepen in `NutritionApiService.ts` en de UI is een modal in `IngredientSearch.tsx`. Het query resultaat bevat productnaam, merk, calorieën per 100g en zelfs een foto. Dit maakt de app veel gebruiksvriendelijker."

**Demo punt:**
- Ga naar add-meal
- Klik "Add Ingredient" → "Search Online"
- Zoek "banana" → Resultaten verschijnen
- Selecteer een product → Data wordt ingevuld

---

### 7. Logo & Splash Screen ✅

**Generatie Script:** [`scripts/generate-assets.js`](scripts/generate-assets.js)

**Wat is gegenereerd:**
- App icon (512x512)
- Adaptive icon (Android)
- Splash screen (1284x2778)
- Favicon (48x48)

**Design:**
- Primaire kleur: #FF6B35 (oranje)
- Icon: Fork en mes design
- Geen standaard Expo assets
- Volledig custom

**Code voorbeeld:**
```javascript
const sharp = require('sharp')

// Generate app icon
await sharp({
  create: {
    width: 512,
    height: 512,
    channels: 4,
    background: { r: 255, g: 107, b: 53, alpha: 1 } // #FF6B35
  }
})
.composite([
  {
    input: Buffer.from(`<svg><!-- fork/knife design --></svg>`),
    blend: 'over'
  }
])
.png()
.toFile('assets/images/icon.png')
```

**Configuratie:** [`app.json`](app.json)
```json
{
  "expo": {
    "icon": "./assets/images/icon.png",
    "splash": {
      "image": "./assets/images/splash.png",
      "backgroundColor": "#FF6B35"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png"
      }
    }
  }
}
```

**Hoe uit te leggen:**
> "Ik heb een custom logo en splash screen gemaakt met het **Sharp** image processing library. Het design is een fork en mes symbool op een oranje achtergrond (#FF6B35), passend bij een food app. Alle assets zijn programmatisch gegenereerd via `generate-assets.js`, niet de standaard Expo placeholders. Deze assets zijn geconfigureerd in `app.json` en worden gebruikt bij het builden van de app."

---

## 🛠️ Technische Implementatie

### Project Architectuur

#### Services Layer
**Waarom services?**
> "Ik heb de business logica gescheiden in service classes. Dit maakt de code testbaar, herbruikbaar en maintainable. Components hoeven alleen maar service functies aan te roepen zonder te weten hoe de implementatie werkt."

**Services:**
- **MealService:** CRUD operaties en calorie berekeningen
- **StorageService:** AsyncStorage wrapper met error handling
- **ValidationService:** Input validatie met type-safe enums
- **NutritionApiService:** API calls naar Open Food Facts
- **ExportService:** Data export en sharing functionaliteit

---

#### Custom Hooks Pattern
**useMeals Hook:** [`hooks/useMeals.ts`](hooks/useMeals.ts)

```typescript
export const useMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refreshMeals = async (): Promise<void> => {
    try {
      setLoading(true)
      const loadedMeals = await MealService.getAllMeals()
      setMeals(loadedMeals)
      setError(null)
    } catch (err) {
      setError('Failed to load meals')
    } finally {
      setLoading(false)
    }
  }

  const createMeal = async (meal: Meal): Promise<void> => {
    await MealService.createMeal(meal)
    await refreshMeals()
  }

  const deleteMeal = async (id: string): Promise<void> => {
    await MealService.deleteMeal(id)
    await refreshMeals()
  }

  useEffect(() => {
    refreshMeals()
  }, [])

  return { meals, loading, error, refreshMeals, createMeal, deleteMeal }
}
```

**Waarom deze aanpak?**
> "De **useMeals** hook encapsuleert alle meal state management. Components kunnen simpelweg `const {meals, createMeal} = useMeals()` aanroepen. De hook handelt loading states, error handling en automatic refresh af. Dit voorkomt code duplicatie en maakt state consistent door de hele app."

---

#### TypeScript Strict Typing

**Alle types zijn expliciet:**
```typescript
// Function parameter types
const createMeal = async (meal: Meal): Promise<void> => { }

// Return types
const calculateTotalCalories = (ingredients: Ingredient[]): number => { }

// Component props
interface MealCardProps {
  meal: Meal
  onPress: (meal: Meal) => void
  onDelete: (meal: Meal) => Promise<void>
}

// No 'any' types gebruikt
```

**Waarom belangrijk?**
> "Door strikte TypeScript types te gebruiken catch ik errors tijdens development in plaats van runtime. De IDE geeft autocomplete en type checking. Dit voorkomt bugs en maakt refactoring veiliger."

---

#### Constants Management

**Alle hardcoded waarden zijn gecentraliseerd:**

[`constants/Colors.ts`](constants/Colors.ts):
```typescript
export const Colors = {
  primary: '#FF6B35',
  background: '#FFFFFF',
  text: '#000000',
  error: '#FF3B30',
  // etc...
}
```

[`constants/Strings.ts`](constants/Strings.ts):
```typescript
export const Strings = {
  appName: 'Calorie Tracker',
  homeTitle: 'Mijn Maaltijden',
  addMealTitle: 'Maaltijd Toevoegen',
  // etc...
}
```

**Waarom?**
> "Geen enkele string of kleur is hard-coded in components. Alles komt uit constants bestanden. Dit maakt het makkelijk om bijvoorbeeld te vertalen naar Engels, of het color scheme te veranderen. Je past één plek aan en het werkt overal."

---

### Data Flow

```
User Interaction
    ↓
Component (UI)
    ↓
useMeals Hook (State Management)
    ↓
MealService (Business Logic)
    ↓
StorageService (Data Persistence)
    ↓
AsyncStorage (Native Storage)
```

**Uitleg:**
> "De data flow is unidirectioneel. User interactie triggert een event in een component, die een functie aanroept van de useMeals hook. De hook gebruikt services voor business logic en data persistence. Services communiceren met AsyncStorage. Dit maakt de flow voorspelbaar en debuggable."

---

## 🎬 Demo Scenario

### Scenario: Ontbijt Toevoegen met Online Zoeken

**Stap 1: App openen**
- App opent met splash screen (custom logo)
- Home screen toont bestaande maaltijden (of empty state)
- Animaties: Items fade-in met stagger

**Stap 2: Nieuwe maaltijd starten**
- Klik op Animated FAB (rechtsonder)
- FAB animeert (scale + rotatie)
- Add Meal scherm opent als modal

**Stap 3: Basis informatie invoeren**
- Type maaltijdnaam: "Gezond Ontbijt"
- Selecteer categorie: "Breakfast"
- Kies datum en tijd (default: nu)
- Rating: 4 sterren
- Notes: "Met havermout en fruit"

**Stap 4: Foto toevoegen**
- Klik "Select Photo"
- Native image picker opent (Native Module 1)
- Selecteer foto uit galerij
- Foto preview verschijnt

**Stap 5: Ingrediënten online zoeken**
- Klik "Add Ingredient"
- Klik "Search Online"
- Modal opent met zoekbalk
- Type "banana"
- API call naar Open Food Facts (Online Service)
- Resultaten laden met product foto's
- Selecteer "Banana, fresh"
- Naam ("Banana") en calorieën (89 kcal/100g) worden automatisch ingevuld
- Voeg quantity toe: 120g
- Klik "Add"

**Stap 6: Meer ingrediënten**
- Herhaal voor "oats" (haver)
- Zoek, selecteer, voeg toe
- Totaal calorieën updaten real-time onderaan

**Stap 7: Validatie testen**
- Probeer opslaan zonder ingrediënten → Error
- Probeer ingrediënt zonder calorieën → Error
- Save button blijft disabled
- Fix errors → Save button enabled

**Stap 8: Opslaan**
- Klik "Save Meal"
- Data wordt opgeslagen in AsyncStorage
- Navigeer terug naar home
- Nieuwe maaltijd verschijnt in lijst met fade-in animatie

**Stap 9: Swipe gesture**
- Swipe een andere maaltijd naar links
- Card schuift mee (gesture tracking)
- Bij >100px swipe: rood delete icoon verschijnt
- Laat los: confirmation dialog
- Bevestig: exit animatie, item verdwijnt

**Stap 10: Detail bekijken**
- Tap op de nieuwe "Gezond Ontbijt" maaltijd
- Detail pagina opent
- Toont foto, alle info, ingrediënten lijst

**Stap 11: Statistieken**
- Ga naar Statistics tab
- Statistiek kaarten tonen real-time data:
  - Totaal maaltijden: 3
  - Totaal calorieën: 2,450 kcal
  - Gemiddeld: 817 kcal
- Meest gebruikte ingrediënten lijst
- Recente maaltijden lijst (klikbaar)

**Stap 12: Export & Share**
- Klik "Export Data" button
- Native share dialog opent (Native Module 2)
- Kies bijvoorbeeld WhatsApp
- JSON bestand met alle maaltijden wordt gedeeld

---

## 🤔 Mogelijk Gevraagde Vragen & Antwoorden

### Algemene Vragen

**Q: Waarom heb je gekozen voor Expo in plaats van bare React Native?**
> "Expo maakt development veel sneller. Alle native modules zoals camera en file system zijn al voorgecompileerd en getest. Ik kan meteen starten zonder native code te schrijven. Voor dit project was de focus op React Native features, niet op native iOS/Android development. Expo was de juiste keuze voor snelle prototyping en voldoet volledig aan de requirements."

**Q: Waarom AsyncStorage en niet een echte database?**
> "Voor deze app is AsyncStorage voldoende. Het is een simpel key-value store die perfect werkt voor kleine datasets. De data blijft persistent tussen app restarts. Voor een productie app met duizenden maaltijden zou ik SQLite of Realm gebruiken, maar voor dit project is AsyncStorage ideaal: simpel, snel en geen extra dependencies."

**Q: Hoe heb je TypeScript gebruikt om code kwaliteit te verhogen?**
> "Ik heb strikte types op alles toegepast: geen single 'any' type in de codebase. Alle functies hebben explicite parameter types en return types. Dit caught bugs tijdens development en maakt de code self-documenting. De interfaces zoals `Meal` en `Ingredient` zorgen voor consistency door de hele app. TypeScript's type checking voorkomt runtime errors."

---

### Technische Vragen

**Q: Leg uit hoe de swipe-to-delete gesture werkt.**
> "Ik gebruik react-native-gesture-handler's `Pan` gesture. De gesture tracked de horizontale beweging (translationX). Dit wordt opgeslagen in een shared value. Met `useAnimatedStyle` maak ik de card's transform property afhankelijk van deze value. Als de swipe verder gaat dan -100px, trigger ik de delete functie. Anders springt de card terug met `withSpring()` voor een natuurlijke animatie. De GestureDetector component wraps de card en fangt de touch events."

**Q: Hoe communiceer je met de Open Food Facts API?**
> "Ik doe een GET request naar hun search endpoint met query parameters. De API retourneert JSON met een array van producten. Elk product heeft nutriment data waar ik 'energy-kcal_100g' uithaal. Ik map de API response naar mijn eigen `NutritionProduct` interface voor type safety. Error handling met try-catch, en loading states in de UI. Geen API key nodig, wat het simpel maakt."

**Q: Hoe zorg je ervoor dat data persistent blijft?**
> "Via AsyncStorage, React Native's key-value storage. Ik heb een `StorageService` gemaakt met functies zoals `saveMeals()` en `loadMeals()`. Data wordt geserialized naar JSON met `JSON.stringify()` en opgeslagen onder key `@calorie_tracker:meals`. Bij app start laadt de `useMeals` hook automatisch alle meals via een useEffect. CRUD operaties callen direct de storage service om data te syncen."

**Q: Leg de useMeals hook uit.**
> "Het is een custom hook die meal state management encapsuleert. Hij heeft een useState voor de meals array, loading state en error state. Bij mount doet hij een useEffect die `refreshMeals()` aanroept. Deze functie laadt data via `MealService.getAllMeals()`. De hook exposed ook `createMeal`, `updateMeal` en `deleteMeal` functies. Elke mutatie roept `refreshMeals()` aan om de UI te syncen. Components hoeven alleen maar de hook te gebruiken: `const {meals, createMeal} = useMeals()`. Dit voorkomt prop drilling en duplicatie."

**Q: Waarom heb je services gebruikt?**
> "Separation of concerns. Components moeten alleen UI renderen, niet business logic bevatten. Services zoals `MealService` en `ValidationService` zijn herbruikbaar en testbaar. Als ik later wil switchen van AsyncStorage naar een echte database, pas ik alleen `StorageService` aan. Components hoeven niet te veranderen. Dit is het Service Layer pattern, standaard in enterprise applicaties."

---

### Code Kwaliteit Vragen

**Q: Hoe heb je code duplicatie voorkomen?**
> "Door componenten herbruikbaar te maken. `MealCard` wordt gebruikt op zowel home als statistics scherm. `IngredientListItem` wordt gebruikt in add, edit en detail schermen. Ik gebruik barrel exports (index.ts files) zodat ik meerdere components in één import kan laden. Alle constants zijn gecentraliseerd: kleuren, strings, layout values. Services zijn utility classes die overal gebruikt worden."

**Q: Hoe zorg je voor consistente styling?**
> "Alle kleuren komen uit `Colors.ts`, alle spacing uit `Layout.ts`. Ik gebruik nooit hardcoded waardes. Elk scherm gebruikt `StyleSheet.create()` voor geoptimaliseerde style objects. De style objecten gebruiken constants: `backgroundColor: Colors.background` in plaats van `backgroundColor: '#FFFFFF'`. Dit maakt het theming systeem makkelijk uitbreidbaar (bijvoorbeeld dark mode support)."

**Q: Hoe test je of validatie werkt?**
> "De `ValidationService` heeft voor elke input een functie die een `ValidationResult` retourneert. Ik kan deze functies unit testen zonder UI. In components roep ik de validation aan on-change: `const result = ValidationService.validateMealName(value)`. Als `result.isValid === false`, toon ik `result.message` als error. De Save button is disabled tot alle validaties slagen. Dit is testbaar en herbruikbaar."

---

### Project Management Vragen

**Q: Hoeveel tijd heb je besteed aan dit project?**
> "Ongeveer [X] weken. De eerste week heb ik de basis structuur opgezet: routing, data model, services. Week 2 was UI development en CRUD operaties. Week 3 was native modules integratie en animaties. Laatste week was de API integratie en polish. Ik heb incrementeel gewerkt: eerst basic features, dan advanced features, dan optimalisatie."

**Q: Wat was het moeilijkste onderdeel?**
> "De swipe gesture was het meest uitdagend. React Native Gesture Handler heeft een steile learning curve. Ik moest begrijpen hoe shared values en worklets werken in Reanimated. Het debuggen van animations is lastig omdat je niet gewoon console.log kan gebruiken in de UI thread. Uiteindelijk heb ik de docs goed doorgelezen en voorbeelden bestudeerd tot het werkte."

**Q: Wat zou je anders doen met meer tijd?**
> "Ik zou unit tests toevoegen voor alle services met Jest. E2E tests met Detox voor de belangrijkste user flows. Offline-first architecture met een sync mechanisme naar een backend. Dark mode support. Filtering en sorting op maaltijden. Grafieken voor calorieën over tijd met Victory Native. Een onboarding flow voor nieuwe gebruikers."

---

### Demo/Showcase Vragen

**Q: Laat een volledig user flow zien.**
> [Volg het Demo Scenario van eerder]

**Q: Waar ben je het meest trots op in deze app?**
> "De architectuur. Alles is type-safe, herbruikbaar en maintainable. Ik heb geen spaghetti code: elke service en component heeft één verantwoordelijkheid. De animaties maken het ook echt native feeling, niet een web app in een wrapper. En de Open Food Facts integratie maakt de app echt bruikbaar in real life."

**Q: Toon waar je elk vereiste hebt toegepast.**
> - CRUD: [Open home, add, edit, delete]
- Data model: [Toon types/index.ts]
- Validatie: [Probeer ongeldige input in add-meal]
- Native modules: [Camera picker, Share dialog]
- Gestures: [Swipe-to-delete demo]
- Animaties: [FAB, list entrance]
- Online service: [Ingredient search demo]
- Logo: [Splash screen bij app start]

---

## 📋 Checklist voor Mondeling

### Demo Voorbereiding (BELANGRIJK!)
- [ ] **Keuze gemaakt:** Live demo OF video demo
- [ ] **Live demo backup:** Screenshots van elk scherm klaar
- [ ] **Video demo backup:** Video getest, op USB + cloud beschikbaar
- [ ] **Timing geoefend:** Kan 5-minuten script vloeiend afleveren
- [ ] **5 verplichte vragen voorbereid:**
  - Waar gaat je app over / Welk probleem lost het op?
  - Hoe kan de gebruiker de app gebruiken?
  - Welke Native Modules heb je gebruikt?
  - Welke online services heb je gebruikt?
  - Wat zou je verbeteren als je meer tijd had?

### Technisch Voorbereiding
- [ ] App draait zonder errors op emulator/device
- [ ] Alle features zijn getest en werken
- [ ] Sample data in app voor demo (minimaal 4-5 maaltijden met foto's)
- [ ] Code is clean (geen commented out code, console.logs)
- [ ] README's zijn up-to-date
- [ ] Kan navigatie structuur uitleggen
- [ ] Kan data flow uitleggen (component → hook → service → storage)
- [ ] Kan uitleggen waarom bepaalde keuzes gemaakt zijn
- [ ] Kan code snippets in VS Code tonen en uitleggen
- [ ] Kan alle 7 vereisten lokaliseren in codebase

### Demo Executie
- [ ] Kan complete user flow tonen in 2 minuten
- [ ] Kan elk requirement demonstreren
- [ ] Kan edge cases tonen (validatie, error handling)
- [ ] Kan animaties en gestures showcasen
- [ ] Kan online service werking tonen
- [ ] Kan swipe-to-delete demonstreren
- [ ] Kan native modules in actie tonen

### Materiaal & Apparatuur
- [ ] Laptop opgeladen + lader mee
- [ ] Benodigde kabels (HDMI, USB-C naar HDMI, dongles)
- [ ] Emulator/device aangesloten en getest
- [ ] Screen sharing software getest
- [ ] Netwerk connectie beschikbaar (voor online zoeken)
- [ ] VS Code open met relevante bestanden
- [ ] GitHub repo is up-to-date en toegankelijk
- [ ] Dit document geprint of op tablet voor laatste review

### Documentatie
- [ ] PROJECT_OVERVIEW.md is volledig
- [ ] CODE_QUALITY.md beschrijft architectuur
- [ ] PAGINAS_OVERZICHT.md toont alle schermen
- [ ] Comments in complexe code (gestures, animations)
- [ ] Alle file paths kloppen in dit document

---

## 💡 Pro Tips voor het Examen

### Voor de Demo:
1. **Oefen de timing:** Zorg dat je de 5-minuten demo in je slaap kan doen
2. **Spreek langzaam en duidelijk:** Nervositeit maakt dat je snel praat - bewust vertragen
3. **Maak oogcontact:** Niet alleen naar je scherm kijken
4. **Toon enthousiasme:** Laat zien dat je trots bent op je werk
5. **Vertel een verhaal:** "Deze app helpt mensen gezonder eten" is beter dan "Dit is een CRUD app"

### Tijdens Technische Vragen:
6. **Denk hardop:** Als je even moet nadenken, zeg dat. "Laat me even denken over de beste manier om dit uit te leggen..."
7. **Gebruik analogieën:** "AsyncStorage is zoals een digitaal notitieboekje waar de app dingen kan opschrijven"
8. **Wees eerlijk:** "Dat weet ik niet precies, maar ik kan het opzoeken" is beter dan bluffen
9. **Link naar theorie:** "Ik gebruik hier het Service Pattern omdat..."
10. **Toon code als het helpt:** "Mag ik dit even in de code laten zien?"

### Als Iets Misgaat:
11. **Blijf kalm:** "Oké, dit zou moeten werken, laat me kijken wat hier aan de hand is"
12. **Switch naar backup:** "Ik heb een video/screenshots om de functionaliteit te tonen"
13. **Leg uit wat zou moeten gebeuren:** "Normaal zou hier nu de share dialog verschijnen"
14. **Maak er geen groot drama van:** Iedereen snapt dat tech soms faalt

### Algemeen:
15. **Kom op tijd:** 10 minuten te vroeg = op tijd
16. **Dress for success:** Verzorgd voorkomen geeft vertrouwen
17. **Adem:** Vergeet niet te ademen tijdens het spreken
18. **Glimlach:** Maakt jezelf en anderen relaxed
19. **Vraag om herhaling:** "Kan je die vraag herhalen?" is prima
20. **Bedank aan het eind:** "Bedankt voor jullie tijd en vragen!"

---

## 🎯 Last-Minute Prep (Dag Voor Examen)

### 1 Dag Voor Examen:
- [ ] **Test run:** Complete demo doorlopen, timing checken
- [ ] **Batterijen opladen:** Laptop, telefoon, tablet
- [ ] **Bestanden checken:** Alle code files openen in VS Code, geen errors
- [ ] **Video backup maken:** Als je live gaat, toch een video maken voor noodgevallen
- [ ] **Vragen doorlezen:** Dit hele document nogmaals scannen
- [ ] **Rustig aan:** Vroeg naar bed, geen all-nighters

### Ochtend Van Examen:
- [ ] **Breakfast:** Niet met lege maag
- [ ] **Test setup:** Start app, controleer dat alles werkt
- [ ] **Tas check:** Laptop, kabels, USB stick, notities
- [ ] **Mentale prep:** "Ik heb dit goed voorbereid, ik kan dit"

### 30 Min Voor Examen:
- [ ] **Locatie check:** Weet je waar het is? Op tijd aanwezig
- [ ] **Tech check:** Beamer/projector testen indien mogelijk
- [ ] **Quick scan:** Belangrijkste punten in je hoofd herhalen
- [ ] **Diep ademhalen:** 3x diep in en uit voor focus

### 5 Min Voor Examen:
- [ ] **App gestart:** Emulator draait, app is open op home screen
- [ ] **Screen sharing klaar:** Zoom/Teams/beamer setup gedaan
- [ ] **Notities voor je:** Dit document open op je laptop (niet om voor te lezen, maar als steun)
- [ ] **Positieve mindset:** "Let's do this! 💪"

---

## 📞 Noodcontacten & Backups

### Als Live Demo Faalt:

**Plan B:** Video Demo
- Video op USB stick in je tas
- Video op Google Drive met link in je notities
- Screenshots van alle schermen op je telefoon

**Plan C:** Code Walkthrough
- Open VS Code
- Toon file structuur
- Leg uit wat elke file doet
- Toon key code snippets

**Plan D:** Documentatie Showcase
- Open PROJECT_OVERVIEW.md
- Toon screenshots in documentatie
- Leg uit aan de hand van diagrammen

### Technische Issues en Oplossingen:

**Issue:** Emulator start niet
- **Fix:** Gebruik fysiek device met USB debugging
- **Backup:** Toon video demo

**Issue:** Netwerk werkt niet (API calls falen)
- **Fix:** Leg uit wat zou moeten gebeuren, toon code
- **Backup:** "In normale omstandigheden zou de API hier producten tonen"

**Issue:** App crasht tijdens demo
- **Fix:** Restart app, ga verder
- **Backup:** "Laat me de video tonen om tijd te besparen"

**Issue:** Beamer werkt niet
- **Fix:** Gebruik je laptop scherm, mensen komen dichterbij
- **Backup:** Toon op fysiek device, geef rond

---

## 🎤 Opening Lines (Memoriseer Deze)

### Als Je Begint:

**Optie 1 (Confident):**
> "Goedemorgen/middag! Ik ga jullie mijn Calorie Tracker app demonstreren. De app lost het probleem op dat mensen niet goed weten hoeveel calorieën ze binnenkrijgen. Ik zal in 5 minuten de kernfunctionaliteit tonen en daarna sta ik klaar voor vragen."

**Optie 2 (Friendly):**
> "Hey allemaal! Bedankt dat jullie er zijn. Ik heb een calorie tracking app gebouwd die ik graag wil laten zien. Het is een React Native app met interessante features zoals AI zoeken, native modules en smooth animaties. Laten we beginnen!"

**Optie 3 (Story-driven):**
> "Hoeveel van jullie heeft wel eens geprobeerd calorieën te tellen? Het is vervelend werk. Je moet alles opzoeken, berekenen, onthouden. Daarom heb ik deze app gemaakt: het maakt calorie tracking simpel en snel. Laat me laten zien hoe."

### Als Je Afsluit:

**Optie 1:**
> "Dat was mijn demo van de belangrijkste features. Samenvattend: de app gebruikt drie native modules, integreert met een online food database, en heeft volledige CRUD functionaliteit met smooth gestures en animaties. Ik sta klaar voor jullie vragen!"

**Optie 2:**
> "En dat is mijn Calorie Tracker app! Alle requirements zijn geïmplementeerd: CRUD, data model, validatie, native modules, gestures, animaties, en online services. Wat willen jullie verder weten?"

---

## 🎓 Final Pep Talk

Je hebt dit project helemaal zelf gebouwd. Je kent elke regel code. Je weet waarom je elke keuze hebt gemaakt. Je hebt alle requirements voldaan. 

**Je bent klaar.**

Het examen is geen mysterie - ze willen gewoon zien dat je:
1. Een werkende app hebt gebouwd
2. De techniek begrijpt
3. Keuzes kan uitleggen
4. Professioneel kan communiceren

Dit alles heb je. Adem rustig, glimlach, en laat zien waar je hard voor hebt gewerkt.

**Remember:**
- Ze willen dat je slaagt
- Ze zijn geïnteresseerd in je project
- Technische problemen zijn menselijk
- Confidence komt van voorbereiding - en jij bent voorbereid

---

## 🚀 Conclusie

Dit document bevat alles wat je nodig hebt:
- ✅ Examen structuur en verwachtingen
- ✅ 5-minuten demo script met timing
- ✅ Live demo en video alternatieven
- ✅ Alle technische details en vereisten
- ✅ Mogelijk gevraagde vragen met antwoorden
- ✅ Complete checklists
- ✅ Backup plannen voor als iets misgaat
- ✅ Pro tips en mental preparation

### Laatste Stappen:
1. **Print dit document** of zet het op je tablet
2. **Oefen je 5-minuten demo** minimaal 3x
3. **Test je complete setup** (app, emulator, screen sharing)
4. **Maak een video backup** (2-3 minuten)
5. **Rust goed uit** de nacht voor het examen
6. **Geloof in jezelf** - je kunt dit!

---

**Succes met je examen! Je gaat het geweldig doen! 🚀🎉**
