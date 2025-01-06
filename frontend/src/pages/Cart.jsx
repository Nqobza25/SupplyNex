import { useCart } from '../context/CartContext'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cart, total, removeFromCart, updateQuantity } = useCart()

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your cart is empty</h2>
          <p className="mt-4 text-lg text-gray-500">Start shopping to add items to your cart.</p>
          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

        <form className="mt-12">
          <div>
            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cart.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                            {product.name}
                          </a>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-900">{product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    </div>

                    <div className="mt-4 flex flex-1 items-end justify-between">
                      <div className="flex items-center space-x-3">
                        <label htmlFor={`quantity-${product.id}`} className="sr-only">
                          Quantity
                        </label>
                        <select
                          id={`quantity-${product.id}`}
                          name={`quantity-${product.id}`}
                          value={product.quantity}
                          onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                          className="block max-w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <div className="mt-10 sm:ml-32 sm:pl-6">
            <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="sr-only">Order summary</h2>

              <div className="flow-root">
                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                    <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                or{' '}
                <Link to="/products" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
