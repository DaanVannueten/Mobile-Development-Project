# 🍽️ Calorie Tracker App - Mondelinge Verdediging

Een complete mobiele applicatie voor het bijhouden van maaltijden en calorieën, ontwikkeld met React Native, Expo en TypeScript.

---

## 📱 Project Overzicht

### Wat is deze app?
De Calorie Tracker App is een mobiele applicatie waarmee gebruikers hun dagelijkse maaltijden kunnen registreren, inclusief ingrediënten en calorieën. De app biedt inzicht in voedingspatronen door middel van statistieken en maakt gebruik van een online voedingsdatabase voor gemakkelijke ingrediënt lookup.

### Belangrijkste Functionaliteiten
- ✅ **Maaltijden beheren**: Toevoegen, bekijken, bewerken en verwijderen van maaltijden
- ✅ **Ingrediënten tracking**: Bijhouden van individuele ingrediënten per maaltijd met exacte calorieën
- ✅ **Foto's toevoegen**: Camera of galerij gebruiken om foto's van maaltijden toe te voegen
- ✅ **Online zoeken**: Zoeken naar voedingsmiddelen in een wereldwijde database (Open Food Facts API)
- ✅ **Statistieken**: Inzicht in totale calorieën, gemiddeldes en meest gebruikte ingrediënten
- ✅ **Data exporteren**: Maaltijdgegevens exporteren en delen via het native share menu
- ✅ **Intuïtieve UI**: Smooth animaties en gestures voor een plezierige gebruikerservaring

---

## 🎯 Implementatie van Project Vereisten

### 1. CRUD Operaties (✅ Volledig geïmplementeerd)

De app bevat volledige CRUD (Create, Read, Update, Delete) functionaliteit voor **Meals (Maaltijden)** en **Ingredients (Ingrediënten)**:

#### **CREATE - Aanmaken**
- **Locatie**: `app/add-meal.tsx`
- **Functionaliteit**:
  - Formulier voor het toevoegen van nieuwe maaltijden
  - Dynamisch ingrediënten toevoegen/verwijderen
  - Foto uploaden via camera of galerij
  - Categorie selectie (Breakfast, Lunch, Dinner, Snack)
  - Notities en rating toevoegen
  - Data wordt opgeslagen in AsyncStorage via `MealService.createMeal()`

#### **READ - Lezen**
- **Locatie**: `app/(tabs)/index.tsx` (lijst) en `app/meal-detail.tsx` (detail)
- **Functionaliteit**:
  - FlatList toont alle opgeslagen maaltijden
  - Detail pagina toont alle 9+ attributen van een maaltijd
  - Filteren op categorie en datum (in statistics pagina)
  - Real-time laden van data uit AsyncStorage

#### **UPDATE - Bewerken**
- **Locatie**: `app/edit-meal.tsx`
- **Functionaliteit**:
  - Bestaande maaltijd wordt opgehaald op basis van ID
  - Alle velden zijn bewerkbaar (naam, ingrediënten, foto, categorie, etc.)
  - Wijzigingen worden opgeslagen via `MealService.updateMeal()`
  - Navigatie via "Edit" knop in detail pagina of long-press gesture op meal card

#### **DELETE - Verwijderen**
- **Locatie**: `components/SwipeableMealCard.tsx`
- **Functionaliteit**:
  - Swipe-to-delete gesture op maaltijd kaarten in de lijst
  - Delete knop in detail pagina
  - Bevestigingsdialoog voor permanente verwijdering
  - Data wordt verwijderd via `MealService.deleteMeal()`

---

### 2. Data Model (✅ Voldoet aan alle eisen)

#### **Meal Object** (9 attributen - ruim boven de vereiste 6)
```typescript
interface Meal {
  id: string              // 1. Unieke identifier
  name: string            // 2. Naam van de maaltijd
  category: MealCategory  // 3. Categorie (Breakfast/Lunch/Dinner/Snack)
  date: string            // 4. Datum van de maaltijd (ISO format)
  time: string            // 5. Tijdstip van de maaltijd
  notes?: string          // 6. Optionele notities
  rating?: number         // 7. Optionele rating (1-5 sterren)
  imageUri?: string       // 8. Foto van de maaltijd
  ingredients: Ingredient[] // 9. Array van ingrediënten
  totalCalories: number   // 10. Berekend totaal aantal calorieën
  createdAt: string       // 11. Aanmaakdatum
  updatedAt: string       // 12. Laatste wijziging datum
}
```

**Waar wordt dit getoond?**
- **Detail pagina** (`app/meal-detail.tsx`): Toont ALLE 9+ attributen
- **Edit pagina** (`app/edit-meal.tsx`): Alle velden zijn bewerkbaar
- **Lijst pagina** (`app/(tabs)/index.tsx`): Toont samenvatting (naam, calorieën, ingrediënt count)

