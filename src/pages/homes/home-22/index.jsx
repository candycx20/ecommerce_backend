import Footer22 from "@/components/footers/Footer22";

import Header8 from "@/components/headers/Header8";
import Banner from "@/components/homes/home-23/Banner";
import Hero from "@/components/homes/home-23/Hero";
import OurStory from "@/components/homes/home-23/OurStory";
import SingleProduct from "@/components/homes/home-23/SingleProduct";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home 22 || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function HomePage22() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="theme-23">
        <Header8 />
        <main>
          <Hero />
          <Banner />
          <SingleProduct />
          <OurStory />
        </main>
        <Footer22 />
      </div>
    </>
  );
}
