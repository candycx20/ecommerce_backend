import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import CommingSoon from "@/components/otherPages/CommingSoon";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Comming Soon || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function CommingSoonPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <CommingSoon />
      </main>

      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
