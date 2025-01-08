import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useProducts } from '../context/ProductContext'

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, clearCart, getCartTotal } = useProducts()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
    } else {
      updateCartQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Implement checkout logic here
    setTimeout(() => {
      clearCart()
      setIsCheckingOut(false)
    }, 2000)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Your cart is empty</h2>
            <p className="mt-4 text-gray-500">Start shopping to add items to your cart.</p>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7">
            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <Link to={`/products/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                            {item.name}
                          </Link>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-900">${item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    </div>

                    <div className="mt-4 flex flex-1 items-end justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center rounded-md border border-gray-300">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-700"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-700"
                            disabled={item.quantity >= item.stock}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">${getCartTotal().toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Shipping estimate</p>
                <p className="text-sm font-medium text-gray-900">$5.00</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Tax estimate</p>
                <p className="text-sm font-medium text-gray-900">
                  ${(getCartTotal() * 0.15).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <p className="text-base font-medium text-gray-900">Order total</p>
                <p className="text-base font-medium text-gray-900">
                  ${(getCartTotal() + 5 + getCartTotal() * 0.15).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? 'Processing...' : 'Checkout'}
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              or{' '}
              <Link to="/products" className="font-medium text-indigo-600 hover:text-indigo-500">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
