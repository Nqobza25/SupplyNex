import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'

const steps = ['Shipping', 'Payment', 'Review']

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const { cart, getCartTotal, processCheckout } = useProducts()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: ''
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    }
  })

  const handleInputChange = (step, field, value) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(current => current + 1)
      return
    }

    setLoading(true)
    try {
      const result = await processCheckout({
        items: cart,
        total: getCartTotal(),
        ...formData
      })

      if (result.success) {
        navigate('/profile')
      }
    } catch (error) {
      console.error('Checkout failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const subtotal = getCartTotal()
  const shipping = 5.00
  const tax = subtotal * 0.15
  const total = subtotal + shipping + tax

  return (
    <div className="bg-white">
      {/* Progress Steps */}
      <div className="border-b border-gray-200">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center justify-center py-4 space-x-4">
            {steps.map((step, index) => (
              <li key={step} className="flex items-center">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </span>
                <span className="ml-2 text-sm font-medium text-gray-900">{step}</span>
                {index < steps.length - 1 && (
                  <div className="ml-4 h-0.5 w-8 bg-gray-200" />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First name</label>
                      <input
                        type="text"
                        required
                        value={formData.shipping.firstName}
                        onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last name</label>
                      <input
                        type="text"
                        required
                        value={formData.shipping.lastName}
                        onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        required
                        value={formData.shipping.address}
                        onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        required
                        value={formData.shipping.city}
                        onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">State</label>
                      <input
                        type="text"
                        required
                        value={formData.shipping.state}
                        onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={formData.shipping.zipCode}
                        onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        required
                        value={formData.shipping.phone}
                        onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Payment information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card number</label>
                      <input
                        type="text"
                        required
                        value={formData.payment.cardNumber}
                        onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name on card</label>
                      <input
                        type="text"
                        required
                        value={formData.payment.cardName}
                        onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={formData.payment.expiryDate}
                          onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                          type="text"
                          required
                          value={formData.payment.cvv}
                          onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Review */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Review your order</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg divide-y">
                      {cart.map((item) => (
                        <div key={item.id} className="flex py-6 px-4">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-6 flex flex-1 flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${item.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-sm">
                        <p className="text-gray-600">Shipping address:</p>
                        <p className="text-gray-900">
                          {formData.shipping.address}, {formData.shipping.city}, {formData.shipping.state} {formData.shipping.zipCode}
                        </p>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <p className="text-gray-600">Payment method:</p>
                        <p className="text-gray-900">
                          Card ending in {formData.payment.cardNumber.slice(-4)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(current => current - 1)}
                    className="mr-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
                >
                  {loading ? 'Processing...' : currentStep === steps.length - 1 ? 'Place order' : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="sticky top-6">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flow-root">
                    <dl className="-my-4 divide-y divide-gray-200 text-sm">
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-gray-600">Subtotal</dt>
                        <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-gray-600">Shipping</dt>
                        <dd className="font-medium text-gray-900">${shipping.toFixed(2)}</dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-gray-600">Tax</dt>
                        <dd className="font-medium text-gray-900">${tax.toFixed(2)}</dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                        <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
