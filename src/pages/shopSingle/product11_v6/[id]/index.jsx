import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";

import RelatedSlider from "@/components/singleProduct/RelatedSlider";

import SingleProduct6 from "@/components/singleProduct/SingleProduct6";

import { allProducts } from "@/data/products";
// e0e0e0;
import MetaComponent from "@/components/common/MetaComponent";
import { useParams } from "react-router-dom";
const metadata = {
  title: "Shop Single 6 || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function ProductDetailsPage11() {
  let params = useParams();
  const productId = params.id;
  const product =
    allProducts.filter((elm) => elm.id == productId)[0] || allProducts[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header_dark">
        <Header1 />
      </div>
      <main className="page-wrapper">
        {/* <div className="mb-md-1 pb-md-3"></div> */}
        <SingleProduct6 product={product} />
        <RelatedSlider />
      </main>
      <Footer1 />
    </>
  );
}
