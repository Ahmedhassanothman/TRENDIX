import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  Navigate,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import AiTool from "./pages/AiTool/AiTool";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Profile from "./pages/Profile/Profile";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import ChatBot from './components/ChatBot/ChatBot';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return children;
};

const Layout = () => {
  return (
    <div className="transition-colors duration-300 dark:bg-dark-bg-primary dark:text-dark-text-primary">
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
      <ThemeToggle />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/aitool" element={<AiTool />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }></Route>
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }></Route>
        <Route path="/paymentgateway" element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider>
      <div className="font-bodyFont">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;