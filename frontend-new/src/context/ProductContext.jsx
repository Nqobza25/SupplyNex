import { createContext, useContext, useState, useEffect } from 'react'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

const ProductContext = createContext()

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}

// Initial static products for fallback
const initialProducts = [
  {
    id: 1,
    name: 'Premium Office Chair',
    category: 'Furniture',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    description: 'Ergonomic office chair with lumbar support and adjustable height.',
    stock: 15,
    rating: 4.5,
    reviews: 128,
    specifications: {
      'Material': 'Mesh and Premium Fabric',
      'Weight Capacity': '300 lbs',
      'Adjustable Height': 'Yes',
      'Color': 'Black',
      'Assembly Required': 'Yes'
    }
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
    description: 'Comfortable wireless mouse with long battery life.',
    stock: 50,
    rating: 4.7,
    reviews: 245,
    specifications: {
      'DPI': '16000',
      'Battery Life': '70 hours',
      'Wireless Range': '10m',
      'Weight': '99g',
      'RGB': 'Yes'
    }
  },
  {
    id: 3,
    name: 'Standing Desk',
    category: 'Furniture',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1611269154421-4e27233c125a',
    description: 'Electric height-adjustable standing desk for optimal ergonomics.',
    stock: 10,
    rating: 4.8,
    reviews: 89,
    specifications: {
      'Height Range': '27.5" to 47.5"',
      'Desktop Size': '60" x 30"',
      'Weight Capacity': '350 lbs',
      'Material': 'Bamboo',
      'Motor': 'Dual Motor'
    }
  }
]

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cart, setCart] = useState([])
  const [notification, setNotification] = useState(null)
  const [wishlist, setWishlist] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: { min: '', max: '' },
    rating: 0,
    inStock: true
  })

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const productsRef = collection(db, 'products')
        const snapshot = await getDocs(productsRef)
        
        if (!snapshot.empty) {
          const productsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          setProducts(productsData)
        } else {
          console.log('No products found in Firestore, using initial products')
          setProducts(initialProducts)
        }
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products')
        setProducts(initialProducts)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filters.category === 'all' || product.category === filters.category
    const matchesPrice = (!filters.priceRange.min || product.price >= Number(filters.priceRange.min)) &&
                        (!filters.priceRange.max || product.price <= Number(filters.priceRange.max))
    const matchesRating = product.rating >= filters.rating
    const matchesStock = !filters.inStock || product.stock > 0

    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock
  })

  const addToCart = (productId, quantity = 1) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prevCart, { ...product, quantity }]
    })

    setNotification({
      type: 'success',
      message: 'Added to cart successfully'
    })
    setTimeout(() => setNotification(null), 3000)
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
    setNotification({
      type: 'success',
      message: 'Removed from cart'
    })
    setTimeout(() => setNotification(null), 3000)
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const addToWishlist = (productId) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    setWishlist(prev => {
      if (prev.find(item => item.id === productId)) return prev
      return [...prev, product]
    })

    setNotification({
      type: 'success',
      message: 'Added to wishlist'
    })
    setTimeout(() => setNotification(null), 3000)
  }

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
    setNotification({
      type: 'success',
      message: 'Removed from wishlist'
    })
    setTimeout(() => setNotification(null), 3000)
  }

  const value = {
    products: filteredProducts,
    loading,
    error,
    cart,
    notification,
    wishlist,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    addToWishlist,
    removeFromWishlist
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
            notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          } text-white transition-opacity duration-500`}
        >
          {notification.message}
        </div>
      )}
    </ProductContext.Provider>
  )
}
