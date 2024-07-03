import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createBrowserRouter, Route, Link, RouterProvider } from 'react-router-dom';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccess from './pages/OrderSuccess';
import UserOrdersPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import StripeCheckout from './pages/StripeCheckout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home></Home>, 
    </Protected>
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>
  },
  {
    path: "/checkout",
    element: <Protected><CheckoutPage></CheckoutPage></Protected>
  },
  {
    path: "/product-details/:id",
    element: <Protected><ProductDetailsPage></ProductDetailsPage></Protected>
  },
  {
    path: "admin/product-details/:id",
    element: <ProtectedAdmin><AdminProductDetailsPage></AdminProductDetailsPage></ProtectedAdmin>
  },
  {
    path: "admin/product-form",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>
  },
  {
    path: "admin/product-form/edit/:id",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>
  },
  {
    path: "admin/orders",
    element: <ProtectedAdmin><AdminOrdersPage></AdminOrdersPage></ProtectedAdmin>
  },
  {
    path: '/order-success/:id',
    element: (  
      <OrderSuccess></OrderSuccess>
    )
  },
  {
    path: '/my-orders',
    element: (
      <UserOrdersPage></UserOrdersPage>
    )
  },
  {
    path: '/stripe-checkout',
    element: (
      <Protected><StripeCheckout></StripeCheckout></Protected>
    )
  },
  {
    path: '/profile',
    element: (
      <UserProfilePage></UserProfilePage>
    )
  },
  {
    path: '/logout',
    element: (
      <Logout></Logout>
    )
  },
  {
    path: '/forgot-password',
    element: (
      <ForgotPasswordPage></ForgotPasswordPage>
    )
  },
  {
    path: '*',
    element: (
      <PageNotFound></PageNotFound>
    )
  }
]);



function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked)

  useEffect(()=> {
    dispatch(checkAuthAsync())
  }, [dispatch])
  
  useEffect(()=> {
    if(user){
      dispatch(fetchItemsByUserIdAsync());   // jb b hmari site chle toh cart already loaded ho us user ka
      // we can get user by token on backend so need to give in frontend
      dispatch(fetchLoggedInUserAsync())
    }
  }, [dispatch, user ])

  
  return (
    <div className="App">
      {userChecked && (<RouterProvider router={router} />)}

    </div>
  );
}

export default App;
