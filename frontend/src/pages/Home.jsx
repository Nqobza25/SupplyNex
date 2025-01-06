import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your One-Stop Shop for Building Materials & Office Supplies
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              SupplyNex provides high-quality building materials, office stationery, and professional quantity surveying services.
              Experience seamless procurement with our comprehensive solutions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/products"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Browse Products
              </Link>
              <Link to="/services" className="text-sm font-semibold leading-6 text-gray-900">
                Our Services <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="bg-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Featured Categories</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for your business
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: 'Building Materials',
                  description: 'High-quality construction materials including cement, steel, lumber, and more.',
                  link: '/products/building-materials',
                },
                {
                  name: 'Office Supplies',
                  description: 'Complete range of office stationery and supplies for your workplace needs.',
                  link: '/products/office-supplies',
                },
                {
                  name: 'Surveying Services',
                  description: 'Professional quantity surveying services for construction projects.',
                  link: '/services',
                },
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <Link to={feature.link} className="text-sm font-semibold leading-6 text-indigo-600">
                        Learn more <span aria-hidden="true">→</span>
                      </Link>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
