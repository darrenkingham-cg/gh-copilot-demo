import { ref, computed } from 'vue'
import type { Album } from '../types/album'

// Cart state - shared across all components
const cartItems = ref<Album[]>([])

export function useCart() {
  const addToCart = (album: Album): void => {
    // Check if album is already in cart
    const exists = cartItems.value.find(item => item.id === album.id)
    if (!exists) {
      cartItems.value.push(album)
    }
  }

  const removeFromCart = (albumId: number): void => {
    const index = cartItems.value.findIndex(item => item.id === albumId)
    if (index !== -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const isInCart = (albumId: number): boolean => {
    return cartItems.value.some(item => item.id === albumId)
  }

  const clearCart = (): void => {
    cartItems.value = []
  }

  const cartCount = computed(() => cartItems.value.length)
  
  const cartTotal = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price, 0)
  })

  return {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    isInCart,
    clearCart
  }
}
