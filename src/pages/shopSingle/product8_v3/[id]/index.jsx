import Footer1 from "@/components/footers/Footer1";

import Header22 from "@/components/headers/Header22";

import RelatedSlider from "@/components/singleProduct/RelatedSlider";

import SingleProduct3 from "@/components/singleProduct/SingleProduct3";

import { allProducts } from "@/data/products";
// e0e0e0;
import MetaComponent from "@/components/common/MetaComponent";
import { useParams } from "react-router-dom";
const metadata = {
  title: "Shop Single 8 || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function ProductDetailsPage8() {
  let params = useParams();
  const productId = params.id;
  const product =
    allProducts.filter((elm) => elm.id == productId)[0] || allProducts[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header_dark">
        <Header22 />
      </div>
      <main style={{ paddingTop: "70px" }}>
        <div className="mb-md-1 pb-md-3"></div>
        <SingleProduct3 product={product} />
        <RelatedSlider />
      </main>
      <Footer1 />
    </>
  );
}
