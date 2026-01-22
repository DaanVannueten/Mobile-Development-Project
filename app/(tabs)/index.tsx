import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { type FunctionComponent, useCallback, useState } from 'react'
import { FlatList, type ListRenderItemInfo, RefreshControl, StyleSheet, View } from 'react-native'
import Animated, { FadeInDown, FadeOutUp, Layout } from 'react-native-reanimated'
import { AnimatedFAB, EmptyState, SwipeableMealCard } from '../../components'
import { Colors } from '../../constants/Colors'
import { useMeals } from '../../hooks/useMeals'
import type { Meal } from '../../types'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Meal>)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
})

const Index: FunctionComponent = () => {
  const router = useRouter()
  const {meals, deleteMeal, refreshMeals} = useMeals()
  const [refreshing, setRefreshing] = useState(false)

  const handleAddMeal = (): void => {
    router.push('/add-meal')
  }

  const handleMealPress = (meal: Meal): void => {
    router.push(`/meal-detail?id=${meal.id}`)
  }

  const handleMealEdit = (meal: Meal): void => {
    router.push(`/edit-meal?id=${meal.id}`)
  }

  const handleMealDelete = async (meal: Meal): Promise<void> => {
    await deleteMeal(meal.id)
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refreshMeals()
    setRefreshing(false)
  }, [refreshMeals])

  const renderMealItem = ({item, index}: ListRenderItemInfo<Meal>) => (
    <Animated.View
      entering={FadeInDown.delay(index * 50).springify()}
      exiting={FadeOutUp.springify()}
      layout={Layout.springify()}>
      <SwipeableMealCard
        meal={item}
        onPress={handleMealPress}
        onEdit={handleMealEdit}
        onDelete={handleMealDelete}
      />
    </Animated.View>
  )

  const renderEmptyState = () => <EmptyState />

  return (
    <>
      <View style={styles.container}>
        <AnimatedFlatList
          data={meals}
          renderItem={renderMealItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={renderEmptyState}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />}
          itemLayoutAnimation={Layout.springify()}
        />

        <AnimatedFAB onPress={handleAddMeal} />

        <StatusBar style="auto" />
      </View>
    </>
  )
}

export default Index
