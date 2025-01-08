import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Furniture', value: 'Furniture' },
  { name: 'Electronics', value: 'Electronics' },
  { name: 'Office Supplies', value: 'Office Supplies' },
]

const sortOptions = [
  { name: 'Most Popular', value: 'popular' },
  { name: 'Best Rating', value: 'rating' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
  { name: 'Newest', value: 'newest' },
]

export default function Products() {
  const { products, loading, error } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [selectedRatings, setSelectedRatings] = useState([])
  const [showInStock, setShowInStock] = useState(true)
  const [showOutOfStock, setShowOutOfStock] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPriceRange = 
        (!priceRange.min || product.price >= Number(priceRange.min)) &&
        (!priceRange.max || product.price <= Number(priceRange.max))
      const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(product.rating))
      const matchesAvailability = (showInStock && product.inStock) || (showOutOfStock && !product.inStock)
      
      return matchesCategory && matchesSearch && matchesPriceRange && matchesRating && matchesAvailability
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'popular':
        default:
          return b.reviews - a.reviews
      }
    })

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Error</h3>
            <p className="mt-1 text-sm text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-4 md:mt-0 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 md:hidden"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 mr-1" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Category</h3>
              <div className="mt-2 space-y-2">
                {categories.map((category) => (
                  <label key={category.value} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={selectedCategory === category.value}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <label className="sr-only">Min Price</label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label className="sr-only">Max Price</label>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Rating</h3>
              <div className="mt-2 space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(rating)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRatings([...selectedRatings, rating])
                        } else {
                          setSelectedRatings(selectedRatings.filter(r => r !== rating))
                        }
                      }}
                      className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {rating}+ Stars
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Availability</h3>
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showInStock}
                    onChange={(e) => setShowInStock(e.target.checked)}
                    className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">In Stock</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showOutOfStock}
                    onChange={(e) => setShowOutOfStock(e.target.checked)}
                    className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Out of Stock</span>
                </label>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="mt-4">
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedRatings([])
                  setPriceRange({ min: '', max: '' })
                  setShowInStock(true)
                  setShowOutOfStock(true)
                }}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Clear all filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <FunnelIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
