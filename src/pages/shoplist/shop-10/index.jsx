import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import Banner6 from "@/components/shoplist/Banner6";
import Shop10 from "@/components/shoplist/shop10/Shop10";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Shop 10 || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function ShopPage10() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <Banner6 />
        <div className="mb-4 pb-lg-3"></div>
        <Shop10 />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
