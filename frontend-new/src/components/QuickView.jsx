import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useProducts } from '../context/ProductContext'
import { Link } from 'react-router-dom'

export default function QuickView({ show, product, onClose }) {
  const { addToCart } = useProducts()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    await addToCart(product, quantity)
    setTimeout(() => {
      setIsAdding(false)
      onClose()
    }, 500)
  }

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="mt-2">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                      <div className="mt-2 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'}
                          >
                            ★
                          </span>
                        ))}
                        <span className="ml-2 text-sm text-gray-500">({product.reviews} reviews)</span>
                      </div>
                      <p className="mt-2 text-xl font-medium text-gray-900">${product.price}</p>
                      <p className={`mt-2 text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </p>

                      {product.stock > 0 && (
                        <div className="mt-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="rounded-l-md border border-r-0 border-gray-300 px-3 py-2 text-gray-900 hover:bg-gray-50"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              id="quantity"
                              value={quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value)
                                if (!isNaN(val) && val >= 1 && val <= product.stock) {
                                  setQuantity(val)
                                }
                              }}
                              className="w-16 border-gray-300 text-center focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button
                              type="button"
                              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                              className="rounded-r-md border border-l-0 border-gray-300 px-3 py-2 text-gray-900 hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${
                            isAdding
                              ? 'bg-green-500'
                              : product.stock === 0
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-indigo-600 hover:bg-indigo-500'
                          }`}
                          onClick={handleAddToCart}
                          disabled={product.stock === 0 || isAdding}
                        >
                          {isAdding ? 'Added ✓' : 'Add to Cart'}
                        </button>
                        <Link
                          to={`/products/${product.id}`}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={onClose}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