#### **Ingredient Object** (5 attributen)
```typescript
interface Ingredient {
  id: string        // 1. Unieke identifier
  name: string      // 2. Naam van het ingrediënt
  calories: number  // 3. Calorieën per portie
  quantity: number  // 4. Hoeveelheid
  unit: string      // 5. Eenheid (g, ml, stuks, etc.)
}
```

**Relatie**: Elk `Meal` object bevat een array van `Ingredient` objecten, waardoor een één-op-veel relatie ontstaat.

---

### 3. Input Validatie (✅ Volledig geïmplementeerd)

**Locatie**: `services/ValidationService.ts`

De app heeft een uitgebreide validatie service die alle gebruikersinvoer controleert:

#### **Validatie Regels**
```typescript
// Voorbeelden van validatie regels:
- Maaltijd naam: minimum 2 karakters, maximum 50 karakters
- Ingrediënt naam: minimum 2 karakters, niet leeg
- Calorieën: moet een positief getal zijn, maximum 10.000
- Hoeveelheid: moet een positief getal zijn
- Datum: moet een geldige datum zijn, niet in de toekomst
- Rating: moet tussen 1 en 5 zijn (optioneel)
```

#### **Real-time Feedback**
- Validatie gebeurt tijdens het typen (onChange)
- Rode error messages verschijnen direct onder het veld
- Submit knop is disabled tot alle velden geldig zijn
- Specifieke error types via enum: `ValidationErrorType`

#### **Error Messages**
```typescript
enum ValidationErrorType {
  REQUIRED = 'Dit veld is verplicht',
  TOO_SHORT = 'Te kort',
  TOO_LONG = 'Te lang',
  INVALID_NUMBER = 'Ongeldig getal',
  NEGATIVE_NUMBER = 'Moet positief zijn',
  FUTURE_DATE = 'Datum mag niet in de toekomst liggen'
}
```

**Waar wordt dit gebruikt?**
- `app/add-meal.tsx`: Alle invoervelden worden gevalideerd
- `app/edit-meal.tsx`: Ook bij bewerken wordt validatie toegepast
- `components/IngredientsList.tsx`: Ingrediënt velden validatie

---

### 4. Native Modules (✅ 2+ geïmplementeerd)

#### **Native Module 1: expo-image-picker** 📷
**Wat is het?**
Een native module die toegang geeft tot de camera en foto galerij van het apparaat.

**Waar wordt het gebruikt?**
- `components/PhotoPicker.tsx`
- Gebruikers kunnen een foto maken of selecteren bij het toevoegen/bewerken van een maaltijd

**Hardware/OS functionaliteit:**
- **Camera**: Directe toegang tot de camera hardware om foto's te maken
- **Galerij**: Toegang tot de foto bibliotheek van het besturingssysteem
- **Permissions**: Vraagt automatisch de juiste permissies aan de gebruiker

**Implementatie:**
```typescript
import * as ImagePicker from 'expo-image-picker'

// Camera gebruiken
const result = await ImagePicker.launchCameraAsync({
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.8,
})

// Galerij gebruiken
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  quality: 0.8,
})
```

#### **Native Module 2: expo-sharing + expo-file-system** 📤
**Wat is het?**
Native modules voor het delen van bestanden via het native share menu en bestandssysteem toegang.

**Waar wordt het gebruikt?**
- `services/ExportService.ts`
- `app/(tabs)/statistics.tsx` (Export knop)

**Hardware/OS functionaliteit:**
- **Native Share Dialog**: Opent het systeem's eigen share menu (iOS Share Sheet / Android Share Dialog)
- **File System**: Toegang tot het bestandssysteem om JSON bestanden op te slaan
- **Cross-app Sharing**: Mogelijkheid om data te delen met andere apps (WhatsApp, Email, etc.)

**Implementatie:**
```typescript
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

// Data exporteren
const jsonString = JSON.stringify(meals, null, 2)
const fileUri = FileSystem.documentDirectory + 'meals-export.json'
await FileSystem.writeAsStringAsync(fileUri, jsonString)

// Native share dialog openen
await Sharing.shareAsync(fileUri, {
  mimeType: 'application/json',
  dialogTitle: 'Exporteer maaltijdgegevens',
})
```

**Praktisch gebruik:**
Gebruikers kunnen hun volledige maaltijdgeschiedenis exporteren naar JSON formaat en delen via WhatsApp, email, of opslaan in de cloud (Google Drive, iCloud, etc.).

---

### 5. Gestures & Animaties (✅ 4+ gestures, 5+ animaties)

#### **Gestures (Swipes, Taps, Long-press)**

