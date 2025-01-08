import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firestore';

export const getRedirectPath = async (user) => {
  try {
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();

    // Check if user is an admin
    if (userData?.role === 'admin') {
      return '/admin/dashboard';
    }

    // Check if user needs to complete profile
    if (!userData?.firstName || !userData?.lastName || !userData?.phone) {
      return '/complete-profile';
    }

    // Check if there's a saved redirect path in session storage
    const savedPath = sessionStorage.getItem('redirectAfterLogin');
    sessionStorage.removeItem('redirectAfterLogin'); // Clear the saved path

    // If user was trying to access cart or checkout, redirect there
    if (savedPath && (savedPath.includes('/cart') || savedPath.includes('/checkout'))) {
      return savedPath;
    }

    // Default redirect to products page
    return '/products';
  } catch (error) {
    console.error('Error getting redirect path:', error);
    return '/products'; // Default fallback
  }
};
