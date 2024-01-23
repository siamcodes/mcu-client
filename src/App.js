import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import Footer from './components/nav/Footer';
import SideDrawer from "./components/drawer/SideDrawer";

import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from './pages/user/History';
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";

import BrandCreate from './pages/admin/brand/BrandCreate';
import BrandUpdate from './pages/admin/brand/BrandUpdate';
import GenerationCreate from './pages/admin/generation/GenerationCreate';
import GenerationUpdate from "./pages/admin/generation/GenerationUpdate";

import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";
import Payment from "./pages/Payment";

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from "./functions/auth";

import ReturnRefund from './pages/about/ReturnRefund';
import Policy from './pages/about/Policy';
import OrderCancel from './pages/about/OrderCancel';
import Shipping from './pages/about/Shipping';

import ProductContent from './pages/admin/product/ProductContent';
import ProductDetail from './pages/admin/product/ProductDetail';
import Profile from './pages/user/Prifile';
import Contact from './pages/user/Contact';

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/register/complete" exact component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/user/profile" component={Profile} />
        <UserRoute exact path="/user/contact" component={Contact} />

        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/brand" component={BrandCreate} />
        <AdminRoute exact path="/admin/brand/:slug" component={BrandUpdate} />
        <AdminRoute exact path="/admin/generation" component={GenerationCreate} />
        <AdminRoute exact path="/admin/generation/:slug" component={GenerationUpdate} />

        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
        <AdminRoute exact path="/admin/product-content/:slug" component={ProductContent} />
        <AdminRoute exact path="/admin/product-detail/:slug" component={ProductDetail} />

        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
        <UserRoute exact path="/payment" component={Payment} />

        <Route exact path="/return-refund" component={ReturnRefund} />
        <Route exact path="/policy" component={Policy} />
        <Route exact path="/order-cancel" component={OrderCancel} />
        <Route exact path="/shipping" component={Shipping} />

      </Switch>
      <br/>
      <Footer />
    </>
  );
}

export default App;
