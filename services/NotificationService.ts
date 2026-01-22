import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import type { Meal } from '../types'

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export class NotificationService {
  /**
   * Request notification permissions
   */
  static async requestPermissions(): Promise<boolean> {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        console.log('Notification permissions denied')
        return false
      }

      // For Android, create notification channel
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('meal-reminders', {
          name: 'Meal Reminders',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          sound: 'default',
          lightColor: '#FF6B35',
        })
      }

      return true
    } catch (error) {
      console.error('Permission request error:', error)
      return false
    }
  }

  /**
   * Schedule a notification for meal time
   */
  static async scheduleMealNotification(meal: Meal): Promise<string | null> {
    try {
      const hasPermission = await this.requestPermissions()
      if (!hasPermission) {
        throw new Error('Notificatie permissies niet gegeven')
      }

      // Parse meal date and time
      const [year, month, day] = meal.date.split('-').map(Number)
      const [hours, minutes] = meal.time.split(':').map(Number)
      const mealDate = new Date(year, month - 1, day, hours, minutes)

      // Don't schedule if time is in the past
      if (mealDate.getTime() <= Date.now()) {
        throw new Error('Maaltijd tijd ligt in het verleden')
      }

      // Schedule notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `🍽️ ${meal.name}`,
          body: `Tijd voor je maaltijd! ${meal.totalCalories} kcal`,
          data: { mealId: meal.id },
          sound: 'default',
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          channelId: 'meal-reminders',
          date: mealDate,
        },
      })

      console.log('Notification scheduled:', notificationId)
      return notificationId
    } catch (error) {
      console.error('Schedule notification error:', error)
      throw error
    }
  }

  /**
   * Schedule a reminder notification (15 minutes before meal)
   */
  static async scheduleReminderNotification(meal: Meal): Promise<string | null> {
    try {
      const hasPermission = await this.requestPermissions()
      if (!hasPermission) {
        throw new Error('Notificatie permissies niet gegeven')
      }

      // Parse meal date and time
      const [year, month, day] = meal.date.split('-').map(Number)
      const [hours, minutes] = meal.time.split(':').map(Number)
      const mealDate = new Date(year, month - 1, day, hours, minutes)

      // Schedule 15 minutes before
      const reminderDate = new Date(mealDate.getTime() - 15 * 60 * 1000)

      // Don't schedule if time is in the past
      if (reminderDate.getTime() <= Date.now()) {
        throw new Error('Reminder tijd ligt in het verleden')
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: '⏰ Maaltijd reminder',
          body: `${meal.name} over 15 minuten!`,
          data: { mealId: meal.id, type: 'reminder' },
          sound: 'default',
        },
        trigger: {
          channelId: 'meal-reminders',
          date: reminderDate,
        },
      })

      console.log('Reminder scheduled:', notificationId)
      return notificationId
    } catch (error) {
      console.error('Schedule reminder error:', error)
      throw error
    }
  }

  /**
   * Send an immediate notification
   */
  static async sendImmediateNotification(title: string, body: string): Promise<void> {
    try {
      const hasPermission = await this.requestPermissions()
      if (!hasPermission) {
        return
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: 'default',
        },
        trigger: null, // immediate
      })
    } catch (error) {
      console.error('Send immediate notification error:', error)
    }
  }

  /**
   * Cancel a scheduled notification
   */
  static async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId)
      console.log('Notification cancelled:', notificationId)
    } catch (error) {
      console.error('Cancel notification error:', error)
    }
  }

  /**
   * Cancel all scheduled notifications
   */
  static async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync()
      console.log('All notifications cancelled')
    } catch (error) {
      console.error('Cancel all notifications error:', error)
    }
  }

  /**
   * Get all scheduled notifications
   */
  static async getAllScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync()
      return notifications
    } catch (error) {
      console.error('Get scheduled notifications error:', error)
      return []
    }
  }

  /**
   * Check if notifications are enabled
   */
  static async areNotificationsEnabled(): Promise<boolean> {
    try {
      const { status } = await Notifications.getPermissionsAsync()
      return status === 'granted'
    } catch (error) {
      console.error('Check notifications enabled error:', error)
      return false
    }
  }
}
