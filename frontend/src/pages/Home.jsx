import { Link } from 'react-router-dom'

const features = [
  {
    name: 'Office Supplies',
    description: 'Everything you need to keep your office running smoothly.',
    icon: '📎',
  },
  {
    name: 'Electronics',
    description: 'Latest tech gadgets and accessories for your business.',
    icon: '💻',
  },
  {
    name: 'Furniture',
    description: 'Comfortable and stylish furniture for your workspace.',
    icon: '🪑',
  },
  {
    name: 'Cleaning Supplies',
    description: 'Keep your workspace clean and sanitized.',
    icon: '🧹',
  },
]

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Your One-Stop Shop for Business Supplies
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  SupplyNex offers everything your business needs to thrive. From office essentials to tech gadgets,
                  we've got you covered with premium supplies at competitive prices.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    to="/products"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Browse Products
                  </Link>
                  <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Categories</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover our wide range of business supplies and equipment
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <span className="text-2xl text-white">{feature.icon}</span>
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
