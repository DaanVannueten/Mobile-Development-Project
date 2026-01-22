import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Colors } from '../constants/Colors'
import { Strings } from '../constants/Strings'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShown: false,
        }}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen
          name="add-meal"
          options={{
            title: Strings.app.addMealTitle,
            presentation: 'modal',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="edit-meal"
          options={{
            title: 'Maaltijd bewerken',
            presentation: 'modal',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="meal-detail"
          options={{
            title: Strings.app.mealDetailTitle,
            presentation: 'card',
            headerShown: true,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  )
}
