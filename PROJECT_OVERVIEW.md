# BIJ DIT PROJECT GEBRUIK IK NPM RUN ANDROID OMDAT PNPM NIET WERKT BIJ  MIJ

# Calorie Tracker - Mobile Development Projectgit

## 📱 Overzicht
Een complete React Native calorie tracking applicatie gebouwd met Expo en TypeScript.

## ✅ Geïmplementeerde Vereisten

### 1. CRUD Operaties
- **Create**: Nieuwe maaltijden toevoegen met volledige formulier validatie
- **Read**: Maaltijden bekijken in lijst en detailweergave, filteren per categorie/datum
- **Update**: Bestaande maaltijden bewerken
- **Delete**: Maaltijden verwijderen (swipe-to-delete of via detail pagina)

### 2. Data Model
**Meal Object (9 attributen):**
- `id`, `name`, `category`, `date`, `time`, `notes`, `rating`, `imageUri`, `ingredients`, `totalCalories`, `createdAt`, `updatedAt`

**Ingredient Object (5 attributen):**
- `id`, `name`, `calories`, `quantity`, `unit`

### 3. Validatie
- Alle velden worden gevalideerd bij invoer
- Real-time feedback met duidelijke error messages
- ValidationService met specifieke validatie regels per veld

### 4. Native Modules (3)
**Module 1: expo-image-picker**
- Hardware: Camera & Galerij toegang
- Functionaliteit: Foto's maken of selecteren voor maaltijden

**Module 2: expo-sharing + expo-file-system**
- OS functionaliteit: Native share dialog
- Functionaliteit: Exporteren en delen van maaltijdgegevens en statistieken

**Module 3: expo-notifications**
- OS functionaliteit: Push notifications systeem
- Functionaliteit: Notificaties plannen op maaltijd tijden
- Permissions: Vraagt om notificatie toegang
- Gebruikers krijgen reminder op maaltijd moment

### 5. Gestures & Animaties
**Gestures:**
- Swipe-to-delete op maaltijd kaarten (pan gesture)
- Long-press om snel te bewerken (long-press gesture)
- Tap gesture op Animated FAB
- Pull-to-refresh op home screen

**Animaties:**
- Animated FAB met scale en rotatie
- Entrance animations (FadeInDown met stagger)
- Exit animations (FadeOutUp)
- Smooth swipe animatie met threshold feedback

### 6. Online Service
**Open Food Facts API Integratie:**
- Zoeken naar ingrediënten in wereldwijde voedingsdatabase
- Automatisch ophalen van caloriegegevens per 100g
- Real-time product zoeken met afbeeldingen en merkinformatie
- Zinvol gebruik: Gebruikers kunnen echte producten zoeken in plaats van handmatige invoer

**Hoe te gebruiken:**
1. Ga naar "Add Meal" of bewerk een bestaande maaltijd
2. Klik op "Search Online" knop in ingrediënten sectie
3. Zoek naar een voedingsmiddel (bijv. "appel", "kipfilet", "melk")
4. Selecteer een product uit de resultaten
5. Naam en calorieën worden automatisch ingevuld!

### 7. Logo & Splash Screen
**Aangepaste Assets:**
- Custom app icon (512x512) - Oranje achtergrond met fork/knife design
- Adaptive icon voor Android
- Splash screen (1284x2778) met branding
- Favicon (48x48)
- Kleurenschema: #FF6B35 (primary orange)

**Generatie:**
- Programmatisch gegenereerd met Sharp
- Script: `scripts/generate-assets.js`
- Volledig uniek design, geen standaard Expo assets

## 🏗️ Project Structuur

```
app/                    # Expo Router paginas
  (tabs)/              # Tab navigation
    index.tsx          # Home - maaltijdenlijst
    statistics.tsx     # Statistieken & export
    profile.tsx        # Profiel
  add-meal.tsx         # Maaltijd toevoegen
  edit-meal.tsx        # Maaltijd bewerken
  meal-detail.tsx      # Maaltijd details

components/            # Herbruikbare componenten
  AnimatedFAB.tsx     # Floating action button met animaties
  SwipeableMealCard.tsx # Swipeable kaart met gestures
  IngredientSearch.tsx  # Online zoek modal
  PhotoPicker.tsx      # Camera/galerij picker
  IngredientsList.tsx  # Ingrediënten lijst

services/             # Business logic
  CalendarService.ts  # Calendar integratie
  MealService.ts      # CRUD operaties
  StorageService.ts   # AsyncStorage persistentie
  ValidationService.ts # Input validatie
  NutritionApiService.ts # Open Food Facts API
  ExportService.ts    # Data export & sharing

hooks/                # Custom React hooks
  useMeals.ts        # Meals state management

types/                # TypeScript interfaces
  index.ts           # Meal, Ingredient, Category types
```

## 🚀 Installatie & Gebruik

```bash
# Installeer dependencies
npm install

# Start development server
npm start

# Run op Android
npm run android

# Run op iOS  
npm run ios
```

## 📦 Dependencies

**Core:**
- expo ~54.0.31
- react-native 0.81.5
- expo-router ~6.0.21

**Native Modules:**
- expo-image-picker ~17.0.10
- expo-sharing ~14.0.8
- expo-file-system ~19.0.21
- expo-notifications ~0.30.4

**Gestures & Animations:**
- react-native-gesture-handler ^2.30.0
- react-native-reanimated ~4.1.6

**Storage:**
- @react-native-async-storage/async-storage ^2.2.0

## 🎨 Features

- ✅ Volledig type-safe met TypeScript
- ✅ File-based routing met Expo Router
- ✅ Persistente data opslag met AsyncStorage
- ✅ Real-time validatie met feedback
- ✅ Responsive UI design
- ✅ Dark mode support
- ✅ Camera & galerij integratie
- ✅ Notificatie reminders (maaltijden plannen)
- ✅ Data export & sharing
- ✅ Online ingredient zoeken
- ✅ Smooth animaties & gestures
- ✅ Pull-to-refresh
- ✅ Custom logo & splash screen

## 📝 Code Kwaliteit

- ESLint configuratie
- Prettier formatting
- Strikte TypeScript types
- Gestructureerde service layers
- Herbruikbare componenten
- Duidelijke naamgeving

## 🎯 Voldoet aan alle requirements

✅ CRUD operaties voor meerdere objecten  
✅ 2+ attributen per object (Ingredient: 5, Meal: 9)  
✅ 6+ attributen op minimaal één pagina (Meal: 9 attributen)  
✅ Input validatie bij data invoer  
✅ 3 native modules (camera + sharing + calendar)  
✅ Hardware/OS functionaliteit gebruikt  
✅ 1+ gesture (4 geïmplementeerd: swipe, long-press, tap, pull)  
✅ 1+ animatie (5 geïmplementeerd: FAB, entrance, exit, swipe, scale)  
✅ 1+ online service (Open Food Facts API)  
✅ Zinvol gebruik van online service (ingredient data ophalen)  
✅ Custom logo & splash screen  

## 👨‍💻 Auteur

Daan V - Mobile Development Project 2026
