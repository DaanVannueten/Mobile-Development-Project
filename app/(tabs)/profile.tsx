import {Ionicons} from '@expo/vector-icons'
import {type FunctionComponent} from 'react'
import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Colors} from '../../constants/Colors'
import {FontSizes, IconSizes, Spacing} from '../../constants/Layout'
import {Strings} from '../../constants/Strings'
import {useMeals} from '../../hooks/useMeals'
import {StorageService} from '../../services/StorageService'

interface InfoRowProps {
  icon: string
  label: string
  value: string
}

const InfoRow: FunctionComponent<InfoRowProps> = ({icon, label, value}) => {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={IconSizes.md} color={Colors.primary} />
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  )
}

interface FeatureItemProps {
  text: string
}

const FeatureItem: FunctionComponent<FeatureItemProps> = ({text}) => {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  )
}

const Profile: FunctionComponent = () => {
  const {meals, refreshMeals} = useMeals()

  const handleClearData = (): void => {
    Alert.alert(Strings.profile.clearData, Strings.profile.clearDataConfirm, [
      {
        text: Strings.profile.cancel,
        style: 'cancel',
      },
      {
        text: Strings.profile.delete,
        style: 'destructive',
        onPress: async () => {
          try {
            await StorageService.clearAllMeals()
            await refreshMeals()
            Alert.alert(Strings.common.ok, Strings.profile.dataCleared)
          } catch (_error) {
            Alert.alert(Strings.validation.errorTitle, 'Er is een fout opgetreden bij het wissen van de data.')
          }
        },
      },
    ])
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* App Info Section */}
      <View style={styles.section}>
        <View style={styles.header}>
          <View style={styles.appIcon}>
            <Ionicons name="restaurant" size={IconSizes.xl} color="white" />
          </View>
          <Text style={styles.appName}>{Strings.profile.appName}</Text>
          <Text style={styles.appVersion}>{Strings.profile.version}</Text>
        </View>

        <Text style={styles.description}>{Strings.profile.description}</Text>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{Strings.profile.features}</Text>
        <View style={styles.featuresList}>
          <FeatureItem text={Strings.profile.feature1} />
          <FeatureItem text={Strings.profile.feature2} />
          <FeatureItem text={Strings.profile.feature3} />
          <FeatureItem text={Strings.profile.feature4} />
        </View>
      </View>

      {/* App Info Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{Strings.profile.appInfo}</Text>
        <View style={styles.infoCard}>
          <InfoRow icon="document-text-outline" label="Totaal maaltijden" value={meals.length.toString()} />
          <InfoRow icon="code-slash-outline" label="Ontwikkeld met" value="React Native & Expo" />
          <InfoRow icon="calendar-outline" label="Release datum" value="Januari 2026" />
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{Strings.profile.settings}</Text>
        <TouchableOpacity style={styles.dangerButton} onPress={handleClearData}>
          <Ionicons name="trash-outline" size={IconSizes.md} color="white" />
          <Text style={styles.dangerButtonText}>{Strings.profile.clearData}</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Calorie Tracker</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  appName: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  appVersion: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  description: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.md,
    color: Colors.text,
  },
  featuresList: {
    gap: Spacing.sm,
  },
  featureItem: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureText: {
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  infoCard: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 12,
    padding: Spacing.lg,
    gap: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  infoLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
  },
  dangerButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  dangerButtonText: {
    color: 'white',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  footerText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
})

export default Profile
