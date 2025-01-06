import { useState } from 'react'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'

const products = [
  {
    id: 1,
    name: 'Premium Cement',
    category: 'Building Materials',
    price: '$29.99',
    image: 'https://placehold.co/300x200',
    description: 'High-quality cement for construction projects',
  },
  {
    id: 2,
    name: 'Steel Reinforcement Bars',
    category: 'Building Materials',
    price: '$49.99',
    image: 'https://placehold.co/300x200',
    description: 'Durable steel bars for structural reinforcement',
  },
  {
    id: 3,
    name: 'Office Paper Bundle',
    category: 'Office Supplies',
    price: '$19.99',
    image: 'https://placehold.co/300x200',
    description: 'Premium quality A4 paper, 500 sheets',
  },
  {
    id: 4,
    name: 'Professional Stapler Set',
    category: 'Office Supplies',
    price: '$15.99',
    image: 'https://placehold.co/300x200',
    description: 'Heavy-duty stapler with 1000 staples',
  },
]

const categories = [
  { name: 'All', count: products.length },
  { name: 'Building Materials', count: products.filter(p => p.category === 'Building Materials').length },
  { name: 'Office Supplies', count: products.filter(p => p.category === 'Office Supplies').length },
]

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const { addToCart } = useCart()

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      (searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>

          <div className="flex items-center">
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search products..."
              />
            </div>

            <button
              type="button"
              className="ml-4 inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <FunnelIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-24 pt-6 lg:grid-cols-4">
          {/* Filters */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
            <ul className="mt-4 space-y-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <button
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center justify-between w-full text-left ${
                      selectedCategory === category.name ? 'text-indigo-600' : 'text-gray-600'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="ml-2 text-sm text-gray-500">{category.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href="#">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(product)
                      alert('Product added to cart!')
                    }}
                    className="mt-4 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