##### **1. Swipe-to-Delete Gesture**
- **Locatie**: `components/SwipeableMealCard.tsx`
- **Type**: Pan Gesture (horizontaal swipen)
- **Functionaliteit**: 
  - Swipe naar links op een maaltijd kaart om te verwijderen
  - Visuele feedback tijdens swipen (rode achtergrond met trash icon)
  - Threshold van 120px voordat delete wordt geactiveerd
  - Smooth spring animatie terug naar originele positie als niet ver genoeg geswiped

```typescript
const panGesture = Gesture.Pan()
  .activeOffsetX([-10, 10])
  .onUpdate((event) => {
    translateX.value = Math.min(0, event.translationX) // Alleen naar links
  })
  .onEnd(() => {
    if (translateX.value < -120) { // Threshold bereikt
      runOnJS(onDelete)()
    } else {
      translateX.value = withSpring(0) // Terug naar positie
    }
  })
```

##### **2. Long-Press Gesture**
- **Locatie**: `components/SwipeableMealCard.tsx`
- **Type**: Long Press Gesture
- **Functionaliteit**: 
  - Houd een maaltijd kaart 500ms ingedrukt om snel te bewerken
  - Visuele feedback: scale animatie tijdens drukken
  - Navigeert direct naar edit pagina

##### **3. Tap Gesture op FAB**
- **Locatie**: `components/AnimatedFAB.tsx`
- **Type**: Tap Gesture
- **Functionaliteit**: 
  - Floating Action Button met tap gesture
  - Scale animatie (0.9x) tijdens tap
  - Rotatie animatie (90 graden) tijdens tap
  - Spring animatie terug naar originele staat

```typescript
const tapGesture = Gesture.Tap()
  .onBegin(() => {
    scale.value = withSpring(0.9)
    rotation.value = withSpring(90)
  })
  .onEnd(() => {
    scale.value = withSpring(1)
    rotation.value = withSpring(0)
  })
```

##### **4. Pull-to-Refresh Gesture**
- **Locatie**: `app/(tabs)/index.tsx`
- **Type**: Pull Gesture
- **Functionaliteit**: 
  - Trek de lijst naar beneden om te verversen
  - Laadt data opnieuw uit AsyncStorage
  - Native RefreshControl component met custom kleuren

#### **Animaties**

##### **1. Entrance Animaties (FadeInDown met Stagger)**
- **Locatie**: `app/(tabs)/index.tsx`
- **Type**: Entrance animatie met stagger effect
- **Functionaliteit**: 
  - Maaltijd kaarten faden in van boven naar beneden
  - Elke kaart heeft een delay van 50ms (stagger effect)
  - Gebruik van `springify()` voor natuurlijke beweging

```typescript
<Animated.View
  entering={FadeInDown.delay(index * 50).springify()}
>
  {/* Meal card content */}
</Animated.View>
```

##### **2. Exit Animaties (FadeOutUp)**
- **Locatie**: `app/(tabs)/index.tsx`
- **Type**: Exit animatie
- **Functionaliteit**: 
  - Maaltijd kaarten faden uit naar boven wanneer verwijderd
  - Spring animatie voor smooth effect

##### **3. Floating Action Button (FAB) Animaties**
- **Locatie**: `components/AnimatedFAB.tsx`
- **Type**: Scale & Rotation animaties
- **Functionaliteit**: 
  - Scale down (0.9x) bij tap
  - 90 graden rotatie bij tap
  - Spring animatie voor natuurlijke terugkeer

##### **4. Swipe Animatie**
- **Locatie**: `components/SwipeableMealCard.tsx`
- **Type**: TranslateX animatie
- **Functionaliteit**: 
  - Smooth horizontale beweging tijdens swipe
  - Rode achtergrond fade-in tijdens swipen
  - Spring animatie terug als threshold niet bereikt

##### **5. Layout Animatie**
- **Locatie**: Verschillende componenten
- **Type**: Layout animatie
- **Functionaliteit**: 
  - Smooth re-layout bij toevoegen/verwijderen van items
  - Automatische animatie van positie veranderingen

**Waarom deze keuzes?**
- **Gebruiksvriendelijkheid**: Gestures maken de app intuïtief (swipe to delete is een bekend patroon)
- **Visuele feedback**: Animaties geven duidelijke feedback over acties
- **Native feel**: App voelt aan als een native iOS/Android app
- **Performance**: Gebruik van `react-native-reanimated` voor 60fps animaties op de UI thread

---

### 6. Online Service (✅ Zinvol geïmplementeerd)

#### **Open Food Facts API** 🌐
**Wat is het?**
Open Food Facts is een vrije, open database van voedingsproducten van over de hele wereld. Het bevat meer dan 2 miljoen producten met voedingsinformatie.

