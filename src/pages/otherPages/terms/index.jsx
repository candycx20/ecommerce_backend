import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import Terms from "@/components/otherPages/Terms";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Terms || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function TermsPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <Terms />
      </main>

      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
