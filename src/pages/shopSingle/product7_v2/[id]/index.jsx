import Footer1 from "@/components/footers/Footer1";

import Header23 from "@/components/headers/Header23";

import RelatedSlider from "@/components/singleProduct/RelatedSlider";

import SingleProduct2 from "@/components/singleProduct/SingleProduct2";

import { allProducts } from "@/data/products";
// e0e0e0;
import MetaComponent from "@/components/common/MetaComponent";
import { useParams } from "react-router-dom";
const metadata = {
  title: "Shop Single 7 || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function ProductDetailsPage7() {
  let params = useParams();
  const productId = params.id;
  const product =
    allProducts.filter((elm) => elm.id == productId)[0] || allProducts[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header23 />
      <main style={{ paddingTop: "70px" }}>
        <div className="mb-md-1 pb-md-3"></div>
        <SingleProduct2 product={product} />
        <RelatedSlider />
      </main>
      <Footer1 />
    </>
  );
}
