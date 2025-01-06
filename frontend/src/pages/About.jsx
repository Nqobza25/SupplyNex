import { BuildingOffice2Icon, TruckIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const stats = [
  { id: 1, name: 'Years in Business', value: '10+' },
  { id: 2, name: 'Products Available', value: '5,000+' },
  { id: 3, name: 'Happy Customers', value: '10,000+' },
  { id: 4, name: 'Delivery Coverage', value: 'Nationwide' },
]

const values = [
  {
    name: 'Quality First',
    description: 'We never compromise on quality. All our products meet the highest industry standards.',
    icon: BuildingOffice2Icon,
  },
  {
    name: 'Reliable Delivery',
    description: 'Our efficient logistics network ensures timely delivery of your orders.',
    icon: TruckIcon,
  },
  {
    name: 'Customer Focus',
    description: 'We put our customers first and strive to exceed their expectations.',
    icon: UserGroupIcon,
  },
]

const team = [
  {
    name: 'John Smith',
    role: 'CEO & Founder',
    image: 'https://placehold.co/400x400',
  },
  {
    name: 'Sarah Johnson',
    role: 'Operations Director',
    image: 'https://placehold.co/400x400',
  },
  {
    name: 'Michael Brown',
    role: 'Head of Sales',
    image: 'https://placehold.co/400x400',
  },
]

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src="https://placehold.co/1920x1080"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About SupplyNex</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Your trusted partner in building materials and office supplies. We've been serving businesses
              and individuals with quality products and exceptional service since 2015.
            </p>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Values section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Values</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're driven by strong values that guide everything we do.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {values.map((value) => (
            <div key={value.name}>
              <dt className="font-semibold text-gray-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                {value.name}
              </dt>
              <dd className="mt-1 text-gray-600">{value.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Team section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Meet the people who make SupplyNex great.
          </p>
        </div>
        <ul role="list" className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {team.map((person) => (
            <li key={person.name}>
              <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={person.image} alt="" />
              <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
              <p className="text-base leading-7 text-gray-600">{person.role}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8 pb-24">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get in Touch</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Have questions? We'd love to hear from you.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Email: contact@supplynex.com
              </p>
            </div>
            <div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
