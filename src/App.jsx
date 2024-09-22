/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import Svgs from "@/components/common/Svgs";
import "react-tooltip/dist/react-tooltip.css";
import "./styles/style.scss";
import "rc-slider/assets/index.css";
import "tippy.js/dist/tippy.css";
import LoginFormPopup from "@/components/common/LoginFormPopup";

import ScrollTop from "@/components/common/ScrollTop";
import Context from "@/context/Context";
import QuickView from "@/components/modals/QuickView";
import CartDrawer from "@/components/shopCartandCheckout/CartDrawer";
import SiteMap from "@/components/modals/SiteMap";
import NewsLetter from "@/components/modals/NewsLetter";
import CookieContainer from "@/components/common/CookieContainer";
import MobileHeader from "@/components/headers/MobileHeader";
import SizeGuide from "@/components/modals/SizeGuide";
import Delivery from "@/components/modals/Delivery";
import CustomerLogin from "@/components/asides/CustomerLogin";
import ShopFilter from "@/components/asides/ShopFilter";
import ProductDescription from "@/components/asides/ProductDescription";
import ProductAdditionalInformation from "@/components/asides/ProductAdditionalInformation";
import ProductReviews from "@/components/asides/ProductReviews";
import MobileFooter1 from "@/components/footers/MobileFooter1";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage1 from "./pages/homes/home-1";
import HomePage2 from "./pages/homes/home-2";
import HomePage3 from "./pages/homes/home-3";
import HomePage4 from "./pages/homes/home-4";
import HomePage5 from "./pages/homes/home-5";
import HomePage6 from "./pages/homes/home-6";
import HomePage7 from "./pages/homes/home-7";
import HomePage8 from "./pages/homes/home-8";
import HomePage9 from "./pages/homes/home-9";
import HomePage10 from "./pages/homes/home-10";
import HomePage11 from "./pages/homes/home-11";
import HomePage12 from "./pages/homes/home-12";
import HomePage13 from "./pages/homes/home-13";
import HomePage14 from "./pages/homes/home-14";
import HomePage15 from "./pages/homes/home-15";
import HomePage16 from "./pages/homes/home-16";
import HomePage17 from "./pages/homes/home-17";
import HomePage18 from "./pages/homes/home-18";
import HomePage19 from "./pages/homes/home-19";
import HomePage20 from "./pages/homes/home-20";
import HomePage21 from "./pages/homes/home-21";
import HomePage22 from "./pages/homes/home-22";
import ShopPage1 from "./pages/shoplist/shop-1";
import ShopPage2 from "./pages/shoplist/shop-2";
import ShopPage3 from "./pages/shoplist/shop-3";
import ShopPage4 from "./pages/shoplist/shop-4";
import ShopPage5 from "./pages/shoplist/shop-5";
import ShopPage6 from "./pages/shoplist/shop-6";
import ShopPage7 from "./pages/shoplist/shop-7";
import ShopPage8 from "./pages/shoplist/shop-8";
import ShopPage9 from "./pages/shoplist/shop-9";
import ShopPage10 from "./pages/shoplist/shop-10";
import ShopPage11 from "./pages/shoplist/shop-11";
import ShopPage12 from "./pages/shoplist/shop-12";
import ProductDetailsPage2 from "./pages/shopSingle/product2_variable/[id]";
import ProductDetailsPage7 from "./pages/shopSingle/product7_v2/[id]";
import ProductDetailsPage8 from "./pages/shopSingle/product8_v3/[id]";
import ProductDetailsPage9 from "./pages/shopSingle/product9_v4/[id]";
import ProductDetailsPage10 from "./pages/shopSingle/product10_v5/[id]";
import ProductDetailsPage11 from "./pages/shopSingle/product11_v6/[id]";
import ProductDetailsPage12 from "./pages/shopSingle/product12_v7/[id]";
import ProductDetailsPage13 from "./pages/shopSingle/product13_v8/[id]";
import ProductDetailsPage14 from "./pages/shopSingle/product14_v9/[id]";
import ProductDetailsPage15 from "./pages/shopSingle/product15_v10/[id]";
import ProductDetailsPage16 from "./pages/shopSingle/product16_v11/[id]";
import ProductDetailsPage1 from "./pages/shopSingle/product1_simple/[id]";
import ProductDetailsPage3 from "./pages/shopSingle/product3_external/[id]";
import ProductDetailsPage4 from "./pages/shopSingle/product4_grouped/[id]";
import ProductDetailsPage5 from "./pages/shopSingle/product5_onsale/[id]";
import ProductDetailsPage6 from "./pages/shopSingle/product6_outofstock/[id]";
import ShopCartPage from "./pages/shop-cart-checkout/shop_cart";
import ShopCheckoutPage from "./pages/shop-cart-checkout/shop_checkout";
import ShopOrderConplate from "./pages/shop-cart-checkout/shop_order_complete";
import ShopOrderTrackingPage from "./pages/shop-cart-checkout/shop_order_tracking";
import BlogPage1 from "./pages/blogs/blog_list1";
import BlogPage2 from "./pages/blogs/blog_list2";
import BlogPage3 from "./pages/blogs/blog_list3";
import BlogDetailsPage from "./pages/blogs/blog_single/[id]";
import AccountPage from "./pages/dashboard/account_dashboard";
import LoginPage from "./pages/otherPages/login_register";
import StoreLocationPage from "./pages/otherPages/store_location";
import LookbookPage from "./pages/otherPages/lookbook";
import FaqPage from "./pages/otherPages/faq";
import TermsPage from "./pages/otherPages/terms";
import NotFound from "./pages/not-found";
import CommingSoonPage from "./pages/otherPages/coming_soon";
import AccountOrderPage from "./pages/dashboard/account_orders";
import AccountEditAddressPage from "./pages/dashboard/account_edit_address";
import AccountEditPage from "./pages/dashboard/account_edit";
import AccountWishlistPage from "./pages/dashboard/account_wishlist";
import ResetPasswordPage from "./pages/otherPages/reset_password";
import AboutPage from "./pages/otherPages/about";
import ContactPage from "./pages/otherPages/contact";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";