**Website**: https://world.openfoodfacts.org/

**Waar wordt het gebruikt?**
- `services/NutritionApiService.ts`: API communicatie
- `components/IngredientSearch.tsx`: Zoek UI modal
- `app/add-meal.tsx` & `app/edit-meal.tsx`: "Search Online" knop

#### **Functionaliteit**
1. **Zoeken naar producten**: Gebruikers kunnen zoeken op productnaam (bijv. "appel", "melk", "kipfilet")
2. **Automatische data**: Naam en calorieën per 100g worden automatisch ingevuld
3. **Extra informatie**: Merknaam en productafbeelding worden ook opgehaald
4. **Real-time zoeken**: Resultaten verschijnen tijdens het typen

#### **API Implementatie**
```typescript
// API Call in NutritionApiService.ts
export async function searchProducts(query: string): Promise<NutritionProduct[]> {
  const searchParams = new URLSearchParams({
    search_terms: query.trim(),
    search_simple: '1',
    action: 'process',
    json: '1',
    page_size: '20',
    fields: 'code,product_name,brands,nutriments,image_url'
  })

  const url = `https://world.openfoodfacts.org/cgi/search.pl?${searchParams}`
  const response = await fetch(url)
  const data = await response.json()
  
  // Transform naar ons formaat
  return data.products.map(product => ({
    code: product.code,
    name: product.product_name,
    calories: product.nutriments['energy-kcal_100g'],
    brand: product.brands,
    imageUrl: product.image_url
  }))
}
```

#### **Gebruikersflow**
1. Gebruiker klikt op "Search Online" knop bij ingrediënten
2. Modal opent met zoekbalk
3. Gebruiker typt "banana" → API zoekt naar bananen
4. Resultaten tonen: "Chiquita Bananas", "Organic Banana", etc.
5. Gebruiker selecteert een product
6. Naam wordt ingevuld: "Banana"
7. Calorieën worden ingevuld: "89 kcal per 100g"
8. Gebruiker past quantity en unit aan (bijv. "150g")
9. Totale calorieën worden automatisch berekend: 89 * 1.5 = 133.5 kcal

#### **Waarom is dit zinvol?**
- ✅ **Tijdsbesparing**: Gebruikers hoeven niet handmatig calorieën op te zoeken
- ✅ **Accuraatheid**: Data komt uit een betrouwbare, gecrowdsourcede database
- ✅ **Gebruiksvriendelijkheid**: Eenvoudige zoekinterface met productafbeeldingen
- ✅ **Praktisch**: Werkt voor duizenden producten wereldwijd
- ✅ **Educatief**: Gebruikers leren over voedingswaarden van echte producten

**Alternatief gebruik**: Gebruikers kunnen nog steeds handmatig ingrediënten invoeren als ze een product niet kunnen vinden of zelf bereid voedsel willen toevoegen.

---

### 7. Logo & Splash Screen (✅ Volledig custom)

#### **Aangepaste Assets**
Alle visuele assets zijn volledig zelf gemaakt en niet de standaard Expo templates:

**1. App Icon (512x512px)**
- Custom ontwerp met oranje achtergrond (#FF6B35)
- Fork en mes pictogram
- Adaptive icon voor Android (aparte foreground/background)
- **Locatie**: `assets/images/icon.png`

**2. Splash Screen (1284x2778px)**
- Volledige hoogte afbeelding voor verschillende schermformaten
- Branding consistent met app icon
- Oranje kleurenschema
- **Locatie**: `assets/images/splash-icon.png`

**3. Favicon (48x48px)**
- Voor web versie van de app
- **Locatie**: `assets/images/favicon.png`

#### **Generatie Proces**
De assets zijn **programmatisch gegenereerd** met een custom script:

**Locatie**: `scripts/generate-assets.js`

```javascript
// Gebruikt Sharp library voor image processing
const sharp = require('sharp')

