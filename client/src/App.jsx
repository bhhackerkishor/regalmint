
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation
} from "react-router-dom";
import { selectIsAuthChecked, selectLoggedInUser } from "./features/auth/AuthSlice";
import { Logout } from "./features/auth/components/Logout";
import { Protected } from "./features/auth/components/Protected";
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
import { NotFoundPage } from "./pages/NotFoundPage";


// Import pages
import {
  AddProductPage,
  AdminOrdersPage,
  CartPage,
  CheckoutPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  OrderSuccessPage,
  OtpVerificationPage,
  ProductDetailsPage,
  ProductUpdatePage,
  ResetPasswordPage,
  SignupPage,
  UserOrdersPage,
  UserProfilePage,
  WishlistPage,
} from "./pages";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminProducts } from "./pages/AdminProductsPage.jsx";
import { AdminCategoryPage } from "./pages/AddCategoryPage.jsx";
import { AdminBrandsPage } from "./pages/AddBrandPage.jsx";
import { AdminUsersPage } from "./pages/AdminUsers.jsx";
import AboutPage from "./pages/AboutUsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import { AdminContactList } from "./pages/AdminContactList.jsx";
import { FaqPage } from "./pages/FaqPage.jsx";
import { ShippingDeliveryPage } from "./pages/ShippingDeliveryPage.jsx";
import { TermsAndConditionsPage } from "./pages/TermsAndConditions.jsx";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage.jsx";
import { OrderPage } from "./pages/OrderPage.jsx";
import { AdminOrderUpdatePage } from "./pages/AdminOrderUpdate.jsx";
import LoadingScreen from "./assets/animations/LoadingScreen.jsx"
function App() {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const loggedInUser = useSelector(selectLoggedInUser);

  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Scroll to top component */}
        

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:userId/:passwordResetToken" element={<ResetPasswordPage />} />
        <Route exact path="/logout" element={<Protected><Logout /></Protected>} />
        <Route exact path="/product-details/:id" element={<ProductDetailsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Faq" element={<FaqPage />} />
        <Route path="/ShippingDelivery" element={<ShippingDeliveryPage />} />
        <Route path="/terms-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        {/* Admin Routes */}
        {loggedInUser?.isAdmin ? (
          <>
            <Route path="/admin/dashboard" element={<Protected><AdminDashboardPage /></Protected>} />
            <Route path="/admin/products" element={<Protected><AdminProducts /></Protected>} />
            <Route path="/admin/product-update/:id" element={<Protected><ProductUpdatePage /></Protected>} />
            <Route path="/admin/order/:id/update" element={<Protected><AdminOrderUpdatePage /></Protected>} />
            <Route path="/admin/add-product" element={<Protected><AddProductPage /></Protected>} />
            <Route path="/admin/users" element={<Protected><AdminUsersPage /></Protected>} />
            <Route path="/admin/orders" element={<Protected><AdminOrdersPage /></Protected>} />
            <Route path="/admin/categorys" element={<Protected><AdminCategoryPage /></Protected>} />
            <Route path="/admin/contact" element={<Protected><AdminContactList /></Protected>} />
            <Route path="/admin/brands" element={<Protected><AdminBrandsPage /></Protected>} />
            <Route path="*" element={<Navigate to={"/admin/dashboard"} />} />
          </>
        ) : (
          // User Routes
          <>
            <Route path="/" element={<Protected><HomePage /></Protected>} />
            <Route path="/cart" element={<Protected><CartPage /></Protected>} />
            <Route path="/profile" element={<Protected><UserProfilePage /></Protected>} />
            <Route path="/checkout" element={<Protected><CheckoutPage /></Protected>} />
            <Route path="/order-success/:id" element={<Protected><OrderSuccessPage /></Protected>} />
            <Route path="/orders" element={<Protected><UserOrdersPage /></Protected>} />
            <Route path="/order/:id" element={<Protected><OrderPage /></Protected>} />
            <Route path="/wishlist" element={<Protected><WishlistPage /></Protected>} />
            <Route path="/about-us" element={<Protected><AboutPage /></Protected>} />
            <Route path="/contact" element={<Protected><ContactPage /></Protected>} />
          </>
        )}

        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  return isAuthChecked ? (
    <RouterProvider router={routes} />
  ) : (<><LoadingScreen/></>
  )}

export default App;
