/**
 * IngredientSearch Component
 * 
 * Modal for searching ingredients from Open Food Facts API
 * Allows users to search and select ingredients with automatic calorie data
 */

import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { Colors, FontSizes, IconSizes, Spacing } from '../constants'
import { NutritionProduct, searchProducts } from '../services/NutritionApiService'

interface IngredientSearchProps {
  visible: boolean
  onClose: () => void
  onSelectIngredient: (product: NutritionProduct) => void
}

export default function IngredientSearch({
  visible,
  onClose,
  onSelectIngredient
}: IngredientSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<NutritionProduct[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (searchQuery.trim().length < 2) {
      Alert.alert('Search Query Too Short', 'Please enter at least 2 characters')
      return
    }

    setIsSearching(true)
    setHasSearched(true)

    try {
      const products = await searchProducts(searchQuery)
      setResults(products)
      
      if (products.length === 0) {
        Alert.alert(
          'No Results',
          'No products found. Try a different search term.',
          [{ text: 'OK' }]
        )
      }
    } catch (error) {
      Alert.alert(
        'Search Failed',
        error instanceof Error ? error.message : 'Failed to search products',
        [{ text: 'OK' }]
      )
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectProduct = (product: NutritionProduct) => {
    onSelectIngredient(product)
    handleClose()
  }

  const handleClose = () => {
    setSearchQuery('')
    setResults([])
    setHasSearched(false)
    onClose()
  }

  const renderProductItem = ({ item }: { item: NutritionProduct }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => handleSelectProduct(item)}
    >
      <View style={styles.productInfo}>
        {item.imageUrl && (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.productImage}
            resizeMode="contain"
          />
        )}
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          {item.brand && (
            <Text style={styles.productBrand} numberOfLines={1}>
              {item.brand}
            </Text>
          )}
          <Text style={styles.productCalories}>
            {item.calories} kcal per 100g
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={IconSizes.md} color={Colors.textSecondary} />
    </TouchableOpacity>
  )

  const renderEmptyState = () => {
    if (!hasSearched) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="search" size={IconSizes.xl} color={Colors.textSecondary} />
          <Text style={styles.emptyStateText}>
            Search for ingredients from our online database
          </Text>
          <Text style={styles.emptyStateSubtext}>
            Enter a food name and tap search
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.emptyState}>
        <Ionicons name="sad-outline" size={IconSizes.xl} color={Colors.textSecondary} />
        <Text style={styles.emptyStateText}>
          No products found
        </Text>
        <Text style={styles.emptyStateSubtext}>
          Try a different search term
        </Text>
      </View>
    )
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search Ingredients</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={IconSizes.lg} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons 
              name="search" 
              size={IconSizes.md} 
              color={Colors.textSecondary} 
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for ingredients..."
              placeholderTextColor={Colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                onPress={() => setSearchQuery('')}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={IconSizes.md} color={Colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity 
            style={[styles.searchButton, isSearching && styles.searchButtonDisabled]}
            onPress={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.searchButtonText}>Search</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Results */}
        <View style={styles.resultsContainer}>
          {isSearching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          ) : (
            <FlatList
              data={results}
              renderItem={renderProductItem}
              keyExtractor={item => item.code}
              ListEmptyComponent={renderEmptyState}
              contentContainerStyle={results.length === 0 ? styles.emptyContainer : undefined}
            />
          )}
        </View>

        {/* Info Footer */}
        <View style={styles.footer}>
          <Ionicons name="information-circle-outline" size={IconSizes.sm} color={Colors.textSecondary} />
          <Text style={styles.footerText}>
            Data provided by Open Food Facts
          </Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: 'white'
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text
  },
  closeButton: {
    position: 'absolute',
    right: Spacing.lg,
    padding: Spacing.xs
  },
  searchContainer: {
    flexDirection: 'row',
    padding: Spacing.md,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.sm
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border
  },
  searchIcon: {
    marginRight: Spacing.sm
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.text,
    paddingVertical: Spacing.sm
  },
  clearButton: {
    padding: Spacing.xs
  },
  searchButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80
  },
  searchButtonDisabled: {
    opacity: 0.6
  },
  searchButtonText: {
    color: 'white',
    fontSize: FontSizes.md,
    fontWeight: '600'
  },
  resultsContainer: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md
  },
  loadingText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyState: {
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm
  },
  emptyStateText: {
    fontSize: FontSizes.lg,
    color: Colors.text,
    textAlign: 'center',
    fontWeight: '600'
  },
  emptyStateSubtext: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center'
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.md
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.background
  },
  productDetails: {
    flex: 1,
    gap: 4
  },
  productName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text
  },
  productBrand: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary
  },
  productCalories: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.xs
  },
  footerText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary
  }
})
