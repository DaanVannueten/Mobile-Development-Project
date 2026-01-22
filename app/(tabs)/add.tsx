import {useRouter} from 'expo-router'
import {type FunctionComponent, useEffect} from 'react'
import {View} from 'react-native'

const Add: FunctionComponent = () => {
  const router = useRouter()

  useEffect(() => {
    // Navigate to add-meal modal immediately
    router.push('/add-meal')
  }, [router])

  return <View />
}

export default Add
