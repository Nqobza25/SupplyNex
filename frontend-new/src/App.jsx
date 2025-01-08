import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Profile from './pages/Profile'

// Placeholder components for routes
const Services = () => (
  <div className="min-h-screen bg-white py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">Services</h1>
      <p className="mt-4 text-gray-600">Coming soon...</p>
    </div>
  </div>
)

const About = () => (
  <div className="min-h-screen bg-white py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">About Us</h1>
      <p className="mt-4 text-gray-600">Coming soon...</p>
    </div>
  </div>
)

const Login = () => (
  <div className="min-h-screen bg-white py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">Login</h1>
      <p className="mt-4 text-gray-600">Coming soon...</p>
    </div>
  </div>
)

const Register = () => (
  <div className="min-h-screen bg-white py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">Register</h1>
      <p className="mt-4 text-gray-600">Coming soon...</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </div>
        </ProductProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
