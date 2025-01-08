import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { addToCart, getCart, updateCartItem, removeFromCart } from '../firebase/firestore';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart([]);
      setTotal(0);
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;
    const result = await getCart(user.uid);
    if (result.success) {
      setCart(result.cartItems);
      calculateTotal(result.cartItems);
    }
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const addItem = async (product, quantity = 1) => {
    if (!user) return false;
    const result = await addToCart(user.uid, product.id, quantity);
    if (result.success) {
      const newCart = [...cart, { ...product, quantity }];
      setCart(newCart);
      calculateTotal(newCart);
      return true;
    }
    return false;
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!user) return false;
    const result = await updateCartItem(user.uid, itemId, quantity);
    if (result.success) {
      const newCart = cart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      setCart(newCart);
      calculateTotal(newCart);
      return true;
    }
    return false;
  };

  const removeItem = async (itemId) => {
    if (!user) return false;
    const result = await removeFromCart(user.uid, itemId);
    if (result.success) {
      const newCart = cart.filter(item => item.id !== itemId);
      setCart(newCart);
      calculateTotal(newCart);
      return true;
    }
    return false;
  };

  const value = {
    cart,
    total,
    addItem,
    updateQuantity,
    removeItem
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