// Genereert icon, splash screen en favicon
// Met specifieke kleuren, afmetingen en composities
```

**Voordelen van deze aanpak:**
- ✅ Consistentie: Alle assets gebruiken dezelfde kleuren en stijl
- ✅ Schaalbaarheid: Kan gemakkelijk aangepast worden voor verschillende resoluties
- ✅ Uniek: Geen standaard Expo assets of templates

#### **Configuratie**
In `app.json`:
```json
{
  "expo": {
    "icon": "./assets/images/icon.png",
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "backgroundColor": "#FF6B35"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#FF6B35"
      }
    }
  }
}
```

---

## 🏗️ Project Architectuur

### Folder Structuur
```
├── app/                          # Expo Router - Schermen
│   ├── _layout.tsx              # Root layout met tab navigatie
│   ├── index.tsx                # Redirect naar (tabs)
│   ├── add-meal.tsx             # Maaltijd toevoegen (modal)
│   ├── edit-meal.tsx            # Maaltijd bewerken (modal)
│   ├── meal-detail.tsx          # Maaltijd details (stack)
│   └── (tabs)/                  # Tab navigatie groep
│       ├── _layout.tsx          # Tab bar configuratie
│       ├── index.tsx            # Home - maaltijdenlijst
│       ├── statistics.tsx       # Statistieken & export
│       └── profile.tsx          # Profiel (placeholder)
│
├── components/                   # Herbruikbare UI componenten
│   ├── AnimatedFAB.tsx          # Floating Action Button met animaties
│   ├── SwipeableMealCard.tsx    # Meal card met swipe-to-delete
│   ├── MealCard.tsx             # Basis meal card component
│   ├── IngredientsList.tsx      # Lijst van ingrediënten
│   ├── IngredientListItem.tsx   # Enkel ingrediënt item
│   ├── IngredientSearch.tsx     # Online zoek modal
│   ├── PhotoPicker.tsx          # Camera/galerij picker
│   ├── EmptyState.tsx           # Empty state voor lege lijsten
│   └── index.ts                 # Barrel exports
│
├── services/                     # Business logic & data management
│   ├── MealService.ts           # CRUD operaties voor meals
│   ├── StorageService.ts        # AsyncStorage wrapper
│   ├── ValidationService.ts     # Input validatie logic
│   ├── NutritionApiService.ts   # Open Food Facts API
│   ├── ExportService.ts         # Data export & sharing
│   └── index.ts                 # Barrel exports
│
├── hooks/                        # Custom React hooks
│   └── useMeals.ts              # Meal state management hook
│
├── types/                        # TypeScript type definities
│   └── index.ts                 # Meal, Ingredient, Category interfaces
│
├── constants/                    # Constanten & configuratie
│   ├── Colors.ts                # Kleurenschema
│   ├── Layout.ts                # Spacing, font sizes, icon sizes
│   ├── Strings.ts               # UI teksten (geen hard-coded strings)
│   └── index.ts                 # Barrel exports
│
├── utils/                        # Utility functies
│   └── IdGenerator.ts           # UUID generatie
│
└── assets/                       # Statische bestanden
    └── images/                  # App icon, splash screen, etc.
```

### Design Patterns

#### **1. Service Layer Pattern**
Alle business logic is gescheiden van de UI in service classes:
- `MealService`: Maaltijd operaties (create, read, update, delete)
- `StorageService`: Data persistence (AsyncStorage wrapper)
- `ValidationService`: Input validatie met error types
- `NutritionApiService`: API communicatie
- `ExportService`: Data export functionaliteit

**Voordelen:**
- Testbaarheid: Services kunnen gemakkelijk unit tested worden
- Herbruikbaarheid: Services kunnen in meerdere componenten gebruikt worden
- Onderhoudbaarheid: Business logic op één plek

#### **2. Custom Hooks Pattern**
`useMeals()` hook encapsuleert alle meal state en operaties:
```typescript
const {meals, loading, error, addMeal, updateMeal, deleteMeal} = useMeals()
```

**Voordelen:**
- State management op één plek
- Gemakkelijk te gebruiken in componenten
- Automatische re-renders bij data wijzigingen

#### **3. Component Composition**
Complexe UI opgebroken in kleine, herbruikbare componenten:
- `MealCard` → basis card
- `SwipeableMealCard` → card + swipe functionaliteit
- `IngredientsList` → lijst van `IngredientListItem`

#### **4. Barrel Exports**
Index.ts files voor cleane imports:
```typescript
// In plaats van:
import {MealCard} from '../components/MealCard'
import {EmptyState} from '../components/EmptyState'