function App() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  return (
    <>
      <Svgs />
      <Context>
        <MobileHeader />
        <Routes>
          <Route path="/">
            <Route index element={<HomePage1 />} />
            <Route path="home-1" element={<HomePage1 />} />
            <Route path="home-2" element={<HomePage2 />} />
            <Route path="home-3" element={<HomePage3 />} />
            <Route path="home-4" element={<HomePage4 />} />
            <Route path="home-5" element={<HomePage5 />} />
            <Route path="home-6" element={<HomePage6 />} />
            <Route path="home-7" element={<HomePage7 />} />
            <Route path="home-8" element={<HomePage8 />} />
            <Route path="home-9" element={<HomePage9 />} />
            <Route path="home-10" element={<HomePage10 />} />
            <Route path="home-11" element={<HomePage11 />} />
            <Route path="home-12" element={<HomePage12 />} />
            <Route path="home-13" element={<HomePage13 />} />
            <Route path="home-14" element={<HomePage14 />} />
            <Route path="home-15" element={<HomePage15 />} />
            <Route path="home-16" element={<HomePage16 />} />
            <Route path="home-17" element={<HomePage17 />} />
            <Route path="home-18" element={<HomePage18 />} />
            <Route path="home-19" element={<HomePage19 />} />
            <Route path="home-20" element={<HomePage20 />} />
            <Route path="home-21" element={<HomePage21 />} />
            <Route path="home-22" element={<HomePage22 />} />

            <Route path="shop-1" element={<ShopPage1 />} />
            <Route path="shop-2" element={<ShopPage2 />} />
            <Route path="shop-3" element={<ShopPage3 />} />
            <Route path="shop-4" element={<ShopPage4 />} />
            <Route path="shop-5" element={<ShopPage5 />} />
            <Route path="shop-6" element={<ShopPage6 />} />
            <Route path="shop-7" element={<ShopPage7 />} />
            <Route path="shop-8" element={<ShopPage8 />} />
            <Route path="shop-9" element={<ShopPage9 />} />
            <Route path="shop-10" element={<ShopPage10 />} />
            <Route path="shop-11" element={<ShopPage11 />} />
            <Route path="shop-12" element={<ShopPage12 />} />

            <Route
              path="product2_variable/:id"
              element={<ProductDetailsPage2 />}
            />
            <Route path="product7_v2/:id" element={<ProductDetailsPage7 />} />
            <Route path="product8_v3/:id" element={<ProductDetailsPage8 />} />
            <Route path="product9_v4/:id" element={<ProductDetailsPage9 />} />
            <Route path="product10_v5/:id" element={<ProductDetailsPage10 />} />
            <Route path="product11_v6/:id" element={<ProductDetailsPage11 />} />
            <Route path="product12_v7/:id" element={<ProductDetailsPage12 />} />
            <Route path="product13_v8/:id" element={<ProductDetailsPage13 />} />
            <Route path="product14_v9/:id" element={<ProductDetailsPage14 />} />
            <Route
              path="product15_v10/:id"
              element={<ProductDetailsPage15 />}
            />
            <Route
              path="product16_v11/:id"
              element={<ProductDetailsPage16 />}
            />
            <Route
              path="product1_simple/:id"
              element={<ProductDetailsPage1 />}
            />

            <Route
              path="product3_external/:id"
              element={<ProductDetailsPage3 />}
            />
            <Route
              path="product4_grouped/:id"
              element={<ProductDetailsPage4 />}
            />
            <Route
              path="product5_onsale/:id"
              element={<ProductDetailsPage5 />}
            />
            <Route
              path="product6_outofstock/:id"
              element={<ProductDetailsPage6 />}
            />

            <Route path="shop_cart" element={<ShopCartPage />} />
            <Route path="shop_checkout" element={<ShopCheckoutPage />} />
            <Route path="shop_order_complete" element={<ShopOrderConplate />} />
            <Route
              path="shop_order_tracking"
              element={<ShopOrderTrackingPage />}
            />
            <Route path="blog_list1" element={<BlogPage1 />} />
            <Route path="blog_list2" element={<BlogPage2 />} />
            <Route path="blog_list3" element={<BlogPage3 />} />
            <Route path="blog_single/:id" element={<BlogDetailsPage />} />

            <Route path="account_dashboard" element={<AccountPage />} />
            <Route path="login_register" element={<LoginPage />} />
            <Route path="store_location" element={<StoreLocationPage />} />
            <Route path="lookbook" element={<LookbookPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="page-not-found" element={<NotFound />} />
            <Route path="coming_soon" element={<CommingSoonPage />} />
            <Route path="account_orders" element={<AccountOrderPage />} />
            <Route
              path="account_edit_address"
              element={<AccountEditAddressPage />}
            />
            <Route path="account_edit" element={<AccountEditPage />} />
            <Route path="account_wishlist" element={<AccountWishlistPage />} />
            <Route path="reset_password" element={<ResetPasswordPage />} />

            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />

            <Route path="8" element={<NotFound />} />
          </Route>
        </Routes>

        <MobileFooter1 />
        {/* //modals and asides */}
        <LoginFormPopup />
        <QuickView />
        <NewsLetter />
        <CookieContainer />
        <SizeGuide />
        <Delivery />
        <CartDrawer />
        <SiteMap />
        <CustomerLogin />
        <ShopFilter />
        <ProductDescription />
        <ProductAdditionalInformation />
        <ProductReviews />
      </Context>
      <div className="page-overlay" id="pageOverlay"></div>
      <ScrollTop />
      <ScrollTopBehaviour />
    </>
  );
}

export default App;
