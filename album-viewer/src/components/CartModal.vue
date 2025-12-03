<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>🛒 Shopping Cart</h2>
        <button class="close-btn" @click="closeModal" aria-label="Close cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <div v-if="cartItems.length === 0" class="empty-cart">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Your cart is empty</p>
          <p class="empty-subtitle">Add some albums to get started!</p>
        </div>

        <div v-else class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.image_url" :alt="item.title" class="item-image" />
            <div class="item-info">
              <h3>{{ item.title }}</h3>
              <p>{{ item.artist }}</p>
              <span class="item-price">${{ item.price.toFixed(2) }}</span>
            </div>
            <button class="remove-btn" @click="handleRemove(item.id)" aria-label="Remove from cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="cartItems.length > 0" class="modal-footer">
        <div class="total">
          <span class="total-label">Total:</span>
          <span class="total-amount">${{ cartTotal.toFixed(2) }}</span>
        </div>
        <div class="footer-actions">
          <button class="btn btn-clear" @click="handleClearCart">Clear Cart</button>
          <button class="btn btn-checkout">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'

interface Props {
  isOpen: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const { cartItems, cartTotal, removeFromCart, clearCart } = useCart()

const closeModal = (): void => {
  emit('close')
}

const handleRemove = (albumId: number): void => {
  removeFromCart(albumId)
}

const handleClearCart = (): void => {
  if (confirm('Are you sure you want to clear your cart?')) {
    clearCart()
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.empty-cart {
  text-align: center;
  padding: 3rem 1rem;
  color: #999;
}

.empty-cart svg {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-cart p {
  margin: 0.5rem 0;
  font-size: 1.2rem;
  color: #666;
}

.empty-subtitle {
  font-size: 1rem !important;
  color: #999 !important;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.cart-item:hover {
  background: #f0f1f2;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  color: #333;
}

.item-info p {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.item-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #667eea;
}

.remove-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  align-self: center;
}

.remove-btn:hover {
  background: #ff5252;
  transform: scale(1.05);
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
  background: #f8f9fa;
  border-radius: 0 0 15px 15px;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.total-label {
  font-weight: 600;
  color: #333;
}

.total-amount {
  font-weight: bold;
  color: #667eea;
  font-size: 1.5rem;
}

.footer-actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  flex: 1;
  padding: 0.875rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-clear {
  background: white;
  color: #666;
  border: 2px solid #ddd;
}

.btn-clear:hover {
  background: #f0f0f0;
  border-color: #ccc;
}

.btn-checkout {
  background: #667eea;
  color: white;
}

.btn-checkout:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
  .modal-content {
    max-height: 95vh;
  }

  .cart-item {
    flex-direction: row;
  }

  .item-image {
    width: 60px;
    height: 60px;
  }

  .footer-actions {
    flex-direction: column;
  }
}
</style>