// Doen we:
import {MealCard, EmptyState} from '../components'
```

---

## 📋 Code Kwaliteit

### TypeScript
- ✅ **Strikte typing**: Alle variabelen en functies hebben expliciete types
- ✅ **Interfaces**: `Meal`, `Ingredient`, `MealCategory` interfaces
- ✅ **Enums**: `MealCategory`, `ValidationErrorType` voor type safety
- ✅ **Geen `any` types**: Overal correcte types gebruikt
- ✅ **Return types**: Expliciete return types op alle functies

**Voorbeeld:**
```typescript
export const addMeal = async (meal: Omit<Meal, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
  // ... implementation
}
```

### Naamgeving
- ✅ **Beschrijvende namen**: `handleMealPress`, `deleteMeal`, `ValidationService`
- ✅ **Consistente stijl**: 
  - PascalCase voor componenten/interfaces: `MealCard`, `Meal`
  - camelCase voor functies/variabelen: `addMeal`, `totalCalories`
  - UPPER_CASE voor constanten: `API_BASE_URL`
- ✅ **Enkelvoud/meervoud**: Correct gebruik (meal vs meals)

### Code Organisatie
- ✅ **Separation of Concerns**: UI, logic en data gescheiden
- ✅ **DRY (Don't Repeat Yourself)**: Herbruikbare componenten en services
- ✅ **Single Responsibility**: Elke functie/component heeft één doel
- ✅ **Geen hard-coded data**: Alle strings, kleuren en afmetingen in constants

### Linting & Formatting
- ✅ **ESLint**: Geconfigureerd en alle errors opgelost
- ✅ **Prettier**: Automatische code formatting
- ✅ **Config files**: 
  - `eslint.config.mjs`
  - `tsconfig.json` voor TypeScript configuratie

---

## 🚀 Installatie & Gebruik

### Vereisten
- **Node.js**: versie 18 of hoger
- **pnpm**: Package manager (of npm/yarn)
- **Expo Go app**: Voor testen op fysiek apparaat
- **Android Studio** (voor Android) of **Xcode** (voor iOS): Voor emulators

### Installatie Stappen

```bash
# 1. Clone de repository
git clone <repository-url>
cd md_DaanV

# 2. Installeer dependencies
pnpm install

# 3. Start de development server
pnpm start
```

### App Draaien

#### **Op Fysiek Apparaat (Aanbevolen voor testen)**
1. Download **Expo Go** app uit App Store (iOS) of Google Play (Android)
2. Scan de QR code in de terminal met je camera (iOS) of Expo Go app (Android)
3. App wordt automatisch geladen op je apparaat

#### **Op Android Emulator**
```bash
pnpm run android
```
Vereist Android Studio met een geconfigureerde emulator.

#### **Op iOS Simulator** (alleen macOS)
```bash
pnpm run ios
```
Vereist Xcode.

### Scripts

```bash
# Development server starten
pnpm start

# Android build & run
pnpm run android

# iOS build & run (alleen macOS)
pnpm run ios

# Code linting
pnpm run lint

# Auto-fix lint errors
pnpm run lint-fix

