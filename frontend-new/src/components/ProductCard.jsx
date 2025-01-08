import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

export default function ProductCard({ product }) {
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useProducts()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    await addToCart(product, 1)
    setTimeout(() => setIsAdding(false), 500) // Reset button after animation
  }

  return (
    <div className="group relative border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          <div className="mt-1 flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}>
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-900">${product.price}</p>
          <p className={`mt-2 text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
      </Link>

      <div className="mt-4 flex justify-between gap-2">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
          className={`flex-1 flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white transition-all duration-200 ${
            isAdding 
              ? 'bg-green-500'
              : product.stock === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isAdding ? (
            'Added ✓'
          ) : (
            <>
              <ShoppingCartIcon className="h-5 w-5 mr-1" />
              Add to Cart
            </>
          )}
        </button>
        
        <button
          onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product.id)}
          className="flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500"
        >
          {isInWishlist(product.id) ? (
            <HeartSolid className="h-6 w-6 text-red-500" />
          ) : (
            <HeartOutline className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  )
}
