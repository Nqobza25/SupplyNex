import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);

// Products
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), productData);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Cart
export const addToCart = async (userId, productId, quantity) => {
  try {
    const cartRef = collection(db, `users/${userId}/cart`);
    await addDoc(cartRef, { productId, quantity });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCart = async (userId) => {
  try {
    const cartRef = collection(db, `users/${userId}/cart`);
    const querySnapshot = await getDocs(cartRef);
    const cartItems = [];
    querySnapshot.forEach((doc) => {
      cartItems.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, cartItems };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateCartItem = async (userId, cartItemId, quantity) => {
  try {
    const cartItemRef = doc(db, `users/${userId}/cart/${cartItemId}`);
    await updateDoc(cartItemRef, { quantity });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const removeFromCart = async (userId, cartItemId) => {
  try {
    const cartItemRef = doc(db, `users/${userId}/cart/${cartItemId}`);
    await deleteDoc(cartItemRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { db };