# Code formatting
pnpm run format
```

---

## 📦 Dependencies & Technologieën

### Core Framework
- **expo**: ~54.0.31 - Development platform
- **react-native**: 0.81.5 - Mobile framework
- **react**: 19.1.0 - UI library
- **typescript**: ~5.9.3 - Type safety

### Navigatie
- **expo-router**: ~6.0.21 - File-based routing
- **@react-navigation/native**: ^7.1.27 - Navigatie basis

### State Management & Storage
- **@react-native-async-storage/async-storage**: ^2.2.0 - Persistente data opslag

### Native Modules
- **expo-image-picker**: ~17.0.10 - Camera & galerij toegang
- **expo-sharing**: ~14.0.8 - Native share dialog
- **expo-file-system**: ~19.0.21 - Bestandssysteem toegang

### Gestures & Animaties
- **react-native-gesture-handler**: ^2.30.0 - Gesture detectie
- **react-native-reanimated**: ~4.1.6 - Performante animaties

### UI Components
- **@expo/vector-icons**: ^15.0.3 - Icon library (Ionicons)
- **@react-native-picker/picker**: ^2.11.4 - Native picker component

### Development Tools
- **eslint**: ^9.39.2 - Code linting
- **prettier**: ^3.7.4 - Code formatting
- **typescript-eslint**: ^8.53.0 - TypeScript linting
- **sharp**: ^0.34.5 - Image processing voor asset generatie

---

## 🎨 App Schermen & Gebruikersflow

### 1. Home Scherm (Maaltijdenlijst)
**Wat zie je:**
- Lijst van alle maaltijden, gesorteerd op datum (nieuwste eerst)
- Elke kaart toont: naam, calorieën, aantal ingrediënten, categorie icon
- Floating Action Button (+) rechts onderaan
- Empty state als er geen maaltijden zijn

**Wat kun je doen:**
- **Tap** op maaltijd → Ga naar detail pagina
- **Swipe** naar links op maaltijd → Verwijder maaltijd
- **Long-press** op maaltijd → Ga naar edit pagina
- **Pull down** → Refresh lijst
- **Tap op FAB** → Voeg nieuwe maaltijd toe

### 2. Maaltijd Toevoegen
**Wat zie je:**
- Formulier met alle velden voor een maaltijd
- Foto picker sectie (camera/galerij knoppen)
- Ingrediënten lijst met "Search Online" knop
- Real-time totaal calorieën weergave

**Wat kun je doen:**
- Vul naam, categorie, datum, tijd in
- Voeg foto toe via camera of galerij
- Voeg ingrediënten toe (handmatig of via online zoeken)
- Voeg notities en rating toe
- Sla maaltijd op (validatie vereist)

### 3. Online Zoeken (Ingredient Search)
**Wat zie je:**
- Modal met zoekbalk
- Lijst met zoekresultaten (productnaam, merk, afbeelding, calorieën)
- Loading indicator tijdens zoeken

**Wat kun je doen:**
- Type productnaam (bijv. "banana", "chicken breast")
- Bekijk resultaten uit Open Food Facts database
- Tap op product → Naam en calorieën worden automatisch ingevuld

### 4. Maaltijd Detail
**Wat zie je:**
- Alle details van de maaltijd (9+ attributen)
- Foto (als toegevoegd)
- Lijst van alle ingrediënten met hoeveelheden en calorieën
- Totaal calorieën
- Notities en rating
- Edit en Delete knoppen

**Wat kun je doen:**
- Bekijk alle informatie over de maaltijd
- Tap op "Edit" → Ga naar edit pagina
- Tap op "Delete" → Verwijder maaltijd (met bevestiging)

### 5. Statistieken
**Wat zie je:**
- Statistiek kaarten:
  - Totaal aantal maaltijden
  - Totaal aantal calorieën (alle tijd)
  - Gemiddeld aantal calorieën per maaltijd
- Top 5 meest gebruikte ingrediënten
- Recente maaltijden lijst
- Export knop

**Wat kun je doen:**
- Bekijk je voedingspatronen
- Zie welke ingrediënten je vaak gebruikt
- Tap op recente maaltijd → Ga naar detail
- **Export data** → Deel maaltijdgegevens als JSON bestand

### 6. Data Export & Sharing
**Wat gebeurt er:**
1. Gebruiker tikt op "Export Data" knop
2. App genereert JSON bestand met alle maaltijden
3. Native share dialog opent
4. Gebruiker kan kiezen: WhatsApp, Email, Google Drive, etc.
5. Bestand wordt gedeeld/opgeslagen

---

## 🎯 Samenvatting: Alle Vereisten

| Vereiste | Status | Implementatie |
|----------|--------|---------------|
| **CRUD operaties** | ✅ | Create (add-meal), Read (index, meal-detail), Update (edit-meal), Delete (swipe/detail) |
| **2+ attributen per object** | ✅ | Ingredient: 5 attributen, Meal: 9+ attributen |
| **6+ attributen op één pagina** | ✅ | Meal detail pagina toont 9+ attributen |
| **Input validatie** | ✅ | ValidationService met real-time feedback |
| **2+ native modules** | ✅ | expo-image-picker (camera/galerij), expo-sharing + file-system |
| **Hardware/OS functionaliteit** | ✅ | Camera hardware, native share dialog, file system |
| **1+ gesture** | ✅ | 4 gestures: swipe-to-delete, long-press, tap, pull-to-refresh |
| **1+ animatie** | ✅ | 5 animaties: FAB, entrance, exit, swipe, layout |
| **1+ online service** | ✅ | Open Food Facts API |
| **Zinvol gebruik online service** | ✅ | Automatisch ingrediënt data ophalen bespaart tijd en verhoogt accuraatheid |
| **Custom logo & splash** | ✅ | Programmatisch gegenereerd, volledig uniek design |
| **Persistentie** | ✅ | AsyncStorage - data blijft behouden na app herstart |
| **4 pagina's** | ✅ | Home, Statistics, Add Meal, Meal Detail (+ Edit Meal, Profile) |

---

## 📝 Tips voor Mondelinge Verdediging

### Belangrijkste Punten om te Benadrukken

#### 1. **CRUD Implementatie**
> "De app heeft volledige CRUD functionaliteit. Create gebeurt in add-meal.tsx, Read in de lijst en detail pagina's, Update via edit-meal.tsx, en Delete via swipe gesture of delete knop. Alle operaties gebruiken AsyncStorage voor data persistence."

#### 2. **Data Model Complexiteit**
> "Het Meal object heeft 9+ attributen, ruim meer dan de vereiste 6. Elk attribuut heeft een duidelijk doel: van basis info zoals naam en datum tot advanced features zoals rating en ingrediënten array. De detail pagina toont alle 9+ attributen tegelijk."

#### 3. **Native Modules Toegevoegde Waarde**
> "Ik gebruik expo-image-picker voor toegang tot camera en galerij hardware. Dit is essentieel omdat gebruikers foto's van hun maaltijden willen maken. De tweede native module is expo-sharing samen met file-system, waarmee gebruikers hun data kunnen exporteren via het native share menu - dit werkt met alle apps op het apparaat zoals WhatsApp, email, en cloud storage."

#### 4. **Gestures & Animaties UX**
> "Ik heb 4 gestures geïmplementeerd. De swipe-to-delete is het meest opvallend - gebruikers kunnen maaltijden verwijderen met een natuurlijke swipe beweging, wat veel intuïtiever is dan een delete knop. De animaties zijn niet alleen decoratief: entrance animaties met stagger effect zorgen dat de lijst niet overweldigend aanvoelt, en de FAB animatie geeft tactiele feedback."

#### 5. **Online Service Zinvol Gebruik**
> "De Open Food Facts API integratie bespaart gebruikers enorm veel tijd. In plaats van handmatig calorieën opzoeken op websites, kunnen ze direct in de app zoeken naar producten. Dit is niet alleen handiger, maar ook accurater omdat de data uit een betrouwbare database komt. Het zoeken werkt real-time en toont productafbeeldingen en merken."

#### 6. **Code Kwaliteit**
> "Alle code is strict getypeerd met TypeScript - geen any types. Ik gebruik het Service Layer pattern om business logic te scheiden van UI, wat de code testbaar en onderhoudbaar maakt. Alle strings en kleuren staan in constants bestanden, dus geen hard-coded data. ESLint en Prettier zorgen voor consistente code style."

### Mogelijke Vragen & Antwoorden

**Q: Waarom heb je voor deze native modules gekozen?**
> "Camera/galerij is essentieel voor een calorie tracker - mensen willen foto's van hun maaltijden. Sharing is belangrijk omdat gebruikers hun data kunnen exporteren voor back-up of om te delen met een diëtist."

**Q: Hoe heb je de validatie geïmplementeerd?**
> "Ik heb een ValidationService met specifieke validatie functies per veld type. Validatie gebeurt real-time tijdens typen, en error messages zijn duidelijk en specifiek. De submit knop blijft disabled tot alle velden geldig zijn."

**Q: Waarom AsyncStorage en niet een database?**
> "Voor deze app is AsyncStorage voldoende omdat de data structuur simpel is en de datasets niet enorm groot zijn. Het is ook sneller om mee te werken dan een volledige database setup, en perfect voor offline-first apps."

**Q: Wat was het moeilijkste onderdeel?**
> "De swipe-to-delete gesture correct implementeren met Reanimated v4 was een uitdaging. Je moet de UI thread en JS thread correct synchroniseren, en de animatie moet smooth aanvoelen met de juiste threshold values."

**Q: Hoe test je de app?**
> "Ik test op fysieke apparaten met Expo Go voor echte hardware testing (vooral belangrijk voor camera en gestures). Ook test ik op Android emulator voor verschillende schermformaten."

**Q: Leg uit hoe de API werkt**
> "De NutritionApiService maakt een GET request naar Open Food Facts met zoekparameters. De response bevat een array van producten met naam, merk, afbeelding en nutriments object. Ik filter alleen producten met geldige calorie data en transformeer ze naar mijn eigen NutritionProduct interface."

**Q: Hoe werkt de swipe gesture technisch?**
> "Ik gebruik Gesture.Pan() van react-native-gesture-handler. In onUpdate track ik de translateX waarde. In onEnd check ik of de threshold (-120px) bereikt is - zo ja, dan voer ik onDelete uit via runOnJS, anders animeer ik terug naar 0 met withSpring."

**Q: Waarom heb je Reanimated gebruikt?**
> "Reanimated draait animaties op de UI thread in plaats van de JS thread. Dit betekent 60fps animaties, zelfs als de JS thread bezig is met andere taken. Essentieel voor smooth swipe gestures en entrance animaties."

### Demo Flow Suggestie

1. **Start**: Open home scherm, laat lege state zien
2. **Create**: Klik FAB → voeg maaltijd toe → toon validatie → gebruik online zoeken → voeg foto toe
3. **Read**: Terug naar lijst → toon entrance animaties → open detail pagina
4. **Update**: Long-press op kaart → edit pagina → wijzig iets → sla op
5. **Delete**: Swipe gesture op kaart → laat animatie zien
6. **Statistieken**: Ga naar stats tab → export data → native share dialog
7. **Gestures**: Demonstreer pull-to-refresh, FAB animatie

---

## 👨‍💻 Auteur

**Daan V**  
Mobile Development Project 2026  
PIT Graduaten

---

## 🙏 Bronnen & Acknowledgments

- **Open Food Facts** - Voor de gratis voedingsdatabase API (https://world.openfoodfacts.org/)
- **Expo** - Voor het development platform (https://expo.dev/)
- **React Native Community** - Voor de uitstekende libraries en documentatie
- **React Native Reanimated** - Voor performante animaties
- **React Native Gesture Handler** - Voor gesture detectie
