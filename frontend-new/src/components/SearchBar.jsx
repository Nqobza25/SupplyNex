import { useState, useEffect, useRef } from 'react'
import { useProducts } from '../context/ProductContext'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const { searchQuery, setSearchQuery, products } = useProducts()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  const suggestions = products
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/products')
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (productId) => {
    navigate(`/products/${productId}`)
    setShowSuggestions(false)
  }

  return (
    <div className="relative flex-1 max-w-lg mx-auto" ref={searchRef}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search products..."
          />
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && searchQuery && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
          {suggestions.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleSuggestionClick(product.id)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-8 w-8 object-cover rounded"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">${product.price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">No products found</div>
          )}
        </div>
      )}
    </div>
  )
}
