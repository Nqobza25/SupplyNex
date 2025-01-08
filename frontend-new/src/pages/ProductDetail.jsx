import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import { useProducts } from '../context/ProductContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { products, addToCart } = useProducts()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = products.find(p => p.id === parseInt(productId))

  if (!product) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Product not found</h3>
            <p className="mt-1 text-sm text-gray-500">The product you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/products')}
              className="mt-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    // Optionally show a success message or navigate to cart
  }

  // Mock related products - in real app, this would be based on category or recommendations
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Images */}
          <div className="lg:max-w-lg lg:self-start">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Additional Images (mock) */}
            <div className="mt-4 grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={classNames(
                    'relative aspect-h-1 aspect-w-1 overflow-hidden rounded-lg',
                    selectedImage === index ? 'ring-2 ring-indigo-500' : 'ring-1 ring-gray-200'
                  )}
                >
                  <img
                    src={product.image}
                    alt={`View ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 lg:mt-0 lg:pl-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            
            <div className="mt-4">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
            </div>

            {/* Rating */}
            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm text-gray-500">
                  {product.reviews} reviews
                </p>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mt-4">
              <p className={classNames(
                'text-sm font-medium',
                product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
              )}>
                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
              </p>
            </div>

            {/* Description */}
            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>
              <p className="mt-2 text-sm text-gray-500">{product.description}</p>
            </div>

            {/* Specifications */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">Specifications</h2>
              <dl className="mt-4 space-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                    <dd className="col-span-2 text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Add to Cart */}
            <div className="mt-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-md border border-gray-300">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-700"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-700"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={classNames(
                    'flex-1 rounded-md px-6 py-3 text-base font-semibold text-white shadow-sm',
                    product.stock === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  )}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Related Products</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-sm text-gray-700">
                    <button onClick={() => navigate(`/products/${relatedProduct.id}`)}>
                      {relatedProduct.name}
                    </button>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">${relatedProduct.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
