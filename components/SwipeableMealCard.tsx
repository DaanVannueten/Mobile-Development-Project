import { Ionicons } from '@expo/vector-icons'
import { type FunctionComponent } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated'
import { Colors } from '../constants/Colors'
import { FontSizes, IconSizes, Spacing } from '../constants/Layout'
import { MealService } from '../services/MealService'
import type { Meal } from '../types'

interface SwipeableMealCardProps {
  meal: Meal
  onPress?: (meal: Meal) => void
  onDelete?: (meal: Meal) => void
  onEdit?: (meal: Meal) => void
}

const SWIPE_THRESHOLD = -100
const LONG_PRESS_DURATION = 500

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  mealItem: {
    flexDirection: 'row',
    padding: Spacing.lg,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  mealImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.inputBackground,
    marginRight: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  mealName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: 4,
  },
  mealCalories: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  hiddenActions: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
  },
  editButton: {
    backgroundColor: Colors.primary,
  },
  actionText: {
    color: 'white',
    fontSize: FontSizes.xs,
    marginTop: 4,
    fontWeight: '600',
  },
})

export const SwipeableMealCard: FunctionComponent<SwipeableMealCardProps> = ({
  meal,
  onPress,
  onDelete,
  onEdit,
}) => {
  const translateX = useSharedValue(0)
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  const handleDelete = () => {
    if (!onDelete) return

    Alert.alert('Maaltijd verwijderen', `Weet je zeker dat je "${meal.name}" wilt verwijderen?`, [
      {
        text: 'Annuleren',
        style: 'cancel',
        onPress: () => {
          translateX.value = withSpring(0)
        },
      },
      {
        text: 'Verwijderen',
        style: 'destructive',
        onPress: () => {
          // Just call delete directly without complex animation
          onDelete(meal)
        },
      },
    ])
  }

  const handleEdit = () => {
    if (!onEdit) return
    translateX.value = withSpring(0)
    onEdit(meal)
  }

  // Pan gesture for swipe
  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate(event => {
      // Only allow swipe to the left
      if (event.translationX < 0) {
        translateX.value = event.translationX
      }
    })
    .onEnd(event => {
      if (event.translationX < SWIPE_THRESHOLD) {
        // Swipe threshold reached, show actions
        translateX.value = withSpring(-160)
      } else {
        // Reset to original position
        translateX.value = withSpring(0)
      }
    })

  // Long press gesture for quick edit
  const longPressGesture = Gesture.LongPress()
    .minDuration(LONG_PRESS_DURATION)
    .onStart(() => {
      // Scale animation on long press
      scale.value = withSpring(0.95)
    })
    .onEnd(() => {
      scale.value = withSpring(1)
      if (onEdit) {
        runOnJS(onEdit)(meal)
      }
    })
    .onTouchesUp(() => {
      scale.value = withSpring(1)
    })

  // Tap gesture for normal press
  const tapGesture = Gesture.Tap()
    .maxDistance(10)
    .onEnd(() => {
      if (onPress) {
        runOnJS(onPress)(meal)
      }
    })

  // Combine gestures - tap and longpress are exclusive, but both can work with pan
  const composedGesture = Gesture.Race(panGesture, Gesture.Exclusive(longPressGesture, tapGesture))

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {scale: scale.value}],
    opacity: opacity.value,
  }))

  return (
    <View style={styles.container}>
      {/* Hidden action buttons */}
      <View style={styles.hiddenActions}>
        <Pressable style={[styles.actionButton, styles.editButton]} onPress={handleEdit}>
          <Ionicons name="create-outline" size={IconSizes.md} color="white" />
          <Text style={styles.actionText}>Bewerken</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={IconSizes.md} color="white" />
          <Text style={styles.actionText}>Verwijderen</Text>
        </Pressable>
      </View>

      {/* Swipeable card */}
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[animatedStyle]}>
          <View style={styles.mealItem}>
            <View style={styles.mealImage}>
              <Ionicons name="restaurant-outline" size={IconSizes.md} color={Colors.primary} />
            </View>
            <View style={styles.mealInfo}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={{marginLeft: Spacing.sm}}>{MealService.getRatingStars(meal.rating)}</Text>
              </View>
              <Text style={styles.mealCalories}>
                {MealService.getCategoryLabel(meal.category)} • {MealService.formatCalories(meal.totalCalories)} •{' '}
                {MealService.formatIngredientCount(meal.ingredients.length)}
              </Text>
              <Text style={{fontSize: FontSizes.xs, color: Colors.textSecondary, marginTop: 2}}>
                {MealService.formatDate(meal.date)} • {meal.time}
              </Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  )
}
