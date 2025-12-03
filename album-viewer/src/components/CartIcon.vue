<template>
  <div class="cart-icon" @click="toggleCart">
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
    <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'

const { cartCount } = useCart()

const emit = defineEmits<{
  toggleCart: []
}>()

const toggleCart = (): void => {
  emit('toggleCart')
}
</script>

<style scoped>
.cart-icon {
  position: relative;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
}

.cart-icon:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ff6b6b;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
