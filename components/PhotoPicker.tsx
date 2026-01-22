import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import type { FunctionComponent } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../constants/Colors'
import { FontSizes, IconSizes, Spacing } from '../constants/Layout'

interface PhotoPickerProps {
  onPhotoSelect: (uri: string) => void
  currentPhotoUri?: string
}

const styles = StyleSheet.create({
  photoSection: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    padding: Spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    minHeight: 200,
  },
  photoButton: {
    alignItems: 'center',
  },
  photoButtonText: {
    marginTop: Spacing.sm,
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: Spacing.md,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  actionButtonText: {
    color: 'white',
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
})

export const PhotoPicker: FunctionComponent<PhotoPickerProps> = ({onPhotoSelect, currentPhotoUri}) => {
  const requestPermissions = async (): Promise<boolean> => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()
    const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!cameraPermission.granted || !mediaLibraryPermission.granted) {
      Alert.alert(
        'Rechten vereist',
        'We hebben toegang nodig tot je camera en galerij om foto\'s te maken en te selecteren.',
      )
      return false
    }
    return true
  }

  const pickImageFromCamera = async (): Promise<void> => {
    const hasPermission = await requestPermissions()
    if (!hasPermission) return

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled && result.assets[0]) {
      onPhotoSelect(result.assets[0].uri)
    }
  }

  const pickImageFromGallery = async (): Promise<void> => {
    const hasPermission = await requestPermissions()
    if (!hasPermission) return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled && result.assets[0]) {
      onPhotoSelect(result.assets[0].uri)
    }
  }

  if (currentPhotoUri) {
    return (
      <View>
        <Image source={{uri: currentPhotoUri}} style={styles.previewImage} resizeMode="cover" />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={pickImageFromCamera}>
            <Ionicons name="camera-outline" size={IconSizes.sm} color="white" />
            <Text style={styles.actionButtonText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={pickImageFromGallery}>
            <Ionicons name="images-outline" size={IconSizes.sm} color="white" />
            <Text style={styles.actionButtonText}>Galerij</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View>
      <View style={styles.photoSection}>
        <Ionicons name="camera-outline" size={IconSizes.xl} color={Colors.primary} />
        <Text style={styles.photoButtonText}>Voeg een foto toe</Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={pickImageFromCamera}>
          <Ionicons name="camera-outline" size={IconSizes.sm} color="white" />
          <Text style={styles.actionButtonText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={pickImageFromGallery}>
          <Ionicons name="images-outline" size={IconSizes.sm} color="white" />
          <Text style={styles.actionButtonText}>Galerij</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
