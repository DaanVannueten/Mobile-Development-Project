import { Ionicons } from '@expo/vector-icons'
import { type FunctionComponent } from 'react'
import { StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Colors } from '../constants/Colors'
import { IconSizes, Spacing } from '../constants/Layout'

interface AnimatedFABProps {
  onPress: () => void
  icon?: keyof typeof Ionicons.glyphMap
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: Spacing.xl,
    right: Spacing.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
})

export const AnimatedFAB: FunctionComponent<AnimatedFABProps> = ({onPress, icon = 'add'}) => {
  const scale = useSharedValue(1)
  const rotation = useSharedValue(0)

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.9)
      rotation.value = withSpring(90)
    })
    .onEnd(() => {
      scale.value = withSpring(1)
      rotation.value = withSpring(0)
      runOnJS(onPress)()
    })
    .onTouchesUp(() => {
      scale.value = withSpring(1)
      rotation.value = withSpring(0)
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}, {rotate: `${rotation.value}deg`}],
  }))

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[styles.fab, animatedStyle]}>
        <Ionicons name={icon} size={IconSizes.lg} color="white" />
      </Animated.View>
    </GestureDetector>
  )
}
