<template>
  <div class="cart-modal-overlay" @click.self="$emit('close')">
    <div class="cart-modal">
      <h2>Your Cart</h2>
      <div v-if="cart.length === 0" class="empty-cart">Your cart is empty.</div>
      <ul v-else class="cart-list">
        <li v-for="album in cart" :key="album.id" class="cart-item">
          <span>{{ album.title }} by {{ album.artist }}</span>
          <button class="remove-btn" @click="$emit('remove-from-cart', album.id)">Remove</button>
        </li>
      </ul>
      <button class="close-btn" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Album } from '../types/album'

defineProps<{ cart: Album[] }>()
</script>

<style scoped>
.cart-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.cart-modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  min-width: 320px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}
.cart-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.remove-btn {
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
}
.close-btn {
  margin-top: 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
}
.empty-cart {
  color: #888;
  margin: 1rem 0;
}
</style>
