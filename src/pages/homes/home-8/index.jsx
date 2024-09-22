import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Hero from "@/components/homes/home-8/Hero";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home 8 || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function HomePage8() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main>
        <Hero />
      </main>
      <Footer1 />
    </>
  );
}
