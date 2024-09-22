import Footer11 from "@/components/footers/Footer11";

import Header12 from "@/components/headers/Header12";
import Blogs from "@/components/homes/home-12/Blogs";
import Category from "@/components/homes/home-12/Category";
import Cta from "@/components/homes/home-12/Cta";
import DiscountSlider from "@/components/homes/home-12/DiscountSlider";
import Featured from "@/components/homes/home-12/Featured";
import Features from "@/components/homes/home-12/Features";
import Hero from "@/components/homes/home-12/Hero";
import TopSelling from "@/components/homes/home-12/TopSelling";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home 12 || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function HomePage12() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="theme-12">
        <Header12 />
        <main>
          <Hero />
          <Features />
          <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
          <Featured />
          <div className="mb-3 mb-xl-4 pb-3 pt-1 pb-xl-5"></div>
          <Category />
          <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
          <TopSelling />
          <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
          <DiscountSlider />
          <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
          <Blogs />
          <Cta />
        </main>{" "}
        <Footer11 />
      </div>
    </>
  );
}
