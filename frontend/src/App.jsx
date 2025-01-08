import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Placeholder components for other routes
const Products = () => (
  <div className="min-h-screen bg-white py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">Products</h1>
      <p className="mt-4 text-gray-600">Coming soon...</p>
    </div>
  </div>
)

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

const Cart = () => (
  <div className="min-h-screen bg-white py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">Shopping Cart</h1>
      <p className="mt-4 text-gray-600">Your cart is empty</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App;
