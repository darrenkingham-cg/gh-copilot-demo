import { ref, computed } from 'vue';
import type { Album } from '../types/album';

const cart = ref<Album[]>([]);

export function useCart() {
  const addToCart = (album: Album) => {
    if (!cart.value.find(a => a.id === album.id)) {
      cart.value.push(album);
    }
  };

  const removeFromCart = (albumId: number) => {
    cart.value = cart.value.filter(a => a.id !== albumId);
  };

  const cartCount = computed(() => cart.value.length);

  return {
    cart,
    addToCart,
    removeFromCart,
    cartCount
  };
}
