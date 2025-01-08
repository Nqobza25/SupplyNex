import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../context/ProductContext'
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

const tabs = [
  { name: 'Profile', href: '#profile' },
  { name: 'Orders', href: '#orders' },
  { name: 'Wishlist', href: '#wishlist' },
  { name: 'Settings', href: '#settings' },
]

export default function Profile() {
  const { user, updateProfile, logout } = useAuth()
  const { products, wishlist, removeFromWishlist, addToCart } = useProducts()
  const [activeTab, setActiveTab] = useState('Profile')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
  })

  // Mock orders data
  const orders = [
    {
      id: 1,
      date: '2024-01-07',
      total: 599.98,
      status: 'Delivered',
      items: [
        { id: 1, name: 'Premium Office Chair', quantity: 2, price: 299.99 }
      ]
    },
    // Add more mock orders as needed
  ]

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
      await updateProfile(formData)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      // Redirect will be handled by AuthContext
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }

  const wishlistProducts = products.filter(product => wishlist.includes(product.id))

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <nav className="space-y-1" aria-label="Profile">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={classNames(
                    activeTab === tab.name
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50',
                    'group w-full flex items-center px-3 py-2 text-sm font-medium rounded-md'
                  )}
                >
                  {tab.name}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="group w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </nav>
          </div>

          {/* Main content */}
          <div className="mt-10 lg:col-span-9 lg:mt-0">
            {activeTab === 'Profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                {isEditing ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="displayName"
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Name</h3>
                      <p className="mt-1 text-sm text-gray-900">{formData.displayName || 'Not set'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1 text-sm text-gray-900">{formData.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                      <p className="mt-1 text-sm text-gray-900">{formData.phone || 'Not set'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Address</h3>
                      <p className="mt-1 text-sm text-gray-900">{formData.address || 'Not set'}</p>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Orders' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Order History</h2>
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <span className={classNames(
                          'px-2 py-1 text-xs font-medium rounded-full',
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        )}>
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between py-2">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">${item.price}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 border-t pt-4">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">Total</p>
                          <p className="text-sm font-medium text-gray-900">${order.total}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Wishlist' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {wishlistProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">${product.price}</p>
                        <div className="mt-4 flex space-x-2">
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="rounded-md border border-gray-300 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <HeartIconSolid className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {wishlistProducts.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-semibold text-gray-900">No items in wishlist</h3>
                      <p className="mt-1 text-sm text-gray-500">Start adding items to your wishlist!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'Settings' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                {/* Add account settings options here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
