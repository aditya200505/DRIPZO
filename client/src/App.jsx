import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlobalToast from './components/GlobalToast';
import ScrollToTop from './components/ScrollToTop';
import AIChatbot from './components/AIChatbot';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Dashboard from './pages/Dashboard';
import WomenCollection from './pages/WomenCollection';
import MenCollection from './pages/MenCollection';
import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white text-secondary">
          <ScrollToTop />
          <Navbar />
        <GlobalToast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/collections" element={<ProductList />} />
          <Route path="/men" element={<MenCollection />} />
          <Route path="/women" element={<WomenCollection />} />
          <Route path="/nearby" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking" element={<OrderTracking />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <AIChatbot />
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
